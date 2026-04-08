export interface AnswerOption {
  text: string;
  isCorrect: boolean;
  letter: string;
}

export interface SolutionStep {
  stepNumber: bigint;
  description: string;
  formula: string;
  result: string;
}

export interface Variation {
  id: string;
  question: string;
  correctAnswer: string;
  distractors: string[];
  answerOptions: AnswerOption[];
  steps: SolutionStep[];
  confidence: bigint;
  warningFlag: boolean;
}

export interface SolverResult {
  variations: Variation[];
}

export interface CardInput {
  question: string;
  variationQuestion: string;
  answerOptions: AnswerOption[];
  steps: SolutionStep[];
  confidence: bigint;
}

export interface SavedCard {
  id: string;
  question: string;
  variationQuestion: string;
  answerOptions: AnswerOption[];
  steps: SolutionStep[];
  confidence: bigint;
  savedAt: bigint;
}

export type AnswerType = "Integer" | "Decimal" | "Any";
export type Difficulty = 1 | 2 | 3 | 4 | 5;
