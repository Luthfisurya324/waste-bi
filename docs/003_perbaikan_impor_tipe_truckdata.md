# Perbaikan Impor Tipe TruckData

## Deskripsi Masalah

Terjadi error pada aplikasi saat mengakses halaman Pencacahan:

```
PencacahanPage.tsx:6 Uncaught SyntaxError: The requested module '/src/types/index.ts' does not provide an export named 'TruckData' (at PencacahanPage.tsx:6:10)
```

Error ini menunjukkan bahwa tipe `TruckData` tidak dapat diimpor dari file `/src/types/index.ts` meskipun file tersebut seharusnya mengekspor tipe tersebut dari file `truck.ts`.

## Analisis Masalah

Setelah memeriksa struktur kode, ditemukan bahwa:

1. File `types/index.ts` mengekspor tipe `TruckData` dari file `./truck.ts`
2. File `truck.ts` mendefinisikan interface `TruckData` dengan benar
3. Namun, terjadi masalah saat mengimpor tipe tersebut melalui barrel file (index.ts)

Masalah ini kemungkinan disebabkan oleh cara TypeScript menangani re-ekspor tipe dalam barrel files, terutama saat menggunakan bundler seperti Vite.

## Solusi

Solusi yang diterapkan adalah mengubah impor di file `PencacahanPage.tsx` dari:

```typescript
import { TruckData } from '../types';
```

Menjadi impor langsung dari file sumber:

```typescript
import { TruckData } from '../types/truck';
```

Dengan mengimpor langsung dari file sumber, kita menghindari masalah re-ekspor tipe yang dapat terjadi dengan barrel files.

## Hasil

Setelah perubahan diterapkan, aplikasi dapat berjalan dengan normal tanpa error. Halaman Pencacahan dapat diakses dan berfungsi sebagaimana mestinya.

## Pelajaran

Beberapa pelajaran yang dapat diambil:

1. Untuk tipe TypeScript, terkadang lebih baik mengimpor langsung dari file sumber daripada melalui barrel files (index.ts) jika terjadi masalah.
2. Perhatikan cara bundler (seperti Vite) menangani re-ekspor tipe, karena dapat berbeda dengan cara TypeScript menanganinya secara native.
3. Ketika menghadapi error impor, periksa jalur impor dan pastikan tipe tersebut benar-benar diekspor dari file yang direferensikan.

## Rekomendasi

Untuk menghindari masalah serupa di masa depan, beberapa rekomendasi:

1. Pertimbangkan untuk mengimpor tipe langsung dari file sumber untuk kasus-kasus kritis.
2. Pastikan barrel files (index.ts) mengekspor tipe dengan benar dan konsisten.
3. Jika menggunakan barrel files, lakukan pengujian untuk memastikan impor berfungsi dengan benar di berbagai bagian aplikasi.