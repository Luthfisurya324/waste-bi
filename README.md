# Waste BI Dashboard

Aplikasi dashboard untuk manajemen dan analisis data sampah.

## Dokumentasi Pengembangan

Dokumentasi pengembangan tersedia di direktori `/docs`:

- [001 - Penataan dan Organisasi Proyek](./docs/001_project_cleanup_and_organization.md)
- [002 - Implementasi Sidebar dan Halaman Terpisah](./docs/002_implementasi_sidebar_dan_halaman_terpisah.md)
- [003 - Perbaikan Impor Tipe TruckData](./docs/003_perbaikan_impor_tipe_truckdata.md)
- [004 - Perbaikan Impor TruckData PencacahanPage](./docs/004_perbaikan_impor_truckdata_pencacahanpage.md)
- [005 - Peningkatan Kualitas Kode](./docs/005_peningkatan_kualitas_kode.md)
- [006 - Implementasi No Explicit Any](./docs/006_implementasi_no_explicit_any.md)
- [007 - Implementasi No Unused Vars](./docs/007_implementasi_no_unused_vars.md)
- [008 - Perbaikan Path Impor Recharts](./docs/008_perbaikan_path_impor_recharts.md)

## Teknologi

Proyek ini menggunakan:

- React + TypeScript + Vite
- Tailwind CSS untuk styling
- Recharts untuk visualisasi data

## Pengembangan

### Instalasi

```bash
pnpm install
```

### Menjalankan Development Server

```bash
pnpm dev
```

### Build untuk Production

```bash
pnpm build
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
