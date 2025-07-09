# Implementasi Sidebar dan Halaman Terpisah

## Deskripsi

Dokumen ini menjelaskan implementasi sidebar dan pemisahan halaman pada aplikasi Waste BI. Perubahan ini bertujuan untuk meningkatkan navigasi dan pengalaman pengguna dengan memisahkan fungsionalitas ke dalam halaman-halaman terpisah yang dapat diakses melalui sidebar.

## Perubahan yang Dilakukan

### 1. Struktur Komponen

- Membuat komponen `Sidebar` untuk navigasi antar halaman
- Membuat komponen `Layout` sebagai kerangka dasar untuk semua halaman
- Membuat `NotificationProvider` untuk mengelola notifikasi secara global

### 2. Halaman Terpisah

Membuat halaman-halaman terpisah untuk setiap fungsionalitas utama:

- `DashboardPage`: Menampilkan statistik dan ringkasan data
- `InputTrukPage`: Form untuk input data awal truk
- `PencacahanPage`: Form dan proses pencacahan sampah
- `TrukBelumDicacahPage`: Daftar truk yang belum dicacah
- `TrukSudahDicacahPage`: Daftar truk yang sudah dicacah

### 3. Navigasi

- Mengimplementasikan React Router untuk navigasi antar halaman
- Menambahkan indikator halaman aktif pada sidebar

## Cara Penggunaan

1. Navigasi antar halaman dapat dilakukan melalui sidebar di sebelah kiri layar
2. Setiap halaman memiliki fungsionalitas spesifik sesuai dengan namanya
3. Notifikasi akan muncul di pojok kanan atas layar saat ada aksi yang berhasil atau gagal

## Troubleshooting

### Masalah: Halaman tidak ditemukan (404)

**Solusi**: Pastikan route yang diakses sudah terdaftar di `App.tsx`. Route yang tersedia adalah:
- `/` (Dashboard)
- `/input-truk` (Input Data Truk)
- `/pencacahan` (Pencacahan)
- `/truk-belum-dicacah` (Truk Belum Dicacah)
- `/truk-sudah-dicacah` (Truk Sudah Dicacah)

### Masalah: Data tidak tersimpan saat berpindah halaman

**Solusi**: Aplikasi menggunakan `localStorage` untuk menyimpan data. Pastikan browser mendukung dan mengizinkan penggunaan localStorage.

## Pengembangan Selanjutnya

- Implementasi breadcrumbs untuk navigasi yang lebih baik
- Penambahan fitur pencarian pada halaman daftar truk
- Implementasi filter dan sorting pada tabel data