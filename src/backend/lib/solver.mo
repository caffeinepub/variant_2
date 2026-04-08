import Types "../types/solver";
import Common "../types/common";
import List "mo:core/List";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Nat "mo:core/Nat";

module {
  // Escape special characters for JSON string embedding
  func escapeJson(s : Text) : Text {
    var result = s;
    result := result.replace(#char '\u{5c}', "\u{5c}\u{5c}");
    result := result.replace(#char '\u{22}', "\u{5c}\u{22}");
    result := result.replace(#char '\n', "\\n");
    result := result.replace(#char '\t', "\\t");
    result
  };

  // Build the JSON body to POST to the AI (OpenAI-compatible)
  public func buildPrompt(
    question : Text,
    answerType : Text,
    difficulty : Nat,
    variationCount : Nat,
  ) : Text {
    let diffText = if (difficulty <= 3) "easy" else if (difficulty <= 7) "medium" else "hard";
    let countText = variationCount.toText();
    let systemInstr = "You are an expert math and reasoning problem solver. Respond ONLY with valid JSON, no extra text before or after.";
    let userPrompt = "Given this question: \"" # question # "\"\n\n"
      # "Generate exactly " # countText # " unique variation(s) of this problem.\n"
      # "Answer type preference: " # answerType # ". Difficulty: " # diffText # ".\n\n"
      # "For each variation:\n"
      # "1. Modify the numbers/parameters to create a new but structurally identical problem.\n"
      # "2. Solve it step by step.\n"
      # "3. Generate 3 distractors (plausible wrong answers) based on: skipping a step, wrong order of operations, unit error.\n"
      # "4. Assign a confidence score (0-100) based on question clarity and solvability.\n\n"
      # "Respond with ONLY this JSON structure (no markdown):\n"
      # "{\"variations\":[{\"id\":\"v1\",\"question\":\"modified question\",\"correctAnswer\":\"answer\","
      # "\"distractors\":[\"wrong1\",\"wrong2\",\"wrong3\"],"
      # "\"answerOptions\":[{\"letter\":\"A\",\"text\":\"option\",\"isCorrect\":true},{\"letter\":\"B\",\"text\":\"option\",\"isCorrect\":false},{\"letter\":\"C\",\"text\":\"option\",\"isCorrect\":false},{\"letter\":\"D\",\"text\":\"option\",\"isCorrect\":false}],"
      # "\"steps\":[{\"stepNumber\":1,\"description\":\"step desc\",\"formula\":\"formula\",\"result\":\"result\"}],"
      # "\"confidence\":85,\"warningFlag\":false}]}";
    "{\"model\":\"gpt-4o\",\"messages\":[{\"role\":\"system\",\"content\":\""
      # escapeJson(systemInstr) # "\"},{\"role\":\"user\",\"content\":\""
      # escapeJson(userPrompt) # "\"}],\"temperature\":0.7}"
  };

  // Extract a quoted string value for a given key from a flat JSON fragment
  func extractStr(json : Text, key : Text) : ?Text {
    let searchKey = "\"" # key # "\":\"";
    let parts = json.split(#text searchKey);
    let arr = parts.toArray();
    if (arr.size() < 2) return null;
    var result = "";
    var escaped = false;
    var found = false;
    for (c in arr[1].toIter()) {
      if (found) {
        // skip
      } else if (escaped) {
        if (c == 'n') { result := result # "\n" }
        else if (c == 't') { result := result # "\t" }
        else { result := result # Text.fromChar(c) };
        escaped := false;
      } else if (c == '\u{5c}') {
        escaped := true;
      } else if (c == '\u{22}') {
        found := true;
      } else {
        result := result # Text.fromChar(c);
      };
    };
    if (found) ?result else null
  };

  // Extract boolean: "key":true
  func extractBool(json : Text, key : Text) : Bool {
    json.contains(#text ("\"" # key # "\":true"))
  };

  // Extract a nat value for a given key: "key":NNN
  func extractNat(json : Text, key : Text) : Nat {
    let searchKey = "\"" # key # "\":";
    let parts = json.split(#text searchKey);
    let arr = parts.toArray();
    if (arr.size() < 2) return 75;
    var numStr = "";
    var done = false;
    for (c in arr[1].toIter()) {
      if (done) {
        // skip
      } else if (c >= '0' and c <= '9') {
        numStr := numStr # Text.fromChar(c);
      } else if (numStr.size() > 0) {
        done := true;
      };
    };
    switch (Nat.fromText(numStr)) {
      case (?n) n;
      case null 75;
    }
  };

  // Split a JSON text into depth-1 object strings (content between matching { })
  func splitObjects(json : Text) : [Text] {
    let objs = List.empty<Text>();
    var depth = 0;
    var inString = false;
    var escaped = false;
    var current = "";
    var collecting = false;
    for (c in json.toIter()) {
      if (escaped) {
        if (collecting) { current := current # Text.fromChar(c) };
        escaped := false;
      } else if (inString) {
        if (collecting) { current := current # Text.fromChar(c) };
        if (c == '\u{5c}') { escaped := true }
        else if (c == '\u{22}') { inString := false };
      } else if (c == '\u{22}') {
        inString := true;
        if (collecting) { current := current # Text.fromChar(c) };
      } else if (c == '{') {
        depth += 1;
        if (depth == 1) {
          collecting := true;
          current := "{";
        } else if (collecting) {
          current := current # "{";
        };
      } else if (c == '}') {
        if (collecting) { current := current # "}" };
        if (depth == 1) {
          if (collecting) {
            objs.add(current);
            collecting := false;
            current := "";
          };
        };
        if (depth > 0) { depth -= 1 };
      } else {
        if (collecting) { current := current # Text.fromChar(c) };
      };
    };
    objs.toArray()
  };

  // Parse quoted string array: ["a","b","c"] from within a JSON fragment
  func parseStringArray(json : Text, key : Text) : [Text] {
    let searchKey = "\"" # key # "\":[";
    let parts = json.split(#text searchKey);
    let arr = parts.toArray();
    if (arr.size() < 2) return [];
    let result = List.empty<Text>();
    var inStr = false;
    var esc = false;
    var cur = "";
    var finished = false;
    for (c in arr[1].toIter()) {
      if (finished) {
        // skip
      } else if (esc) {
        cur := cur # Text.fromChar(c);
        esc := false;
      } else if (inStr) {
        if (c == '\u{5c}') { esc := true }
        else if (c == '\u{22}') {
          result.add(cur);
          cur := "";
          inStr := false;
        } else {
          cur := cur # Text.fromChar(c);
        };
      } else if (c == '\u{22}') {
        inStr := true;
      } else if (c == ']') {
        finished := true;
      };
    };
    result.toArray()
  };

  // Parse answerOptions from a variation JSON object
  func parseAnswerOptions(varJson : Text) : [Types.AnswerOption] {
    let key = "\"answerOptions\":[";
    let parts = varJson.split(#text key);
    let arr = parts.toArray();
    if (arr.size() < 2) return [];
    let objStr = arr[1];
    let objs = splitObjects(objStr);
    let result = List.empty<Types.AnswerOption>();
    for (obj in objs.values()) {
      let letterOpt = extractStr(obj, "letter");
      let textOpt = extractStr(obj, "text");
      let isCorrect = extractBool(obj, "isCorrect");
      switch (letterOpt, textOpt) {
        case (?letter, ?text) {
          result.add({ letter; text; isCorrect });
        };
        case _ {};
      };
    };
    result.toArray()
  };

  // Parse steps from a variation JSON object
  func parseSolutionSteps(varJson : Text) : [Types.SolutionStep] {
    let key = "\"steps\":[";
    let parts = varJson.split(#text key);
    let arr = parts.toArray();
    if (arr.size() < 2) return [];
    let objStr = arr[1];
    let objs = splitObjects(objStr);
    let result = List.empty<Types.SolutionStep>();
    for (obj in objs.values()) {
      let descOpt = extractStr(obj, "description");
      let formulaOpt = extractStr(obj, "formula");
      let resOpt = extractStr(obj, "result");
      let stepNum = extractNat(obj, "stepNumber");
      switch (descOpt, formulaOpt, resOpt) {
        case (?description, ?formula, ?res) {
          result.add({ stepNumber = stepNum; description; formula; result = res });
        };
        case _ {};
      };
    };
    result.toArray()
  };

  // Parse variation objects from AI JSON response
  public func parseAiResponse(json : Text, variationCount : Nat) : [Types.Variation] {
    let varKey = "\"variations\":[";
    let splitResult = json.split(#text varKey);
    let splitArr = splitResult.toArray();
    if (splitArr.size() < 2) return fallbackVariations(variationCount);

    let afterVariations = splitArr[1];
    let variationObjs = splitObjects(afterVariations);
    if (variationObjs.size() == 0) return fallbackVariations(variationCount);

    let result = List.empty<Types.Variation>();
    var idx = 0;
    for (obj in variationObjs.values()) {
      idx += 1;
      let id = switch (extractStr(obj, "id")) { case (?v) v; case null "v" # idx.toText() };
      let question = switch (extractStr(obj, "question")) { case (?v) v; case null "Variation " # idx.toText() };
      let correctAnswer = switch (extractStr(obj, "correctAnswer")) { case (?v) v; case null "" };
      let confidence = extractNat(obj, "confidence");
      let warningFlag = extractBool(obj, "warningFlag");
      let distractors = parseStringArray(obj, "distractors");
      let answerOptions = parseAnswerOptions(obj);
      let steps = parseSolutionSteps(obj);
      result.add({ id; question; correctAnswer; distractors; answerOptions; steps; confidence; warningFlag });
    };

    if (result.size() == 0) return fallbackVariations(variationCount);
    result.toArray()
  };

  // Fallback when AI call fails or response is unparseable
  public func fallbackVariations(variationCount : Nat) : [Types.Variation] {
    let fallback : Types.Variation = {
      id = "fallback";
      question = "Unable to process question at this time. Please try again.";
      correctAnswer = "N/A";
      distractors = [];
      answerOptions = [];
      steps = [];
      confidence = 30;
      warningFlag = true;
    };
    Array.tabulate<Types.Variation>(variationCount, func(_i) = fallback)
  };

  public func newCard(id : Common.CardId, input : Types.CardInput, savedAt : Common.Timestamp) : Types.SavedCardInternal {
    {
      id;
      question = input.question;
      variationQuestion = input.variationQuestion;
      answerOptions = input.answerOptions;
      steps = input.steps;
      confidence = input.confidence;
      savedAt;
    }
  };

  public func toPublicCard(internal : Types.SavedCardInternal) : Types.SavedCard {
    {
      id = internal.id;
      question = internal.question;
      variationQuestion = internal.variationQuestion;
      answerOptions = internal.answerOptions;
      steps = internal.steps;
      confidence = internal.confidence;
      savedAt = internal.savedAt;
    }
  };
};
