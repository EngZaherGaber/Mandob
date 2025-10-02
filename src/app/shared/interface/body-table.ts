export interface columnTable {
  header: string;
  field: string;
  headerType: 'bool' | 'int' | 'datetime' | 'float' | 'currency' | 'json' | 'tag' | 'toggle' | 'string';
}
export interface BodyTable {
  loading: boolean;
  data: any[];
  columns: columnTable[];
}
