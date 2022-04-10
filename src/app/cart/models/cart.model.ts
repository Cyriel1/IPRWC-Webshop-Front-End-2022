import { CartItem } from "./cart-item.model";

export class Cart {
    constructor(
        public cartItems: CartItem[],
        public totalPrice: number
    ) { }
}