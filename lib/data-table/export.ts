import * as XLSX from 'xlsx';

export interface ExportOptions {
  sheetName?: string;
  columnWidths?: number[];
  headerBold?: boolean;
  cellFormatters?: Record<string, (value: any) => string>;
}

/**
 * Exporta datos a Excel usando xlsx
 */
export async function exportToExcel(
  data: any[],
  filename: string,
  options?: ExportOptions
): Promise<void> {
  if (!data || data.length === 0) {
    throw new Error('No hay datos disponibles para exportar');
  }

  try {
    const sheetName = options?.sheetName || 'Datos';
    
    // Preparar datos
    const columnKeys = Object.keys(data[0]);
    const formattedData = data.map((row) => {
      const formattedRow: any = {};
      columnKeys.forEach((key) => {
        const formatter = options?.cellFormatters?.[key];
        formattedRow[key] = formatter ? formatter(row[key]) : row[key];
      });
      return formattedRow;
    });

    // Crear workbook y worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Aplicar anchos de columna
    if (options?.columnWidths) {
      worksheet['!cols'] = options.columnWidths.map((w) => ({ wch: w }));
    }

    // Generar y descargar
    const timestamp = new Date().toISOString().split('T')[0];
    const finalFilename = `${filename}_${timestamp}.xlsx`;
    XLSX.writeFile(workbook, finalFilename);

    return;
  } catch (error) {
    console.error('[ExportService] Error exportando a Excel:', error);
    throw new Error('Error al exportar datos a Excel');
  }
}

/**
 * Exporta datos a CSV
 */
export function exportToCSV(data: any[], filename: string): void {
  if (!data || data.length === 0) {
    throw new Error('No hay datos disponibles para exportar');
  }

  try {
    const columnKeys = Object.keys(data[0]);
    const csv = generateCSV(data, columnKeys);
    const timestamp = new Date().toISOString().split('T')[0];
    const finalFilename = `${filename}_${timestamp}.csv`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    downloadFile(blob, finalFilename);
  } catch (error) {
    console.error('[ExportService] Error exportando a CSV:', error);
    throw new Error('Error al exportar datos a CSV');
  }
}

/**
 * Genera contenido CSV
 */
function generateCSV(data: any[], headers: string[]): string {
  const csvHeaders = headers.map((h) => escapeCsvValue(h)).join(',');
  const csvRows = data
    .map((row) =>
      headers.map((header) => escapeCsvValue(row[header])).join(',')
    )
    .join('\n');

  return `${csvHeaders}\n${csvRows}`;
}

/**
 * Escapa valores para CSV
 */
function escapeCsvValue(value: any): string {
  if (value === null || value === undefined) return '';

  const stringValue = String(value);
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

/**
 * Descarga un archivo en el navegador
 */
function downloadFile(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
