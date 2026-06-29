# SE2026

Aplikasi pendataan sosial ekonomi berbasis React, Redux Toolkit, Firebase, Express, JSON backup, PWA, responsive UI, dan dark mode.

## Fitur

- Login Google dengan Firebase Auth.
- Halaman Home, Login, Data, Dashboard, Desa, RT, Keluarga, dan Profil.
- CRUD bertingkat untuk Desa, RT, dan Keluarga.
- Hak akses owner berbasis `uid`.
- Form pengeluaran dengan input Rupiah, angka saja, hitung otomatis, dan copy hasil.
- Search realtime dan filter Desa, RT, Petugas.
- Export dan import JSON.
- Backend Express untuk backup JSON per user di `data/{uid}.json`.
- PWA melalui `vite-plugin-pwa`.
- Responsive dan dark mode.

## Instalasi

```bash
npm install
```

## Konfigurasi Firebase

1. Buat project Firebase.
2. Aktifkan Authentication Google.
3. Buat file `.env` dari `.env.example`.
4. Buat service account Firebase Admin.
5. Isi bagian Firebase Admin di `.env` yang sama.

## Menjalankan Development

```bash
npm run dev
```

Frontend berjalan di `http://localhost:5173`.
Backend berjalan di `http://localhost:4000`.

## Struktur Firestore Yang Direkomendasikan

```text
users/{uid}/desa/{desaId}/rt/{rtId}/keluarga/{keluargaId}
```

Versi aplikasi ini juga mirror data ke koleksi publik:

```text
public_desa
public_rt
public_keluarga
```

Pakai `firestore.rules` di root project agar user login bisa membaca semua data publik dan hanya owner yang bisa menulis datanya sendiri.

## Deploy

- Firebase Hosting: jalankan `npm run build`, lalu deploy folder `dist`.
- Vercel: deploy root project ini.
- Server Express dapat dipasang di layanan Node.js seperti Cloud Run, Railway, Render, atau VPS.
