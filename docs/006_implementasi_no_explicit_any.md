# Implementasi Aturan ESLint no-explicit-any

## Deskripsi Tugas

Mengimplementasikan aturan ESLint `@typescript-eslint/no-explicit-any` untuk meningkatkan keamanan tipe di proyek TypeScript. Aturan ini melarang penggunaan tipe `any` secara eksplisit dan mendorong penggunaan tipe yang lebih spesifik.

## Perubahan yang Dilakukan

### 1. Konfigurasi ESLint

Menambahkan aturan `@typescript-eslint/no-explicit-any` ke dalam konfigurasi ESLint:

```javascript
// eslint.config.js
export default tseslint.config([
  // ... konfigurasi lainnya
  {
    // ... konfigurasi lainnya
    rules: {
      '@typescript-eslint/no-explicit-any': 'error'
    }
  },
])
```

### 2. Perbaikan Penggunaan Tipe `any`

Berikut adalah daftar file yang diperbaiki:

#### a. `src/hooks/useLocalStorage.ts`

Mengganti tipe `any` dengan tipe yang lebih spesifik:

```typescript
// Sebelum
const updateSetting = useCallback(
  (key: string, value: any) => {
    // ...
  },
  [setSettings]
);

// Sesudah
type SettingValue = string | boolean | number;

const updateSetting = useCallback(
  (key: string, value: SettingValue) => {
    // ...
  },
  [setSettings]
);
```

#### b. `src/pages/PencacahanPage.tsx`

Mengganti tipe `any` dengan tipe `SortingFormData`:

```typescript
// Sebelum
const handleSortingSubmit = React.useCallback(async (formData: any): Promise<boolean> => {
  // ...
}, [selectedTruck, addSortingData, showNotification]);

// Sesudah
const handleSortingSubmit = React.useCallback(async (formData: SortingFormData): Promise<boolean> => {
  // ...
}, [selectedTruck, addSortingData, showNotification]);
```

#### c. `src/components/Dashboard/CO2EmissionsChart.tsx` dan `src/components/Dashboard/RecyclingChart.tsx`

Mengganti tipe `any` dengan tipe `TooltipProps` dari recharts:

```typescript
// Sebelum
const CustomTooltip = ({ active, payload, label }: any) => {
  // ...
};

// Sesudah
import { TooltipProps } from 'recharts/lib/component/Tooltip';
import { NameType, ValueType } from 'recharts/lib/component/DefaultTooltipContent';

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  // ...
};
```

#### d. `src/pages/InputTrukPage.tsx`

Mengganti tipe `any` dengan tipe `InitialTruckFormData`:

```typescript
// Sebelum
const handleInitialTruckSubmit = React.useCallback(async (formData: any): Promise<boolean> => {
  // ...
}, [addInitialTruckData, showNotification]);

// Sesudah
const handleInitialTruckSubmit = React.useCallback(async (formData: InitialTruckFormData): Promise<boolean> => {
  // ...
}, [addInitialTruckData, showNotification]);
```

#### e. `src/utils/export.ts`

Mengganti tipe `any` dengan tipe generik yang lebih spesifik:

```typescript
// Sebelum
export const exportToCSV = (data: any[], filename: string): void => {
  // ...
};
const replacer = (_key: string, value: any): any => value === null ? '' : value;

// Sesudah
export const exportToCSV = <T extends Record<string, unknown>>(data: T[], filename: string): void => {
  // ...
};
const replacer = (_key: string, value: unknown): unknown => value === null ? '' : value;
```

#### f. `src/utils/formatting.ts`

Mengganti tipe `any` dengan tipe union yang lebih spesifik:

```typescript
// Sebelum
export const formatDate = (
  date: any,
  options: Intl.DateTimeFormatOptions = {
    // ...
  }
): string => {
  // ...
};

// Sesudah
export const formatDate = (
  date: Date | string | number | { seconds: number } | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    // ...
  }
): string => {
  // ...
};
```

Juga mengganti tipe `any` di fungsi `exportToCSV` dengan tipe generik:

```typescript
// Sebelum
export const exportToCSV = (data: any[], filename: string = 'data-truk.csv'): void => {
  // ...
};

// Sesudah
export const exportToCSV = <T extends Record<string, unknown>>(data: T[], filename: string = 'data-truk.csv'): void => {
  // ...
};
```

## Pelajaran

Beberapa pelajaran yang dapat diambil:

1. Penggunaan tipe `any` mengurangi keamanan tipe yang merupakan salah satu keunggulan utama TypeScript.
2. Tipe yang lebih spesifik seperti union types, generics, atau interface dapat memberikan keamanan tipe yang lebih baik tanpa mengorbankan fleksibilitas.
3. Untuk kasus seperti props dari library pihak ketiga (seperti recharts), kita dapat mengimpor tipe yang disediakan oleh library tersebut daripada menggunakan `any`.
4. Penggunaan tipe generik seperti `<T extends Record<string, unknown>>` memberikan fleksibilitas sekaligus keamanan tipe yang lebih baik dibandingkan `any[]`.

## Kesimpulan

Implementasi aturan ESLint `@typescript-eslint/no-explicit-any` telah berhasil dilakukan. Semua penggunaan tipe `any` telah diganti dengan tipe yang lebih spesifik, meningkatkan keamanan tipe di seluruh proyek. Hal ini akan membantu mencegah bug yang terkait dengan tipe data dan membuat kode lebih mudah dipahami dan dipelihara.