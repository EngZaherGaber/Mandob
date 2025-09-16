export interface VariantItem {
  variantName: string;
  sku: string;
  quantity: number;
  optionAssignments: {
    optionName: string;
    optionValueName: string;
  }[];
  variantImages?: string[];
  price: number;
}
