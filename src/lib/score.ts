export const SCORE_PER_CORRECT = 20;
export const TOTAL_QUESTIONS = 5;
export const MAX_SCORE = SCORE_PER_CORRECT * TOTAL_QUESTIONS;

export function calcScore(correctCount: number): number {
  return correctCount * SCORE_PER_CORRECT;
}

export function formatScore(score: number): string {
  return `${score}/${MAX_SCORE}`;
}
