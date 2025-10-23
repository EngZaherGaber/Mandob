export interface ProdComment {
  userID: string;
  name: string;
  comment: string;
  rating: number;
  image: {
    imageId: number;
    imageUrl: string;
    isLogo: boolean;
  };
}
