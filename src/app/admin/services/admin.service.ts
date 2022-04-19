import { Injectable } from "@angular/core";

import { Product } from "src/app/shop/models/product.model";

@Injectable()
export class AdminService {

    constructor() { }

    createProductFormData(file: File | null | undefined, product: Product): FormData {
        const productData = new FormData();
        productData.set('product', JSON.stringify(product));
        if (file) {
            productData.set('file', file);

            return productData;
        }
        productData.set('file', new Blob);

        return productData;
    }

}