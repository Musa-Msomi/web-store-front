import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }
  getProductsByIds(productIds: number[]): Observable<Product[]> {
    const requests: Observable<Product>[] = productIds.map((id) =>
      this.http.get<Product>(`${this.productsUrl}/${id}`)
    );

    return forkJoin(requests);
  }
  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${productId}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.productsUrl}/categories`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/category/${category}`);
  }
}
