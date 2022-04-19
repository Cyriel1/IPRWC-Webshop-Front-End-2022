import { CartItem } from "../cart-item.model";

export class CartRequest {
    constructor(
        public userId: number,
        public orders: CartItem[]
    ) { }
}