import { ProductManagementAdd } from './product-management-add';

export interface ProductManagementItem extends ProductManagementAdd {
  companyId: number;
  companyName: string;
  currecnyId: number;
  currecnyName: string;
  averageRating: number;
  ratingCount: number;
}
