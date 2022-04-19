import { Injectable } from "@angular/core";

import { Product } from "src/app/shop/models/product.model";

@Injectable()
export class AdminService {

    constructor() { }

    createProductFormData(file: File | null | undefined, product: Product): FormData {
        const productData = new FormData();
        if (file) {
            productData.set('file', file);
        }
        productData.set('file', new Blob);
        productData.set('product', JSON.stringify(product));


        return productData;
    }

}