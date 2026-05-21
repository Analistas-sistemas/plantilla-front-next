/**
 * Tipos de datos de columna
 */
export enum ColumnType {
  TEXT = 'text',
  NUMBER = 'number',
  CURRENCY = 'currency',
  DATE = 'date',
  BOOLEAN = 'boolean',
  DROPDOWN = 'dropdown',
  CUSTOM = 'custom',
}

/**
 * Tipos de filtro
 */
export enum FilterType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  DROPDOWN = 'dropdown',
  NONE = 'none',
}

/**
 * Opciones de dropdown
 */
export interface DropdownOption {
  label: string;
  value: any;
}

/**
 * Configuración de columna
 */
export interface DataTableColumn<TData = any> {
  field: string;
  header: string;
  type: ColumnType;
  filterType?: FilterType;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  sortable?: boolean;
  mobileVisible?: boolean;
  mobileOnly?: boolean;
  align?: 'left' | 'center' | 'right';
  numberFormat?: string;
  numberLocale?: string;
  currencyDecimals?: number;
  showCurrencySymbol?: boolean;
  dateFormat?: string;
  dropdownOptions?: DropdownOption[];
  getLabel?: (value: any) => string;
  getTooltip?: (value: any) => string;
  isAction?: boolean;
  cssClass?: string;
  globalFilter?: boolean;
  clickable?: boolean;
  showTooltip?: boolean;
  editable?: boolean;
  chipSeverityResolver?: (value: any, row: TData) => 'positive' | 'negative' | undefined;
  chipListDelimiter?: string;
}

/**
 * Acción de fila
 */
export interface DataTableAction<TData = any> {
  icon: string;
  label?: string;
  severity?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  tooltip?: string;
  tooltipPosition?: 'top' | 'left' | 'right' | 'bottom';
  styleClass?: string;
  disabled?: (row: TData) => boolean;
  action: (row: TData, index: number) => void;
  permission?: boolean | ((row: TData) => boolean);
}

/**
 * Configuración del DataTable
 */
export interface DataTableConfig<TData = any> {
  columns: DataTableColumn<TData>[];
  data: TData[];
  showGlobalSearch?: boolean;
  globalSearchPlaceholder?: string;
  disableGlobalSearch?: boolean;
  showColumnFilters?: boolean;
  showExportButton?: boolean;
  exportButtonLabel?: string;
  exportButtonTooltip?: string;
  exportButtonDisabled?: boolean;
  onExport?: (filteredData: TData[]) => void;
  showRefreshButton?: boolean;
  onRefresh?: () => void;
  rowActions?: DataTableAction<TData>[];
  selection?: boolean;
  dataKey?: string;
  loading?: boolean;
  emptyMessage?: string;
  rowsPerPage?: number;
  showPaginator?: boolean;
  rowsPerPageOptions?: number[];
  first?: number;
  totalRecords?: number;
  lazyLoading?: boolean;
  globalFilterFields?: string[];
  scrollHeight?: string;
  showCurrentPageReport?: boolean;
  currentPageReportTemplate?: string;
  isRowSelectable?: (row: TData) => boolean;
  getRowClass?: (row: TData) => string;
  editableFields?: string[];
  isRowEditing?: (row: TData) => boolean;
  onEditValueChange?: (row: TData, field: string, value: any) => void;
  manualFiltering?: boolean;
  enableCellCopy?: boolean;
  rowClickMode?: 'single' | 'double';
  onRowClick?: (row: TData) => void;
}

/**
 * Estado de filtros
 */
export interface DataTableFilters {
  global: string;
  columns: Record<string, any>;
}

/**
 * Estado de paginación
 */
export interface DataTablePagination {
  pageIndex: number;
  pageSize: number;
}

/**
 * Estado de ordenamiento
 */
export interface DataTableSorting {
  id: string;
  desc: boolean;
}
