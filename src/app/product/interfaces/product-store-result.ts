import { ProdManagementTableItem } from './product-management-table-item';

export interface ProductStoreResult {
  products: ProdManagementTableItem[];
  totalCount: number;
  optionList: { [key: string]: string[] };
  minPrice: number;
  maxPrice: number;
}
