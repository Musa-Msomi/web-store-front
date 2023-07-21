import { CartProduct } from './cart-product';

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
}
