export type Difficulty = "mudah" | "sedang" | "sulit" | "sangat-sulit" | "ekstrem";

export type Answer = "ai" | "human";

export type Candidate = {
  src: string;
  answer: Answer;
  hint: string;
};

export type Question = Candidate & {
  id: string;
  difficulty: Difficulty;
};

export type GamePhase = "intro" | "playing" | "result" | "material";

export type FeedbackState = {
  correct: boolean;
  correctAnswer: Answer;
  hint: string;
} | null;
