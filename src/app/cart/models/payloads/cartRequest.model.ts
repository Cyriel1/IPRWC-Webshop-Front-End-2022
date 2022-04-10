import { CartItem } from "../cart-item.model";

export class CartRequest {
    constructor(
        public email:string,
        public cartItems:CartItem[]
    ) { }
}