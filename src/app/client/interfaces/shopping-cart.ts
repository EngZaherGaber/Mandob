export interface ShoppingCart {
  cartId: number;
  userId: number;
  totalPrice: number;
  totalDiscount: number;
  finalPrice: number;
  items: {
    cartItemId: number;
    variantId: number;
    variantName: string;
    productId: number;
    image: string;
    quantity: number;
    price: number;
    isFreebie: boolean;
  }[];
}
