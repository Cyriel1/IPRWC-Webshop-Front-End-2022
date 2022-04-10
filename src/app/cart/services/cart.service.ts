import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CartItem } from '../models/cart-item.model';

@Injectable()
export class CartService {
    cartHasChanged: Subject<void> = new Subject<void>();

    constructor() { }

    createCartItemKey(productId: number): string {
        const cartItemKey: string = btoa(`cart-item:${productId}`);
        return cartItemKey;
    }

    encodeCartItem(cartItem: CartItem): string {
        const encodedCartItem = btoa(JSON.stringify(cartItem));
        return encodedCartItem;
    }

    decodeCartItemKey(key: string): string | null {
        const cartItem = 'cart-item:';
        const decodedKey = atob(key);
        if (!decodedKey.includes(cartItem)) return null;
        const productId = decodedKey.replace(cartItem, '');

        return productId;
    }

    decodeCartItem(cartItem: string): CartItem {
        const decodedCartItem: CartItem = JSON.parse(atob(cartItem));
        return decodedCartItem;
    }

}
