export interface RequestReviewDetails {
  requestID: number;
  distributorName: string;
  companyName: string;
  requestItems: {
    productName: string;
    productID: number;
    variants: {
      variantID: number;
      variantName: string;
    }[];
  }[];
}
