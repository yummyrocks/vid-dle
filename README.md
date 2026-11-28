# Vid-dle

**Vid-dle: Media Pembelajaran Berbasis Gamifikasi untuk Meningkatkan
Literasi Digital terhadap Konten Video Buatan AI**

Web game tebak-tebakan: sistem memberikan sebuah video, kamu memutuskan
apakah video itu dibuat oleh **AI** atau **Bukan AI** (manusia).
Dirancang sebagai media pembelajaran literasi digital untuk pelajar/mahasiswa.

Referensi gameplay: [Songdle](https://www.songdle.app/) (tebak lagu) —
tapi dengan UI yang nyaman di layar **desktop maupun mobile**.

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
- **Popup feedback** setelah menjawab:
  - **Benar** → popup hijau: "Benar!" + petunjuk kenapa video itu AI/manusia.
  - **Salah** → popup merah: **memberi tahu jawaban kebenaran** (AI atau
    buatan manusia) + petunjuk singkatnya.
  - Tombol **Lanjut** ke soal berikutnya.
- **Materi pembelajaran singkat** di akhir sesi: ringkasan cara mendeteksi
  konten video AI (teks bisa diedit di `src/components/MaterialScreen.tsx`).

### UI / UX

- **2 tema: Terang & Gelap** — bisa diganti lewat tombol bulat (matahari/bulan),
  pilihan tersimpan di `localStorage`.
- **Tombol Kembali ke Home** di layar Hasil dan Materi.

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
│       ├── questions.ts          # 5 POOL DIFFICULTY + fungsi ambil sesi acak
│       ├── score.ts              # skor flat 20/benar, format skor
│       └── types.ts              # tipe bersama (Question, Difficulty, dst.)
│
├── AGENTS.md                     # aturan agent Next.js (dibuat otomatis next dev)
├── README.md                     # file ini
└── package.json
```
