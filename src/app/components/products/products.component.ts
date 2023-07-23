import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/interfaces/cart';
import { CartProduct } from 'src/app/interfaces/cart-product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  showCart: boolean = false;
  selectedCategory: string | undefined;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addToCart({
    productId,
    quantity,
  }: {
    productId: number;
    quantity: number;
  }): void {
    if (quantity > 0) {
      const userId = 3;
      const date = new Date().toISOString();

      const userCarts = localStorage.getItem('userCarts');

      if (userCarts) {
        const parsedUserCarts: Cart[] = JSON.parse(userCarts);
        const indexOfExistingCart = parsedUserCarts.findIndex(
          (cart) => cart.userId === userId
        );

        if (indexOfExistingCart !== -1) {
          const existingProductIndex = parsedUserCarts[
            indexOfExistingCart
          ].products.findIndex(
            (cartProduct) => cartProduct.productId === productId
          );

          if (existingProductIndex !== -1) {
            parsedUserCarts[indexOfExistingCart].products[
              existingProductIndex
            ].quantity += quantity;
          } else {
            const cartProduct: CartProduct = { productId, quantity };
            parsedUserCarts[indexOfExistingCart].products.push(cartProduct);
          }

          localStorage.setItem('userCarts', JSON.stringify(parsedUserCarts));
          this.showSnackBar('Sucessfully added to cart');
        }
      } else {
        this.cartService
          .createCart(userId, date, [{ productId, quantity }])
          .subscribe((cart) => {
            console.log('userCarts now exists in localStorage:', cart);
            localStorage.setItem('userCarts', JSON.stringify([cart]));
          });

        this.showSnackBar('Sucessfully added to cart');
      }
    }
  }
  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
