# Vid-dle

**Vid-dle: Media Pembelajaran Berbasis Gamifikasi untuk Meningkatkan
Literasi Digital terhadap Konten Video Buatan AI**

Web game tebak-tebakan: sistem memberikan sebuah video, kamu memutuskan
apakah video itu dibuat oleh **AI** atau **Bukan AI** (manusia).
Dirancang sebagai media pembelajaran literasi digital untuk pelajar/mahasiswa.

Referensi gameplay: [Songdle](https://www.songdle.app/) (tebak lagu) —
tapi dengan UI yang nyaman di layar **desktop maupun mobile**.

> Tanpa database, tanpa ranking, tanpa akun. Semua state ada di browser.

---

## Fitur

### Gameplay

- **5 video per sesi** dengan **tingkat difficulty berurutan**:
  **Mudah → Sedang → Sulit → Sangat Sulit → Ekstrem**.
- Tiap soal **diacak** apakah video-nya AI atau buatan manusia,
  diambil dari pool difficulty tersebut.
- **Video singkat** (7–15 detik), ditonton bertahap berdasarkan **persentase**:
  - Awal: **20%** pertama video (suara masih mati/muted).
  - Tekan **Kurang Yakin**: lanjut ke **60%** (suara menyala).
  - Tekan **Kurang Yakin** lagi: **100%** (video terbuka penuh).
  - Di 100%: tombol **Kurang Yakin nonaktif**, wajib pilih AI / Bukan AI.
- **3 tombol jawaban**: **AI**, **Bukan AI**, **Kurang Yakin**.
  - **Kurang Yakin opsional** — murni untuk analisa (perpanjang durasi),
    **tidak mempengaruhi skor sama sekali**.
- **Skor**: benar = **20 poin**, salah = **0** — total maksimal **100**
  untuk 5 soal. Semua benar → skor 100 → langsung ke materi.
- **Popup feedback** setelah menjawab:
  - **Benar** → popup hijau: "Benar!" + petunjuk kenapa video itu AI/manusia.
  - **Salah** → popup merah: **memberi tahu jawaban kebenaran** (AI atau
    buatan manusia) + petunjuk singkatnya.
  - Tombol **Lanjut** ke soal berikutnya.
- **Layar hasil akhir**: total skor (x/100), jumlah benar, dan skor terbaik
  (disimpan di `localStorage`, bukan server).
- **Materi pembelajaran singkat** di akhir sesi: ringkasan cara mendeteksi
  konten video AI (teks bisa diedit di `src/components/MaterialScreen.tsx`).

### Video Player

- Preview terbatas berbasis persentase (20% → 60% → 100%),
  dibuka bertahap lewat "Kurang Yakin".
- **Tombol "Periksa Detail"**: modal fullscreen untuk zoom video —
  zoom pakai scroll/pinch/tombol **+ / −**, geser pakai drag (pan).
- Kontrol play/pause custom, progress bar persentase terbuka,
  autoplay muted (kompatibel kebijakan autoplay browser;
  suara menyala setelah interaksi "Kurang Yakin").

### UI / UX

- **Hero opening**: layar pembuka ala referensi — logo gradient, kartu
  **AI vs Non-AI**, langkah cara main, tombol Mulai Main.
- **2 tema: Terang & Gelap** — bisa diganti lewat tombol bulat (matahari/bulan),
  pilihan tersimpan di `localStorage`.
- **Tombol Kembali ke Home** di layar Hasil dan Materi.
- **Desktop**: layout 2 kolom — video besar di kiri, panel skor + tombol
  keputusan di kanan.
- **Mobile**: stack vertikal, tombol besar mudah di-tap.
- Progress berupa titik 5 soal + label difficulty, warna cerah & bersih,
  tanpa asset gambar berat (dekorasi murni CSS + icon).

### Yang TIDAK dibangun (sengaja)

- ❌ Leaderboard / ranking
- ❌ Database & backend
- ❌ Akun / login
- ❌ Multiplier/pengali skor (skor flat: benar 20, salah 0)

---

## Cara Bermain

1. Buka halaman awal → klik **Mulai**.
2. Tonton **20%** pertama video (difficulty soal 1: Mudah).
3. Sudah yakin? Pilih **AI** atau **Bukan AI**.
   Belum yakin? Tekan **Kurang Yakin** → video lanjut ke **60%**
   lalu **100%**, suara menyala — skor tidak berpengaruh, murni analisa.
4. Jawab → muncul **popup** benar/salah (kalau salah, jawaban kebenaran
   ikut ditampilkan) → klik **Lanjut**.
5. Ulangi sampai 5 soal (Mudah → Ekstrem) selesai.
6. Lihat hasil akhir (x/100), lalu baca **materi literasi digital** singkat.
   Tombol **Home** di layar hasil/materi untuk kembali ke pembuka.

---

## Struktur Folder & File

```
vid-dle/
├── public/
│   ├── ai-video/                 # video buatan AI
│   │   ├── ai-1.mp4              # (contoh: difficulty mudah)
│   │   ├── ai-2.mp4              # (contoh: difficulty sedang)
│   │   └── ai-3.mp4              # (contoh: difficulty sulit)
│   └── human-video/              # video buatan manusia (TAMBAHKAN DI SINI)
│       ├── human-1.mp4           # ← placeholder, isi dengan video asli
│       ├── human-2.mp4           # ← placeholder, isi dengan video asli
│       └── human-3.mp4           # ← placeholder, isi dengan video asli
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            # root layout, font, metadata judul situs
│   │   ├── page.tsx              # state machine game (intro→main→hasil→materi)
│   │   └── globals.css           # tema dark, token warna, utilitas
│   │
│   ├── components/
│   │   ├── IntroScreen.tsx       # hero pembuka (logo, AI vs Non-AI, cara main)
│   │   ├── ThemeToggle.tsx       # ganti tema terang/gelap
│   │   ├── GameHeader.tsx        # progress 5 soal + difficulty, skor
│   │   ├── VideoPlayer.tsx       # video unlock berbasis % + kontrol (revisi dari VideoPreview.tsx)
│   │   ├── ZoomModal.tsx         # modal fullscreen zoom/pan "Periksa Detail"
│   │   ├── DecisionBar.tsx       # tombol AI / Bukan AI / Kurang Yakin (revisi dari DecisionButton.tsx)
│   │   ├── FeedbackPopup.tsx     # popup benar (hijau) / salah (merah + jawaban kebenaran)
│   │   ├── ResultScreen.tsx      # ringkasan skor akhir sesi (x/100)
│   │   └── MaterialScreen.tsx    # materi literasi digital (teks bisa diedit)
│   │
│   └── lib/
│       ├── questions.ts          # ★ 5 POOL DIFFICULTY + fungsi ambil sesi acak
│       ├── score.ts              # skor flat 20/benar, format skor
│       └── types.ts              # tipe bersama (Question, Difficulty, dst.)
│
├── AGENTS.md                     # aturan agent Next.js (dibuat otomatis next dev)
├── README.md                     # file ini
└── package.json
```

> Catatan: `VideoPreview.tsx` → diganti jadi `VideoPlayer.tsx`,
> `DecisionButton.tsx` → diganti jadi `DecisionBar.tsx` (menyesuaikan
> kebutuhan gameplay baru).

### Model data (`src/lib/questions.ts`)

```ts
export const DIFFICULTY_ORDER = ["mudah", "sedang", "sulit", "sangat-sulit", "ekstrem"] as const;

export const pools = {
  mudah: [
    { src: "/ai-video/ai-1.mp4", answer: "ai", hint: "..." },
    { src: "/human-video/human-1.mp4", answer: "human", hint: "..." },
  ],
  sedang: [ /* ≥1 video AI + ≥1 video manusia */ ],
  sulit:  [ /* ... */ ],
  "sangat-sulit": [ /* ... */ ],
  ekstrem: [ /* ... */ ],
};

// Sesi = loop DIFFICULTY_ORDER, tiap level pick 1 kandidat acak dari pool
export function pickRandomSession(): Question[];
```

---

## Task (Pekerjaan)

### Fase 1 — Fondasi data & logika

- [ ] Buat `src/lib/types.ts` (tipe `Candidate`, `Question`, `Difficulty`, `GamePhase`, dst.)
- [ ] Buat `src/lib/questions.ts`: 5 pool difficulty (mudah…ekstrem), tiap pool
      minimal 1 video AI + 1 video manusia, field `src`, `answer`, `hint` —
      awalisi pakai 3 video AI yang ada + placeholder human
- [ ] Buat fungsi `pickRandomSession()`: loop 5 difficulty, pick 1 acak per pool
- [ ] Rapikan `src/lib/score.ts`: `SCORE_PER_CORRECT = 20`, total maks 100, format skor
- [ ] Buat folder `public/human-video/`

### Fase 2 — Video player & zoom

- [ ] Bangun ulang `VideoPlayer.tsx`: unlock berbasis **persentase**
      (20% → 60% → 100%), loop dalam batas unlock, unmute setelah
      "Kurang Yakin", progress bar persentase terbuka
- [ ] Bangun `ZoomModal.tsx`: fullscreen, zoom wheel/pinch/tombol ±, drag pan,
      tombol tutup, fokus keyboard (Esc)

### Fase 3 — UI game

- [ ] `DecisionBar.tsx`: 3 tombol + state disabled "Kurang Yakin" di 100%
- [ ] `GameHeader.tsx`: titik progress 5 soal + label difficulty, skor live
- [ ] `FeedbackPopup.tsx`: popup benar (hijau, petunjuk) & salah
      (merah, **tampilkan jawaban kebenaran** + petunjuk), tombol Lanjut
- [ ] `page.tsx`: orkestrasi state machine (intro → main → popup →
      hasil → materi) + grid desktop 2 kolom / mobile stack
- [ ] `IntroScreen.tsx`, `ResultScreen.tsx` (skor x/100)
- [ ] `globals.css`: tema dark, konsistensi warna & spacing

### Fase 4 — Materi & finishing

- [ ] `MaterialScreen.tsx`: draft materi literasi digital (cara deteksi
      video AI: artefak tangan/jari, kilatan cahaya, latar tidak konsisten,
      audio mulus tapi gerak aneh, dsb.)
- [ ] Update `layout.tsx`: title/description metadata "Vid-dle"
- [ ] Simpan skor terbaik ke `localStorage`
- [ ] Cek responsivitas mobile + desktop
- [ ] `npm run lint` dan `npm run build` harus hijau

---

## Maintenance (Cara Menambah / Mengganti Video)

1. **Siapkan file `.mp4`** (disarankan ≤ 5 MB, resolusi 720p, durasi 7–15 detik).
2. **Letakkan di folder sesuai asalnya**:
   - video AI → `public/ai-video/ai-4.mp4`
   - video manusia → `public/human-video/human-4.mp4`
3. **Daftarkan ke pool difficulty yang sesuai** di `src/lib/questions.ts`:

   ```ts
   sedang: [
     { src: "/ai-video/ai-2.mp4", answer: "ai",
       hint: "Gerakan jari tidak konsisten antar frame." },
     { src: "/human-video/human-2.mp4", answer: "human",
       hint: "Detail latar dan pencahayaan konsisten sepanjang video." },
     // tambahkan kandidat baru di sini
   ],
   ```

4. **Aturan pool**:
   - Setiap difficulty (5 tingkat) **wajib** punya minimal **1 video AI
     dan 1 video manusia**, supaya randomisasi AI/manusia bermakna.
   - Makin tinggi difficulty → makin sulit bedain AI vs manusia
     (mudah: artefak mencolok; ekstrem: hampir mustahil dilihat sekilas).
5. **Mengganti teks materi**: edit `src/components/MaterialScreen.tsx`.
6. **Mengganti angka skor**: `src/lib/score.ts` (`SCORE_PER_CORRECT`).
7. **Mengganti tahap persentase unlock**: konstanta `UNLOCK_STEPS`
   di `src/lib/questions.ts` (default `[0.2, 0.6, 1.0]`).

### Aturan konten

- Video harus bebas hak cipta atau buatan sendiri.
- Jangan menampilkan nama file/path video di layar ke pemain
  (jawaban hanya dibaca dari `questions.ts`).
- Jaga keseimbangan jumlah kandidat AI dan manusia di tiap pool.

### Cek berkala

- `npm run lint && npm run build` sebelum commit.
- Uji main 1 sesi penuh (5 difficulty) di Chrome desktop + browser HP.
