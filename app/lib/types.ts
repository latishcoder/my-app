// ==========================
// Explanation Response Types
// ==========================

export interface ExplanationResponse {
  explanation: Explanation;
  workedExample: WorkedExample;
  misconceptions: Misconception[];
  mcqs: MCQ[];
}

// ==========================
// Explanation Section
// ==========================

export interface Explanation {
  introduction: string;
  keyPoints: string[];
  summary: string;
}

// ==========================
// Worked Example Section
// ==========================

export interface WorkedExample {
  problem: string;
  solution: Solution;
}

export interface Solution {
  given: string[];
  toFind: string;
  steps: string[];
  answer: string;
}

// ==========================
// Misconception Section
// ==========================

export interface Misconception {
  misconception: string;
  whyStudentsThinkThis: string;
  whyItIsWrong: string;
  correctUnderstanding: string;
}

// ==========================
// MCQ Section
// ==========================

export interface MCQ {
  question: string;
  options: MCQOptions;
  correctAnswer: MCQOptionKey;
  explanation: string;
}

export interface MCQOptions {
  A: string;
  B: string;
  C: string;
  D: string;
}

export type MCQOptionKey = "A" | "B" | "C" | "D";
