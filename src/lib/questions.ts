import type { Candidate, Difficulty, Question } from "./types";

export const DIFFICULTY_ORDER: readonly Difficulty[] = [
  "mudah",
  "sedang",
  "sulit",
  "sangat-sulit",
  "ekstrem",
] as const;

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  mudah: "Mudah",
  sedang: "Sedang",
  sulit: "Sulit",
  "sangat-sulit": "Sangat Sulit",
  ekstrem: "Ekstrem",
};

/** Tahap buka video dalam persentase durasi total (20% → 60% → 100%). */
export const UNLOCK_STEPS = [0.2, 0.6, 1.0] as const;

/**
 * Pool kandidat video per difficulty.
 * ATURAN: tiap pool wajib punya minimal 1 video AI dan 1 video manusia.
 */
export const pools: Record<Difficulty, readonly Candidate[]> = {
  mudah: [
    { src: "/ai-video/ai-1.mp4", answer: "ai", hint: "Artefak pada detail kecil (tangan, tekstur) terlihat tidak konsisten." },
    { src: "/human-video/human-1.mp4", answer: "human", hint: "Pencahayaan dan gerakan subjek alami serta konsisten sepanjang video." },
  ],
  sedang: [
    { src: "/ai-video/ai-2.mp4", answer: "ai", hint: "Latar belakang berubah halus antar frame dan kilatan cahaya tidak masuk akal." },
    { src: "/human-video/human-2.mp4", answer: "human", hint: "Detail kecil seperti bayangan dan refleksi mengikuti hukum fisika." },
  ],
  sulit: [
    { src: "/ai-video/ai-3.mp4", answer: "ai", hint: "Gerakan mulus tapi ekspresi/audio tidak sinkron dengan situasi." },
    { src: "/human-video/human-3.mp4", answer: "human", hint: "Noise kamera, gerakan tangan, dan mikrofon terdengar natural." },
  ],
  "sangat-sulit": [
    { src: "/ai-video/ai-1.mp4", answer: "ai", hint: "Perhatikan kilatan cahaya dan tekstur yang berulang secara tidak wajar." },
    { src: "/human-video/human-2.mp4", answer: "human", hint: "Ketidaksempurnaan kecil (goyangan, fokus) justru menandai rekaman asli." },
  ],
  ekstrem: [
    { src: "/ai-video/ai-2.mp4", answer: "ai", hint: "Cek detail mikro: lipatan baju dan refleksi mata yang terlalu 'sempurna'." },
    { src: "/human-video/human-3.mp4", answer: "human", hint: "Kontinuitas detail kecil antar frame tidak bisa dipalsukan konsisten." },
  ],
};

/** Ambil 1 sesi berisi 5 soal: tiap difficulty diambil 1 kandidat acak. */
export function pickRandomSession(): Question[] {
  return DIFFICULTY_ORDER.map((difficulty) => {
    const candidates = pools[difficulty];
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    return {
      id: `${difficulty}-${pick.src}`,
      difficulty,
      ...pick,
    };
  });
}
