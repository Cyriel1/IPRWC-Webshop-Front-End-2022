import { Product } from "src/app/shop/models/product.model";

export class CartItem {
    constructor(
        public product: Product,
        public quantity: number
    ) { }
}