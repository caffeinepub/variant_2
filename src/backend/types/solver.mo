import Common "common";

module {
  public type AnswerOption = {
    letter : Text;
    text : Text;
    isCorrect : Bool;
  };

  public type SolutionStep = {
    stepNumber : Nat;
    description : Text;
    formula : Text;
    result : Text;
  };

  public type Variation = {
    id : Text;
    question : Text;
    correctAnswer : Text;
    distractors : [Text];
    answerOptions : [AnswerOption];
    steps : [SolutionStep];
    confidence : Nat;
    warningFlag : Bool;
  };

  public type SolverResult = {
    variations : [Variation];
  };

  public type CardInput = {
    question : Text;
    variationQuestion : Text;
    answerOptions : [AnswerOption];
    steps : [SolutionStep];
    confidence : Nat;
  };

  public type SavedCard = {
    id : Common.CardId;
    question : Text;
    variationQuestion : Text;
    answerOptions : [AnswerOption];
    steps : [SolutionStep];
    confidence : Nat;
    savedAt : Common.Timestamp;
  };

  public type SavedCardInternal = {
    id : Common.CardId;
    question : Text;
    variationQuestion : Text;
    answerOptions : [AnswerOption];
    steps : [SolutionStep];
    confidence : Nat;
    savedAt : Common.Timestamp;
  };
};
