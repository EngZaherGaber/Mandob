export interface ReviewSubmit {
  requestID: number;
  companyComment: string;
  distributorComment: string;
  companyRating: number;
  distributorRating: number;
  productReviews: {
    productID: number;
    comment: string;
    variantReviews: {
      productVariantID: number;
      rating: number;
    }[];
  }[];
}
