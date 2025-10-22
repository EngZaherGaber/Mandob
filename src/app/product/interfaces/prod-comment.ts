export interface ProdComment {
  userID: string;
  name: string;
  comment: string;
  image: {
    imageId: number;
    imageUrl: string;
    isLogo: boolean;
  };
}
