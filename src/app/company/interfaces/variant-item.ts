export interface VariantItem {
  variantName: string;
  sku: string;
  stockQuantity: number;
  optionAssignments: {
    optionName: string;
    optionValueName: string;
  }[];
  price: number;
}
