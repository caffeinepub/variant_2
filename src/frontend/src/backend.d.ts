import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SolutionStep {
    result: string;
    description: string;
    stepNumber: bigint;
    formula: string;
}
export interface SavedCard {
    id: CardId;
    variationQuestion: string;
    question: string;
    answerOptions: Array<AnswerOption>;
    steps: Array<SolutionStep>;
    savedAt: Timestamp;
    confidence: bigint;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface SolverResult {
    variations: Array<Variation>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface CardInput {
    variationQuestion: string;
    question: string;
    answerOptions: Array<AnswerOption>;
    steps: Array<SolutionStep>;
    confidence: bigint;
}
export interface Variation {
    id: string;
    question: string;
    correctAnswer: string;
    answerOptions: Array<AnswerOption>;
    distractors: Array<string>;
    steps: Array<SolutionStep>;
    confidence: bigint;
    warningFlag: boolean;
}
export interface AnswerOption {
    text: string;
    isCorrect: boolean;
    letter: string;
}
export type CardId = string;
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface backendInterface {
    deleteCard(id: string): Promise<boolean>;
    getSavedCards(): Promise<Array<SavedCard>>;
    saveCard(card: CardInput): Promise<string>;
    solveQuestion(question: string, answerType: string, difficulty: bigint, variationCount: bigint): Promise<SolverResult>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
