import { Product } from "src/app/shop/models/product.model";

export class Order {
    constructor(
        public userId: number,
        public product: Product,
        public quantity: number,
        public timestamp: string
    ) { }
}