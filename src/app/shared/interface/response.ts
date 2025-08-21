export interface APIResponse<T> {
  succeeded: boolean;
  message: string;
  data: T;
  error: any[];
  count: number | 0;
}
