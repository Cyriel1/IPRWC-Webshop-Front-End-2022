import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

import { CartService } from 'src/app/cart/services/cart.service';

import { Cart } from 'src/app/cart/models/cart.model';
import { CartItem } from '../models/cart-item.model';
import { CartRequest } from 'src/app/cart/models/payloads/cartRequest.model';

@Injectable()
export class CartStorageService {

    constructor(
        private http: HttpClient,
        private cartService: CartService) { }

    saveCart(cartRequest: CartRequest): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(
            environment.serverDomain() + environment.shopPath + '/orders',
            cartRequest,
            {
                responseType: 'json'
            },
        ).pipe(catchError(
            (err) => {
                console.error(`could not store cart ${err.status}, body was: ${err.error}`);

                return throwError(() => err);
            }
        ));
    }

    fetchCart(): Cart {
        const cartItems: CartItem[] = this.fetchCartItems();
        let totalPrice: number = 0;
        cartItems.forEach((cartItem) => {
            const price = cartItem.product.price;
            const quantity = cartItem.quantity;
            totalPrice += price * quantity;
        })
        return new Cart(cartItems, totalPrice);
    }

    saveCartItem(productId: number, cartItem: CartItem) {
        const cartItemKey = this.cartService.createCartItemKey(productId);
        const encodedCartItem = this.cartService.encodeCartItem(cartItem);
        sessionStorage.setItem(cartItemKey, encodedCartItem);
    }

    fetchCartItems(): CartItem[] {
        const cartItems: CartItem[] = [];
        Object.keys(sessionStorage).forEach((key) => {
            const cartItemKey = this.cartService.decodeCartItemKey(key);
            if (cartItemKey) {
                const encodedCartItem = sessionStorage.getItem(key);
                if (encodedCartItem) {
                    const decodedCartItem = this.cartService.decodeCartItem(encodedCartItem);
                    cartItems.push(decodedCartItem);
                }
            }
        });

        return cartItems;
    }

    fetchCartItem(productId: number): CartItem | null {
        const cartItemKey = this.cartService.createCartItemKey(productId);
        const encodedCartItem = sessionStorage.getItem(cartItemKey);
        if (encodedCartItem) {
            const decodedCartItem = this.cartService.decodeCartItem(encodedCartItem);

            return decodedCartItem;
        }
        return null;
    }

    updateCartItem(oldCartItem: CartItem, newCartItem: CartItem): void {
        this.deleteCartItem(oldCartItem.product.id);
        this.saveCartItem(newCartItem.product.id, newCartItem);
    }

    deleteCartItem(productId: number): void {
        const cartItemKey = this.cartService.createCartItemKey(productId);
        const encodedCartItem = sessionStorage.getItem(cartItemKey);

        if (encodedCartItem) {
            sessionStorage.removeItem(cartItemKey);
        }
    }
}
