export interface GlobalSearchResponse {
  products: {
    productId: number;
    productName: string;
    productDescription: string;
    currencyId: number;
    maxPrice: number;
    minPrice: number;
    image: string;
  }[];
  categories: {
    categoryId: number;
    categoryName: string;
    categoryDescription: string;
  }[];
  collections: {
    collectionId: number;
    collectionName: string;
    companyName: string;
  }[];

  companies: {
    companyId: number;
    companyName: string;
    companyDescription: string;
  }[];
}
