"use client";

import { useState } from "react";
import {
  BookOpenIcon,
  EyeIcon,
  HandIcon,
  HeadphonesIcon,
  HouseIcon,
  LightbulbIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import ThemeToggle from "./ThemeToggle";

type MaterialScreenProps = {
  onRestart: () => void;
  onHome: () => void;
};

/* ============================================================
   GANTI ALAMAT GAMBAR DI SINI SAJA
   Bisa path lokal (folder /public) atau URL penuh (https://...)
   ============================================================ */
const IMAGES: Record<string, { ai: string; real: string }> = {
  tangan: {
    ai: "/material/tangan-ai.png",
    real: "/material/tangan-real.png",
  },
  audio: {
    ai: "/material/audio-ai.png",
    real: "/material/audio-real.png",
  },
  detail: {
    ai: "/material/detail-ai.png",
    real: "/material/detail-real.png",
  },
  cahaya: {
    ai: "/material/cahaya-ai.png",
    real: "/material/cahaya-real.png",
  },
};

type Topic = {
  id: string;
  label: string; // teks pada kotak
  title: string; // judul pada penjelasan
  body: string;
  icon: Icon;
  color: string; // warna kotak
  text: string; // warna teks pada kotak
  width: string; // lebar kotak teks pada baris
};

const TOPICS: Topic[] = [
  {
    id: "tangan",
    label: "Gerakan Tangan",
    title: "Artefak tangan & jari",
    body: "Jari yang bergabung, terlalu banyak/kurang buku jari, atau gerakan tangan yang menembus benda — klasik pada video AI.",
    icon: HandIcon,
    color: "bg-[#fca5a5]",
    text: "text-slate-900",
    width: "flex-[3]",
  },
  {
    id: "audio",
    label: "Audio",
    title: "Audio mulus, gerak aneh",
    body: "Suara terdengar natural tapi bibir tidak sinkron, ekspresi berubah terlalu cepat, atau gerakan terlalu halus seperti efek rapi.",
    icon: HeadphonesIcon,
    color: "bg-[#8ed4fa]",
    text: "text-slate-900",
    width: "flex-[2]",
  },
  {
    id: "detail",
    label: "Detail",
    title: "Latar & detail berubah",
    body: "Teks di latar belakang meleleh, pola lantai/keramik berubah bentuk, atau objek kecil hilang-muncul diam-diam.",
    icon: EyeIcon,
    color: "bg-[#c6e84a]",
    text: "text-slate-900",
    width: "flex-[2]",
  },
  {
    id: "cahaya",
    label: "Pencahayaan",
    title: "Cahaya & bayangan aneh",
    body: "Kilatan cahaya berubah arah antar frame, bayangan tidak sinkron dengan sumber cahaya, atau refleksi yang tidak masuk akal.",
    icon: LightbulbIcon,
    color: "bg-[#6c5cff]",
    text: "text-white",
    width: "flex-[3]",
  },
];

/* Foto polaroid. Frame mengikuti tema (terang/gelap) */
function Polaroid({
  src,
  caption,
  className,
}: {
  src: string;
  caption: string;
  className?: string;
}) {
  return (
    <figure
      className={`w-36 rounded-lg border border-slate-900/10 bg-white p-2 pb-0 shadow-lg dark:border-white/15 dark:bg-[#141633] sm:w-44 lg:w-40 xl:w-48 ${className ?? ""}`}
    >
      <div className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-slate-200 dark:bg-white/10">
        <img
          key={src}
          src={src}
          alt={caption}
          className="size-full object-cover"
          onLoad={(e) => (e.currentTarget.style.visibility = "visible")}
          onError={(e) => (e.currentTarget.style.visibility = "hidden")}
        />
      </div>
      <figcaption className="py-2.5 text-center text-base font-extrabold text-slate-900 dark:text-white sm:text-lg">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function MaterialScreen({ onRestart, onHome }: MaterialScreenProps) {
  const [activeId, setActiveId] = useState(TOPICS[0].id);
  const active = TOPICS.find((t) => t.id === activeId) ?? TOPICS[0];
  const images = IMAGES[active.id];

  const rows = [TOPICS.slice(0, 2), TOPICS.slice(2, 4)];

  return (
    <main className="relative mx-auto w-full max-w-5xl flex-1 px-4 py-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
            <BookOpenIcon size={24} weight="bold" />
          </span>
          <div>
            <p className="text-xs font-bold text-ink-soft">Materi Singkat</p>
            <h1 className="text-2xl font-extrabold text-ink">
              Cara Mendeteksi Video Buatan AI
            </h1>
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* Pengantar */}
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-soft">
        Video yang dihasilkan AI (Sora, Runway, Kling, dll.) makin sulit dibedakan dari
        video asli. Kuncinya bukan menebak sekilas, tapi{" "}
        <b className="text-ink">mencari detail kecil yang tidak konsisten</b>. Periksa
        empat hal berikut:
      </p>

      {/* Area tengah: penjelasan (tanpa kotak) + polaroid di tepi halaman */}
      <section className="relative mt-8 flex items-center justify-center lg:min-h-[420px]">
        {/* Polaroid desktop: posisi dihitung dari tepi layar.
            Ubah angka rem untuk menggeser (makin besar = makin ke tengah) */}
        <Polaroid
          src={images.real}
          caption="Real Video"
          className="hidden rotate-3 lg:absolute lg:top-0 lg:block lg:right-[calc(50%-50vw+1rem)] xl:right-[calc(50%-50vw+6rem)] 2xl:right-[calc(50%-50vw+15rem)]"
        />
        <Polaroid
          src={images.ai}
          caption="AI"
          className="hidden -rotate-6 lg:absolute lg:bottom-0 lg:block lg:left-[calc(50%-50vw+1rem)] xl:left-[calc(50%-50vw+6rem)] 2xl:left-[calc(50%-50vw+15rem)]"
        />

        {/* Penjelasan topik aktif, di tengah, tanpa background */}
        <div className="w-full">
          <article key={active.id} className="mx-auto max-w-md text-center">
            <active.icon size={36} weight="bold" className="mx-auto text-ink" />
            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
              {active.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">
              {active.body}
            </p>
          </article>

          {/* Polaroid versi mobile / jendela sempit */}
          <div className="mt-8 flex items-start justify-center gap-5 lg:hidden">
            <Polaroid src={images.ai} caption="AI" className="-rotate-6" />
            <Polaroid src={images.real} caption="Real Video" className="rotate-3" />
          </div>
        </div>
      </section>

      {/* Kotak topik (navigasi) */}
      <nav
        aria-label="Topik materi"
        className="mx-auto mt-6 flex w-full max-w-2xl flex-col gap-3"
      >
        {rows.map((row, i) => (
          <div key={i} className="flex gap-3">
            {row.map((t) => {
              const Icon = t.icon;
              const isActive = t.id === activeId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveId(t.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex h-14 gap-3 rounded-xl transition active:scale-[0.98] sm:h-16 ${t.width} ${t.text} ${
                    isActive
                      ? "outline outline-2 outline-offset-4 outline-slate-900 dark:outline-white"
                      : "hover:brightness-105"
                  }`}
                >
                  <span
                    className={`flex flex-1 items-center justify-center rounded-xl px-2 text-sm font-bold sm:text-base ${t.color}`}
                  >
                    {t.label}
                  </span>
                  <span
                    className={`grid aspect-square h-full place-items-center rounded-xl ${t.color}`}
                  >
                    <Icon size={22} weight="regular" />
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Literasi digital */}
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-ink-soft">
        <b className="text-ink">Budaya Literasi Digital:</b> sebelum membagikan video,
        tanyakan dari mana asalnya, apakah ada konteks yang jelas, dan apakah sumbernya
        bisa dipercaya.
      </p>

      {/* Aksi */}
      <div className="mx-auto mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl bg-primary px-6 py-4 text-base font-extrabold text-white transition hover:brightness-110 active:scale-[0.98]"
        >
          Main Lagi
        </button>
        <button
          type="button"
          onClick={onHome}
          className="flex items-center justify-center gap-2 rounded-xl border border-stone-300 px-6 py-4 text-base font-bold text-ink transition hover:bg-bg-soft dark:border-white/10"
        >
          <HouseIcon size={18} weight="bold" /> Kembali ke Home
        </button>
      </div>
    </main>
  );
}