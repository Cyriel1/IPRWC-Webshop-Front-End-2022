import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/cart/models/cart-item.model';
import { CartStorageService } from 'src/app/shared/services/cart-storage.service';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss']
})
export class CartButtonComponent implements OnInit {
  @Input() product: Product = new Product(0, 0.00, '', '', '', '');;

  cartCheck:boolean = false;
  addToCart:string = "Add to Cart";

  constructor(private cartStorageService:CartStorageService) { }

  ngOnInit(): void {
    this.isAddedToCart();
  }

  isAddedToCart(): void {
    const cartItem = this.cartStorageService.fetchCartItem(this.product.id);
    if (cartItem) {
      this.cartCheck = true;
      this.addToCart = 'Added';

      return;
    }
    this.cartCheck = false;
  }

  onAddToCart(): void {
    this.cartCheck = true;
    this.addToCart = 'Added';
    const cartItem = new CartItem(this.product, 1);
    this.cartStorageService.saveCartItem(this.product.id, cartItem);
  }

}