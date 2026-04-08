import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Types "../types/solver";
import Common "../types/common";
import SolverLib "../lib/solver";
import CardsLib "../lib/cards";
import OutCall "mo:caffeineai-http-outcalls/outcall";

mixin (
  cards : Map.Map<Common.CardId, Types.SavedCardInternal>,
) {
  var nextId : Nat = 0;

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared func solveQuestion(
    question : Text,
    answerType : Text,
    difficulty : Nat,
    variationCount : Nat,
  ) : async Types.SolverResult {
    let count = if (variationCount == 0) 1 else variationCount;
    let promptBody = SolverLib.buildPrompt(question, answerType, difficulty, count);
    let apiUrl = "https://api.openai.com/v1/chat/completions";
    let headers : [OutCall.Header] = [];
    try {
      let responseText = await OutCall.httpPostRequest(apiUrl, headers, promptBody, transform);
      let content = extractContent(responseText);
      let variations = SolverLib.parseAiResponse(content, count);
      { variations }
    } catch (_) {
      { variations = SolverLib.fallbackVariations(count) }
    }
  };

  // Extract the "content" field from an OpenAI chat completion JSON response
  func extractContent(response : Text) : Text {
    let key = "\"content\":\"";
    let parts = response.split(#text key);
    let arr : [Text] = parts.toArray();
    if (arr.size() < 2) return response;
    var result = "";
    var escaped = false;
    var done = false;
    for (c in arr[1].toIter()) {
      if (done) {
        // skip
      } else if (escaped) {
        if (c == 'n') { result := result # "\n" }
        else if (c == 't') { result := result # "\t" }
        else if (c == '\u{22}') { result := result # "\u{22}" }
        else if (c == '\u{5c}') { result := result # "\u{5c}" }
        else { result := result # Text.fromChar(c) };
        escaped := false;
      } else if (c == '\u{5c}') {
        escaped := true;
      } else if (c == '\u{22}') {
        done := true;
      } else {
        result := result # Text.fromChar(c);
      };
    };
    if (result.size() == 0) response else result
  };

  public shared func saveCard(card : Types.CardInput) : async Text {
    nextId += 1;
    let id = nextId.toText() # "-" # Time.now().toText();
    let internal = SolverLib.newCard(id, card, Time.now());
    CardsLib.addCard(cards, id, internal);
    id
  };

  public shared query func getSavedCards() : async [Types.SavedCard] {
    CardsLib.getAll(cards)
  };

  public shared func deleteCard(id : Text) : async Bool {
    CardsLib.removeCard(cards, id)
  };
};
