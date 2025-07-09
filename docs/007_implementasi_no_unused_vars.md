# Implementasi Aturan ESLint no-unused-vars

## Deskripsi Tugas

Mengimplementasikan aturan ESLint `@typescript-eslint/no-unused-vars` untuk meningkatkan kualitas kode dengan mendeteksi dan menghilangkan variabel yang tidak digunakan dalam proyek TypeScript. Aturan ini membantu menjaga kebersihan kode dan mencegah potensi bug yang disebabkan oleh variabel yang dideklarasikan tetapi tidak digunakan.

## Perubahan yang Dilakukan

### 1. Konfigurasi ESLint

Menambahkan aturan `@typescript-eslint/no-unused-vars` ke dalam konfigurasi ESLint:

```javascript
// eslint.config.js
export default tseslint.config([
  // ... konfigurasi lainnya
  {
    // ... konfigurasi lainnya
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  },
])
```

Konfigurasi ini mematikan aturan `no-unused-vars` bawaan ESLint dan mengaktifkan versi TypeScript-nya yang lebih kuat dan mendukung fitur TypeScript.

### 2. Verifikasi Konfigurasi

Setelah memeriksa file `eslint.config.js`, kami menemukan bahwa aturan `no-unused-vars` sudah diimplementasikan dengan benar:

```javascript
rules: {
  '@typescript-eslint/no-explicit-any': 'error',
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': 'error'
}
```

## Manfaat Implementasi

Implementasi aturan `no-unused-vars` memberikan beberapa manfaat:

1. **Kode Lebih Bersih**: Menghilangkan variabel yang tidak digunakan membuat kode lebih mudah dibaca dan dipahami.

2. **Pencegahan Bug**: Variabel yang dideklarasikan tetapi tidak digunakan sering kali merupakan indikasi kesalahan logika atau kode yang tidak lengkap.

3. **Performa Lebih Baik**: Menghilangkan variabel yang tidak digunakan dapat meningkatkan performa aplikasi, terutama dalam lingkungan produksi setelah minifikasi.

4. **Pemeliharaan Lebih Mudah**: Kode tanpa variabel yang tidak digunakan lebih mudah dipelihara dan direfaktor.

## Praktik Terbaik

Beberapa praktik terbaik terkait penggunaan aturan `no-unused-vars`:

1. **Gunakan Underscore untuk Parameter yang Tidak Digunakan**: Jika Anda memiliki parameter fungsi yang diperlukan oleh tipe atau interface tetapi tidak digunakan dalam implementasi, awali dengan underscore:

   ```typescript
   function processData(_unusedParam: string, usedParam: number): void {
     console.log(usedParam);
   }
   ```

2. **Manfaatkan Destructuring Selektif**: Saat menggunakan destructuring, hanya ambil properti yang benar-benar digunakan:

   ```typescript
   // Baik: Hanya mengambil properti yang digunakan
   const { name, age } = user;
   console.log(name, age);
   
   // Hindari: Mengambil properti yang tidak digunakan
   const { name, age, address } = user; // address tidak digunakan
   console.log(name, age);
   ```

3. **Hapus Impor yang Tidak Digunakan**: Pastikan untuk menghapus impor modul atau komponen yang tidak digunakan dalam file.

## Kesimpulan

Implementasi aturan ESLint `no-unused-vars` adalah langkah penting dalam meningkatkan kualitas kode TypeScript. Dengan mendeteksi dan menghilangkan variabel yang tidak digunakan, kita dapat membuat kode yang lebih bersih, lebih mudah dipelihara, dan lebih efisien. Aturan ini sudah dikonfigurasi dengan benar dalam proyek dan siap digunakan untuk meningkatkan kualitas kode secara keseluruhan.