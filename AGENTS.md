<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# vid-dle

vid-dle adalah daily guessing game seperti wordle, setiap hari game akan menampilkan 3 video satu per satu, dan player diberikan tiga opsi `AI`, `Bukan AI`, dan `Tidak Yakin` mereka perlu menebak apakah video tersebut asli atau di generate oleh AI. Game akan menampilkan video berdasarkan tingkat kesulitannya, jika player memilih tidak yakin maka tingkat kesulitan akan menurun. Memilih `AI` atau `Bukan AI` akan mengunci jawaban mereka dan skor akan dihitung berdasarkan tingkat kesulitan yang mereka gunaakn untuk menebak

## Tingkat Kesulitan (Difficulty Level)

Game memiliki 2 Difficulty yang berbeda, Game Difficulty dan Video Difficulty.

### Game Difficulty

Game Difficulty akan ditentukan dengan durasi dan properti video, setiap tingkat kesulitan player akan mendapatkan `mult` atau pengkali skor, jika player berhasil menebak video maka skor akan dikali seusai dengan tingkat kesulitannya

1. Hard (Kesulitan Awal): 1 detik pertama dari video + tanpa suara -- 4x Mult
2. Medium: 1 detik pertama + suara. -- 3x Mult
3. Intermediate: 3 detik pertama + suara -- 2x mult
4. Easy: Full video + suara -- 1.5x mult
5. Very Easy: Full video + suara + hint -- 1x Mult

### Video Difficulty

Video Difficulty akan ditentukan dengan video yang ditampilkan, difficulty ini akan menentukan skor dasar yang nanti akan dihitung dengan `mult` untuk mendapatkan skor akhir. Difficulty ini akan di tentukan oleh admin, sementara sistem untuk menentukan difficulty video belum dibuat. **JANGAN** buat sistem tersebut secara mandiri jika developer tidak memerintahkan. jika task yang kamu kerjakan perlu sistem atau perlu properti video difficulty konfirmasi ulang dengan developer

# Glossary

vid-dle adalah tugas akhir dari mata kuliah Literasi Digital, projek ini dikerjakan oleh 5 mahasiswa Teknik Informatika, arahan dari dokumen ini bersifat sebagai "Default Setting" bukan Aturan keras,  prefrensi mahasiswa / developer harus bisa *me-override* arahan yang ada di dokumen ini.

# UI

Gunakan skill frontend-design dan design-taste-frontend ketika membuat perubahan ke UI. Kalau kamu bukan model claude gunakan subagent dengan model claude apa saja untuk melakukan design dan implementasi UI nya jika bisa. Jangan gunakan emoji untuk menggantikan icon, gunakan library icon seperti phosphor icons.

# Commits & Contribution

Jangan lakukan commit atau push ke branch `main` jika developer tidak menyuruh. Semua commit perlu penjelasan apa saja perubahannya dan mengapa diubah di commit description, dan credit dirimu sendiri pada commit description seperti "Ditulis oleh: \<model-slug\>". Ikuti pola commit message yang sudah ada di repo ini.
