export interface ProdManagementTableItem {
  productID: number;
  productName: string;
  productDescription: string;
  productImages: {
    imageID: number;
    imageURL: string;
    isPrimary: boolean;
  }[];
  companyID: number;
  maxPrice: number;
  currencyId: number;
  averageRating: number;
  ratingCount: number;
  currencyName: string;
  minPrice: number;
}
