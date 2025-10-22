export interface ReviewSubmit {
  requestID: number;
  companyComment: string;
  distributorComment: string;
  distributorName?: string;
  companyRating: number;
  companyName?: string;
  distributorRating: number;
  productReviews: {
    productID: number;
    productName?: string;
    comment: string;
    variantReviews: {
      variantName?: string;
      productVariantID: number;
      rating: number;
    }[];
  }[];
}
