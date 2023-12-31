import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input()
  product!: Product;
  @Output() addToCartClicked: EventEmitter<{
    productId: number;
    quantity: number;
  }> = new EventEmitter();

  quantity: number = 1;

  addToCart(): void {
    if (this.quantity > 0) {
      this.addToCartClicked.emit({
        productId: this.product.id,
        quantity: this.quantity,
      });
    }
  }
  productRatingAsStars(rate: number): string {
    const roundedRate = Math.round(rate * 2) / 2; 
    const fullStars = Math.floor(roundedRate);
    const halfStar = roundedRate % 1 !== 0;
  
    let starRating = '';
    for (let i = 0; i < fullStars; i++) {
      starRating += '★'; 
    }
    if (halfStar) {
      starRating += '½'; 
    }
  
    return starRating;
  }
  
}
