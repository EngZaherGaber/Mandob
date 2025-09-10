export interface ProdManagementTableItem {
  productID: number;
  productName: string;
  productDescription: string;
  productImages: {
    imageID: number;
    imageURL: string;
    isPrimary: boolean;
  }[];
}
