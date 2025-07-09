# Penggantian Emoji dengan Heroicons

## Deskripsi

Dokumen ini menjelaskan proses penggantian emoji dan ikon SVG inline dengan ikon dari library Heroicons untuk meningkatkan konsistensi tampilan dan kualitas UI aplikasi.

## Latar Belakang

Sebelumnya, aplikasi menggunakan emoji Unicode (seperti 📊, 🚛, ⚖️) dan SVG inline untuk menampilkan ikon. Pendekatan ini memiliki beberapa kelemahan:

1. Emoji dapat terlihat berbeda di berbagai sistem operasi dan browser
2. Sulit untuk menyesuaikan ukuran dan warna emoji
3. SVG inline membuat kode menjadi lebih panjang dan sulit dibaca
4. Tidak konsisten dalam gaya visual

## Implementasi

### 1. Instalasi Heroicons

Heroicons adalah library ikon SVG yang populer dan kompatibel dengan React dan Tailwind CSS. Library ini diinstal menggunakan perintah:

```bash
pnpm add @heroicons/react
```

### 2. Penggantian Emoji di Sidebar

Emoji di komponen Sidebar diganti dengan ikon yang sesuai dari Heroicons:

- 📊 (Dashboard) → `<ChartBarIcon />`
- 🚛 (Input Data Truk) → `<TruckIcon />`
- ⚖️ (Pencacahan) → `<ScaleIcon />`
- 📋 (Truk Belum Dicacah) → `<ClipboardIcon />`
- ✅ (Truk Sudah Dicacah) → `<CheckCircleIcon />`

Selain itu, emoji 🚛 di judul aplikasi juga diganti dengan `<TruckIcon />`.

### 3. Penggantian Emoji di Notifikasi

Emoji di komponen NotificationProvider diganti dengan ikon yang sesuai:

- ✓ (Success) → `<CheckIcon />`
- ✗ (Error) → `<XMarkIcon />`
- ℹ (Info) → `<InformationCircleIcon />`

### 4. Penggantian SVG di Dashboard

SVG inline di komponen Dashboard dan StatsCards diganti dengan ikon dari Heroicons:

- Chart Bar SVG → `<ChartBarIcon />`
- Stats Card Icons → `<CubeIcon />`, `<SparklesIcon />`, `<TrashIcon />`, `<ChartBarIcon />`
- Recycling Categories Icons → `<ArchiveBoxIcon />`, `<DocumentIcon />`, `<CubeIcon />`, `<BeakerIcon />`, `<FunnelIcon />`

## Keuntungan

1. **Konsistensi Visual**: Semua ikon sekarang memiliki gaya visual yang konsisten
2. **Kode Lebih Bersih**: Mengurangi jumlah kode SVG inline yang panjang
3. **Kemudahan Kustomisasi**: Ikon dapat dengan mudah disesuaikan ukuran dan warnanya menggunakan class Tailwind
4. **Performa Lebih Baik**: Heroicons dioptimalkan untuk performa web
5. **Aksesibilitas**: Ikon dari Heroicons lebih baik dalam hal aksesibilitas

## Potensi Masalah

1. Dependensi tambahan pada package eksternal
2. Perlu memastikan kompatibilitas dengan versi React yang digunakan

## Kesimpulan

Penggantian emoji dan SVG inline dengan Heroicons telah berhasil meningkatkan konsistensi visual dan kualitas UI aplikasi. Penggunaan library ikon standar juga memudahkan pengembangan dan pemeliharaan di masa depan.