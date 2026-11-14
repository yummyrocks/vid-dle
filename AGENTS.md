<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# vid-dle

vid-dle adalah daily guessing game seperti wordle, setiap hari game akan menampilkan video, dan player diberikan tiga opsi `AI`, `Bukan AI`, dan `Tidak Yakin` mereka perlu menebak apakah video tersebut asli atau di generate oleh AI. Game akan menampilkan video berdasarkan tingkat kesulitannya, jika player memilih tidak yakin maka tingkat kesulitan akan menurun. Memilih `AI` atau `Bukan AI` akan mengunci jawaban mereka dan skor akan dihitung berdasarkan tingkat kesulitan yang mereka gunakan untuk menebak

## Tingkat Kesulitan (Difficulty Level)

Tingkat kesulitan akan ditentukan dengan durasi dan properti video, setiap tingkat kesulitan player akan mendapatkan `mult` atau pengkali skor, jika player berhasil menebak video maka skor akan dikali seusai dengan tingkat kesulitannya

1. Hard (Kesulitan Awal): 1 detik pertama dari video + tanpa suara -- 4x Mult
2. Medium: 1 detik pertama + suara. -- 3x Mult
3. Intermediate: 3 detik pertama + suara -- 2x mult
4. Easy: Full video + suara -- 1.5x mult
5. Very Easy: Full video + suara + hint -- 1x Mult

# Glossary

vid-dle adalah tugas akhir dari mata kuliah Literasi Digital, projek ini dikerjakan oleh 5 mahasiswa Teknik Informatika, arahan dari dokumen ini bersifat sebagai "Default Setting" bukan Aturan keras,  prefrensi mahasiswa / developer harus bisa me-override arahan yang ada di dokumen ini.

