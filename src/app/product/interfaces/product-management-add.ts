import { OptionItem } from './option-item';
import { VariantItem } from './variant-item';

export interface ProductManagementAdd {
  productName: string;
  productDescription: string;
  collectionIDs: number[];
  categorieIDs: number[];
  options: OptionItem[];
  variants: VariantItem[];
  productImages?: any[];
}
