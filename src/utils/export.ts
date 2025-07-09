/**
 * Utility untuk mengekspor data ke format CSV.
 * @param data - Array objek yang akan diekspor.
 * @param filename - Nama file CSV yang akan diunduh (misal: 'data.csv').
 */
export const exportToCSV = (data: any[], filename: string): void => {
  if (!data || data.length === 0) {
    console.error('Tidak ada data untuk diekspor.');
    return;
  }

  const replacer = (_key: string, value: any): any => value === null ? '' : value;
  const header = Object.keys(data[0]);
  const csv = [
    header.join(','), // header row
    ...data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  if (link.download !== undefined) { // Feature detection
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
