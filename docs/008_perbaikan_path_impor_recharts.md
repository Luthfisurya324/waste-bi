# [008] Perbaikan Path Impor Recharts

## 📋 Deskripsi
Perbaikan path impor untuk tipe `NameType` dan `ValueType` dari recharts yang menyebabkan error build.

## 🎯 Tujuan
- Memperbaiki error build terkait impor dari `recharts/types/component/DefaultTooltipContent`
- Memastikan aplikasi dapat dijalankan tanpa error

## 🔧 Implementasi

### Perubahan yang Dilakukan
1. **File yang dimodifikasi:**
   - `src/components/Dashboard/CO2EmissionsChart.tsx` - Mengubah path impor untuk `NameType`, `ValueType`, dan `TooltipProps`
   - `src/components/Dashboard/RecyclingChart.tsx` - Mengubah path impor untuk `NameType`, `ValueType`, dan `TooltipProps`
   - `docs/006_implementasi_no_explicit_any.md` - Memperbarui contoh kode dengan path impor yang benar

2. **Bug yang diperbaiki:**
   - Error build: `Failed to resolve import "recharts/types/component/DefaultTooltipContent"` - Diperbaiki dengan mengubah path impor menjadi `recharts/lib/component/DefaultTooltipContent`
   - Error: `The requested module '/node_modules/.vite/deps/recharts.js?v=3447c5a4' does not provide an export named 'TooltipProps'` - Diperbaiki dengan mengimpor `TooltipProps` dari `recharts/lib/component/Tooltip`

### Detail Perubahan

#### Sebelum:
```typescript
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, TooltipProps } from 'recharts';
```

#### Sesudah:
```typescript
import { NameType, ValueType } from 'recharts/lib/component/DefaultTooltipContent';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TooltipProps } from 'recharts/lib/component/Tooltip';
```

## 🧪 Testing
- [x] Manual testing - Memastikan aplikasi dapat dijalankan tanpa error
- [x] Visual testing - Memastikan komponen chart tetap berfungsi dengan benar

## 📚 Dependencies
Tidak ada perubahan dependencies. Perubahan hanya pada path impor internal recharts.

## 🚨 Breaking Changes
Tidak ada breaking changes. Perubahan ini hanya memperbaiki kompatibilitas dengan versi recharts yang digunakan (v2.15.4).

## 🔍 Troubleshooting

### Masalah Umum
1. **Error: Failed to resolve import "recharts/types/component/DefaultTooltipContent"**
   - Solusi: Gunakan path impor `recharts/lib/component/DefaultTooltipContent` sebagai gantinya
   - Penyebab: Struktur internal package recharts berubah di versi terbaru

2. **Error: The requested module '/node_modules/.vite/deps/recharts.js?v=3447c5a4' does not provide an export named 'TooltipProps'**
   - Solusi: Impor `TooltipProps` dari `recharts/lib/component/Tooltip` alih-alih dari `recharts` langsung
   - Penyebab: Ekspor `TooltipProps` tidak tersedia di bundel utama recharts

### Catatan Tambahan
Perubahan ini mungkin perlu diterapkan ke file lain yang menggunakan impor serupa jika ditemukan di masa mendatang. Pastikan untuk memeriksa error build yang serupa.