"use client";

import {
  GameControllerIcon,
  ImageIcon,
  PlayIcon,
  RobotIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import ThemeToggle from "./ThemeToggle";

type IntroScreenProps = {
  onStart: () => void;
};

const STEPS = [
  { n: "1", title: "Tonton 20%", body: "Mulai dari sepertiga pertama video — putuskan AI atau buatan manusia.", card: "bg-[#63e6be]" },
  { n: "2", title: "Kurang Yakin?", body: "Buka jadi 60% lalu 100%, suara ikut menyala. Skor tetap aman.", card: "bg-[#8ed4fa]" },
  { n: "3", title: "Jawab & Dapat Skor", body: "Benar = 20 poin, salah = 0. Ada 5 soal, maksimal 100.", card: "bg-[#c6e84a]" },
  { n: "4", title: "Baca Materi", body: "Selesai main, pelajari trik deteksi video AI singkat.", card: "bg-[#f79ad3]" },
];

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <main className="relative flex min-h-dvh w-full flex-col items-center overflow-hidden px-4 pb-8 pt-5 lg:px-10">
      {/* dekorasi latar */}
      <div className="pointer-events-none absolute bottom-24 left-16 hidden rotate-[-12deg] rounded-2xl bg-primary-soft p-4 xl:block">
        <PlayIcon size={26} weight="fill" className="text-primary" />
      </div>
      <div className="pointer-events-none absolute bottom-40 right-20 hidden rotate-[10deg] rounded-2xl bg-accent-soft p-4 xl:block">
        <PlayIcon size={26} weight="fill" className="text-accent" />
      </div>
      <SparkleIcon
        size={22}
        weight="fill"
        className="pointer-events-none absolute left-[12%] top-52 hidden text-amber lg:block"
      />
      <SparkleIcon
        size={18}
        weight="fill"
        className="pointer-events-none absolute right-[14%] top-72 hidden text-primary lg:block"
      />
      <GameControllerIcon
        size={54}
        weight="fill"
        className="pointer-events-none absolute right-[6%] top-8 hidden text-accent/40 xl:block"
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-1 flex-col">
        {/* bar atas */}
        <div className="flex w-full items-center justify-end">
          <ThemeToggle />
        </div>

        {/* logo + judul */}
        <header className="mt-6 text-center lg:mt-8">
          <div className="flex items-center justify-center gap-3">
            <span className="grid size-14 place-items-center rounded-2xl bg-primary lg:size-16">
              <PlayIcon size={30} weight="fill" className="text-white" />
            </span>
            <h1 className="text-5xl font-extrabold tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Vid-dle
            </h1>
            <SparkleIcon size={26} weight="fill" className="text-primary lg:size-8" />
          </div>
          <p className="mt-4 text-lg font-extrabold text-ink sm:text-2xl">
            Media Pembelajaran Berbasis Gamifikasi
          </p>
          <p className="mt-1 max-w-2xl text-sm text-ink-soft sm:mx-auto sm:text-base">
            untuk Meningkatkan Literasi Digital terhadap Konten Video Buatan AI.
          </p>
        </header>

        {/* AI vs Non-AI */}
        <section className="mt-8 flex items-center gap-3 sm:gap-6 lg:mt-10 lg:justify-center">
          <div className="flex-1 rounded-3xl bg-primary p-4 sm:p-6 lg:max-w-sm lg:p-7">
            <div className="mx-auto grid size-24 place-items-center rounded-2xl bg-white/95 sm:size-32 lg:size-40">
              <RobotIcon size={72} className="text-primary lg:size-24" weight="fill" />
            </div>
            <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-extrabold text-slate-900 lg:mt-5 lg:px-6 lg:text-base">
              AI <SparkleIcon size={14} weight="fill" className="text-primary" />
            </div>
          </div>

          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-slate-900/10 text-lg font-extrabold text-ink sm:size-14 lg:size-16 lg:text-xl">
            VS
          </span>

          <div className="flex-1 rounded-3xl bg-accent p-4 sm:p-6 lg:max-w-sm lg:p-7">
            <div className="mx-auto grid size-24 place-items-center rounded-2xl bg-white/95 sm:size-32 lg:size-40">
              <ImageIcon size={68} className="text-accent lg:size-24" weight="fill" />
            </div>
            <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-extrabold text-slate-900 lg:mt-5 lg:px-6 lg:text-base">
              <ImageIcon size={14} weight="fill" className="text-accent" /> Non-AI
            </div>
          </div>
        </section>

        {/* cara main */}
        <section className="mt-8 w-full rounded-3xl border border-stone-300 p-5 lg:mt-10 lg:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-extrabold text-ink-soft">
              Cara Main
            </h2>
            <GameControllerIcon size={26} className="text-primary" weight="fill" />
          </div>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className={`flex gap-3 rounded-2xl border border-stone-300 p-4 lg:flex-col lg:gap-4 ${step.card}`}
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-sm font-extrabold text-slate-900">
                  {step.n}
                </span>
                <div>
                  <p className="text-base font-extrabold leading-tight text-slate-900">{step.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-800/80">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
<div className="mt-8 flex items-center justify-center lg:mt-auto lg:pt-10">
  <button
    type="button"
    onClick={onStart}
    className="w-full max-w-lg rounded-2xl bg-primary px-8 py-4 text-base font-extrabold text-white transition hover:brightness-110 active:scale-[0.98] lg:w-[450px] lg:text-lg"
  >
    <span className="inline-flex items-center justify-center gap-2">
      <PlayIcon size={20} weight="fill" /> Mulai Main
    </span>
  </button>
</div>
      </div>
    </main>
  );
}
