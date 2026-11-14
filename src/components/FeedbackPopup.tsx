"use client";

import { CheckCircleIcon, LightbulbIcon, XCircleIcon } from "@phosphor-icons/react";
import type { Answer } from "@/lib/types";

type FeedbackPopupProps = {
  correct: boolean;
  correctAnswer: Answer;
  hint: string;
  onNext: () => void;
};

const ANSWER_LABEL: Record<Answer, string> = {
  ai: "video buatan AI",
  human: "video buatan manusia",
};

export default function FeedbackPopup({ correct, correctAnswer, hint, onNext }: FeedbackPopupProps) {
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        className={[
          "w-full max-w-md rounded-2xl bg-card p-6 ring-2",
          correct ? "ring-success/50" : "ring-danger/50",
        ].join(" ")}
        role="alertdialog"
        aria-modal="true"
      >
        <div className="flex items-center gap-3">
          {correct ? (
            <CheckCircleIcon size={44} className="text-success" weight="fill" />
          ) : (
            <XCircleIcon size={44} className="text-danger" weight="fill" />
          )}
          <div>
            <h2 className="text-xl font-extrabold text-ink">
              {correct ? "Benar! 🎉" : "Belum tepat 😅"}
            </h2>
            <p className="text-sm text-ink-soft">
              {correct ? "Jawabanmu cocok" : `Jawaban yang benar: ${ANSWER_LABEL[correctAnswer]}`}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-primary p-4">
          <p className="flex items-center gap-2 text-xs font-bold text-white">
            <LightbulbIcon size={14} weight="fill" /> Petunjuk
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/90">{hint}</p>
        </div>

        <button
          type="button"
          onClick={onNext}
          autoFocus
          className="mt-5 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:brightness-110"
        >
          Lanjut
        </button>
      </div>
    </div>
  );
}
