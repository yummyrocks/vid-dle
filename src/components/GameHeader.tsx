"use client";

import { DIFFICULTY_ORDER, DIFFICULTY_LABEL } from "@/lib/questions";
import { formatScore } from "@/lib/score";

type GameHeaderProps = {
  currentIndex: number;
  score: number;
};

export default function GameHeader({ currentIndex, score }: GameHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-ink-soft">
          Soal {currentIndex + 1} / {DIFFICULTY_ORDER.length}
        </span>
        <span className="rounded-full bg-primary-soft px-3 py-1 text-sm font-bold tabular-nums text-primary">
          {formatScore(score)}
        </span>
      </div>

      <div className="flex gap-1.5">
        {DIFFICULTY_ORDER.map((difficulty, index) => {
          const state = index < currentIndex ? "done" : index === currentIndex ? "current" : "todo";
          return (
            <div key={difficulty} className="flex-1">
              <div
                className={[
                  "h-2 rounded-full transition",
                  state === "done" ? "bg-success" : "",
                  state === "current" ? "bg-primary" : "",
                  state === "todo" ? "bg-line" : "",
                ].join(" ")}
              />
              <p
                className={[
                  "mt-1.5 truncate text-center text-[10px] font-semibold",
                  state === "current" ? "text-ink" : "text-ink-soft",
                ].join(" ")}
              >
                {DIFFICULTY_LABEL[difficulty]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
