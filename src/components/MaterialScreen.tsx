"use client";

import {
  BookOpenIcon,
  BrainIcon,
  EyeIcon,
  HandIcon,
  HouseIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import ThemeToggle from "./ThemeToggle";

type MaterialScreenProps = {
  onRestart: () => void;
  onHome: () => void;
};

const SIGNS = [
  {
    icon: HandIcon,
    title: "Artefak tangan & jari", card: "bg-[#63e6be]",
    body: "Jari yang bergabung, terlalu banyak/kurang buku jari, atau gerakan tangan yang menembus benda — klasik pada video AI.",
  },
  {
    icon: SparkleIcon,
    title: "Cahaya & bayangan aneh", card: "bg-[#8ed4fa]",
    body: "Kilatan cahaya berubah arah antar frame, bayangan tidak sinkron dengan sumber cahaya, atau refleksi yang tidak masuk akal.",
  },
  {
    icon: EyeIcon,
    title: "Latar & detail berubah", card: "bg-[#c6e84a]",
    body: "Teks di latar belakang meleleh, pola lantai/keramik berubah bentuk, atau objek kecil hilang-muncul diam-diam.",
  },
  {
    icon: BrainIcon,
    title: "Audio mulus, gerak aneh", card: "bg-[#f79ad3]",
    body: "Suara terdengar natural tapi bibir tidak sinkron, ekspresi berubah terlalu cepat, atau gerakan terlalu halus seperti efek rapi.",
  },
];

export default function MaterialScreen({ onRestart, onHome }: MaterialScreenProps) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
            <BookOpenIcon size={24} weight="bold" />
          </span>
          <div>
            <p className="text-xs font-bold text-ink-soft">
              Materi Singkat
            </p>
            <h1 className="text-2xl font-extrabold text-ink">Cara Mendeteksi Video Buatan AI</h1>
          </div>
        </div>
        <ThemeToggle />
      </div>

      <p className="mt-6 text-sm leading-relaxed text-ink-soft">
        Video yang dihasilkan AI (Sora, Runway, Kling, dll.) makin sulit dibedakan
        dari video asli. Kuncinya bukan menebak sekilas, tapi <b className="text-ink">mencari
        detail kecil yang tidak konsisten</b>. Periksa empat hal berikut:
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {SIGNS.map(({ icon: Icon, title, body, card }) => (
          <div key={title} className={`rounded-2xl border border-slate-900/10 p-5 ${card}`}>
            <Icon size={26} weight="bold" className="text-slate-900" />
            <h2 className="mt-3 text-lg font-extrabold leading-tight text-slate-900">{title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-800/80">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-primary p-5">
        <h2 className="text-sm font-extrabold text-white">Budaya Literasi Digital</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/90">
          Sebelum membagikan video, tanyakan: dari mana asalnya? apakah ada
          konteks yang jelas? bisa dipercaya sumbernya? Jangan langsung
          percaya hanya karena video terlihat meyakinkan — dan bantu orang
          lain memverifikasi sebelum ikut menyebarkan.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-2xl bg-primary px-6 py-4 text-base font-extrabold text-white transition hover:brightness-110 active:scale-[0.98]"
        >
          Main Lagi
        </button>
        <button
          type="button"
          onClick={onHome}
          className="flex items-center justify-center gap-2 rounded-2xl border border-stone-300 px-6 py-4 text-base font-bold text-ink transition hover:bg-bg-soft dark:border-white/10"
        >
          <HouseIcon size={18} weight="bold" /> Kembali ke Home
        </button>
      </div>
    </main>
  );
}
