import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../interfaces/cart';
import { CartProduct } from '../interfaces/cart-product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = 'https://fakestoreapi.com/carts';

  constructor(private httpClient: HttpClient) {}

  getAllCarts(): Observable<Cart[]> {
    return this.httpClient.get<Cart[]>(this.url);
  }

  getUserCarts(userId: number): Observable<Cart[]> {
    return this.httpClient.get<Cart[]>(`${this.url}/user/${userId}`);
  }

  createCart(
    userId: number,
    date: string,
    products: CartProduct[]
  ): Observable<Cart> {
    const cartData = { userId, date, products };
    return this.httpClient.post<Cart>(this.url, cartData);
  }

  updateCart(
    cartId: number,
    userId: number,
    date: string,
    products: CartProduct[]
  ): Observable<Cart> {
    const cart: Cart = {
      id: cartId,
      userId: userId,
      date: date,
      products: products,
    };

    return this.httpClient.put<Cart>(`${this.url}/${cartId}`, cart);
  }

  deleteCart(cartId: number): Observable<Cart> {
    return this.httpClient.delete<Cart>(`${this.url}/${cartId}`);
  }
}
