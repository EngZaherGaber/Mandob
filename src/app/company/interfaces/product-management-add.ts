import { OptionItem } from './option-item';
import { VariantItem } from './variant-item';

export interface ProductManagementAdd {
  productName: string;
  productDescription: string;
  CollectionIDs: number[];
  CategorieIDs: number[];
  options: OptionItem[];
  variants: VariantItem[];
}
