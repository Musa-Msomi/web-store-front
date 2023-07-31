import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css'],
})
export class UsercartComponent implements OnInit {
  carts: Cart[] = [];
  products: Product[] = [];
  isLoading = false;
  grandTotal = 0;

  constructor(
    private productService: ProductService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCartsFromLocalStorage();
    this.loadProducts();
  }

  loadProducts(): void {
    const productIds: number[] = this.carts.reduce((ids: number[], cart) => {
      cart.products.forEach((product) => {
        if (!ids.includes(product.productId)) {
          ids.push(product.productId);
        }
      });
      return ids;
    }, []);

    this.productService.getProductsByIds(productIds).subscribe((products) => {
      this.products = products;
      this.calculateGrandTotal();
    });
  }

  calculateTotalPrice(cart: Cart): number {
    return cart.products.reduce((total, cartProduct) => {
      const productPrice = this.getProductPrice(cartProduct.productId);
      return total + cartProduct.quantity * productPrice;
    }, 0);
  }

  calculateGrandTotal(): void {
    this.grandTotal = this.carts.reduce(
      (total, cart) => total + this.calculateTotalPrice(cart),
      0
    );
  }
  updateQuantity(cart: Cart, productId: number, newQuantity: number): void {
    const cartProduct = cart.products.find(
      (product) => product.productId === productId
    );
    if (cartProduct) {
      cartProduct.quantity = newQuantity;
      this.saveCartsToLocalStorage();
      this.calculateGrandTotal();
    }
  }

  removeProduct(cart: Cart, productId: number): void {
    cart.products = cart.products.filter(
      (product) => product.productId !== productId
    );
    this.saveCartsToLocalStorage();
    this.calculateGrandTotal();
  }
  clearCart(): void {
    if (this.carts.some((cart) => cart.products.length > 0)) {
      this.carts.forEach((cart) => (cart.products = []));
      this.saveCartsToLocalStorage();
      this.calculateGrandTotal();
    } else {
      this.router.navigate(['/']);
    }
  }

  isCartEmpty(): boolean {
    return this.carts.every((cart) => cart.products.length === 0);
  }

  getProductImage(productId: number): string {
    const product = this.products.find((product) => product.id === productId);
    return product ? product.image : '';
  }

  getProductTitle(productId: number): string {
    const product = this.products.find((product) => product.id === productId);
    return product ? product.title : '';
  }

  getProductPrice(productId: number): number {
    const product = this.products.find((product) => product.id === productId);
    return product ? product.price : 0;
  }

  saveCartsToLocalStorage(): void {
    this.localStorageService.set('userCarts', this.carts);
  }

  getCartsFromLocalStorage(): void {
    this.carts = this.localStorageService.get('userCarts') || [];
  }
}
