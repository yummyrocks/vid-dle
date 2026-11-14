"use client";

import { HandIcon, RobotIcon, UserIcon } from "@phosphor-icons/react";
import type { Answer } from "@/lib/types";

type DecisionBarProps = {
  /** false saat video sudah 100% — "Kurang Yakin" nonaktif */
  canUnsure: boolean;
  /** true saat popup feedback terbuka — semua tombol nonaktif */
  locked: boolean;
  onChoose: (answer: Answer) => void;
  onUnsure: () => void;
};

export default function DecisionBar({ canUnsure, locked, onChoose, onUnsure }: DecisionBarProps) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-3">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={locked}
          onClick={() => onChoose("ai")}
          className="flex flex-col items-center gap-2 rounded-2xl border border-slate-900/10 bg-[#63e6be] px-4 py-5 text-slate-900 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RobotIcon size={30} weight="bold" />
          <span className="text-2xl font-extrabold leading-none">AI</span>
        </button>
        <button
          type="button"
          disabled={locked}
          onClick={() => onChoose("human")}
          className="flex flex-col items-center gap-2 rounded-2xl border border-slate-900/10 bg-[#8ed4fa] px-4 py-5 text-slate-900 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <UserIcon size={30} weight="bold" />
          <span className="whitespace-nowrap text-center text-xl font-extrabold leading-none sm:text-2xl">Bukan AI</span>
        </button>
      </div>

      <button
        type="button"
        disabled={locked || !canUnsure}
        onClick={onUnsure}
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-4 py-4 text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <HandIcon size={22} weight="bold" />
        <span className="text-center">
          <span className="block text-lg font-extrabold leading-tight">
            {canUnsure ? "Kurang Yakin" : "Video sudah 100%"}
          </span>
          <span className="block text-xs font-bold opacity-70">
            {canUnsure ? "buka lebih banyak video" : "pilih salah satu jawaban"}
          </span>
        </span>
      </button>
    </div>
  );
}
