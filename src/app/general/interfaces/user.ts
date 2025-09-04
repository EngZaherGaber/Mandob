export interface User {
  userId?: number;
  userName: string;
  email: string;
  name: string;
  phoneNumber: string;
  isActive?: boolean;
  logo?: string;
  role: string;
  images: { imageUrl: string; imageId: number }[];
}
