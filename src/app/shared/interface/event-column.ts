export interface EventColumn {
  field: string;
  command?: (event: any, field: string, rowData: any) => void;
  permission?: string;
  visible?: (rowData: any) => boolean;
  disable?: (field: string, rowData: any) => boolean;
}
