"use client";

import { HouseIcon, PlayIcon } from "@phosphor-icons/react";
import { MAX_SCORE, SCORE_PER_CORRECT, formatScore } from "@/lib/score";
import ThemeToggle from "./ThemeToggle";

type ResultScreenProps = {
  score: number;
  correctCount: number;
  bestScore: number | null;
  onRestart: () => void;
  onOpenMaterial: () => void;
  onHome: () => void;
};

export default function ResultScreen({
  score,
  correctCount,
  bestScore,
  onRestart,
  onOpenMaterial,
  onHome,
}: ResultScreenProps) {
  const perfect = score === MAX_SCORE;

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-10">
      <div className="mb-4 flex justify-end">
        <ThemeToggle />
      </div>

      <div className="rounded-3xl border border-stone-300 p-6 text-center dark:border-white/10">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary">
          <PlayIcon size={28} weight="fill" className="text-white" />
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">Vid-dle</h1>
        <p className="mt-1 text-sm font-bold text-ink-soft">
          {perfect ? "Sempurna! Semua Benar!" : "Sesi Selesai!"}
        </p>

        <p className="mt-6 text-6xl font-extrabold tabular-nums text-primary">
          {score}
          <span className="text-2xl text-ink-soft">/{MAX_SCORE}</span>
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl border border-slate-900/10 bg-[#63e6be] p-3.5">
            <p className="text-3xl font-extrabold leading-none text-slate-900">{correctCount}</p>
            <p className="mt-1.5 text-xs font-bold text-slate-800">Benar</p>
          </div>
          <div className="rounded-2xl border border-slate-900/10 bg-[#f79ad3] p-3.5">
            <p className="text-3xl font-extrabold leading-none text-slate-900">{5 - correctCount}</p>
            <p className="mt-1.5 text-xs font-bold text-slate-800">Salah</p>
          </div>
          <div className="rounded-2xl border border-slate-900/10 bg-[#8ed4fa] p-3.5">
            <p className="text-3xl font-extrabold leading-none text-slate-900">{bestScore ?? "-"}</p>
            <p className="mt-1.5 text-xs font-bold text-slate-800">Terbaik</p>
          </div>
        </div>

        <p className="mt-4 text-xs text-ink-soft">
          {correctCount} × {SCORE_PER_CORRECT} poin
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={onOpenMaterial}
          className="w-full rounded-2xl bg-primary px-6 py-4 text-base font-extrabold text-white transition hover:brightness-110 active:scale-[0.98]"
        >
          Lanjut ke Materi Pembelajaran
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onRestart}
            className="rounded-2xl border border-stone-300 px-6 py-4 text-base font-bold text-ink transition hover:bg-bg-soft dark:border-white/10"
          >
            Main Lagi
          </button>
          <button
            type="button"
            onClick={onHome}
            className="flex items-center justify-center gap-2 rounded-2xl border border-stone-300 px-6 py-4 text-base font-bold text-ink transition hover:bg-bg-soft dark:border-white/10"
          >
            <HouseIcon size={18} weight="bold" /> Home
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-ink-soft">
        Skor terbaikmu: {formatScore(bestScore ?? 0)}
      </p>
    </main>
  );
}
