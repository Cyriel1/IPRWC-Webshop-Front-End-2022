import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

import { environment } from "src/environments/environment";

import { AdminService } from "./admin.service";

import { Product } from "src/app/shop/models/product.model";

@Injectable()
export class AdminStorageService {

    constructor(
        private http: HttpClient,
        private adminService: AdminService) { }

    addProduct(file: File | null | undefined, product: Product): Observable<{ message: string }> {
        const productData = this.adminService.createProductFormData(file, product);

        return this.http.post<{ message: string }>(
            environment.serverDomain() + environment.shopPath + '/product',
            productData
        ).pipe(catchError(
            (err) => {
                console.error(`could not add product ${err.status}, body was: ${err.error}`);

                return throwError(() => err);
            }
        ));
    }

    updateProduct(file: File | null | undefined, product: Product): Observable<{ message: string }> {
        const productData = this.adminService.createProductFormData(file, product);

        return this.http.put<{ message: string }>(
            environment.serverDomain() + environment.shopPath + '/product',
            productData
        ).pipe(catchError(
            (err) => {
                console.error(`could not update product ${err.status}, body was: ${err.error}`);

                return throwError(() => err);
            }
        ));
    }

    deleteProduct(productId: number): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(
            environment.serverDomain() + environment.shopPath + `/product/${productId}`,
            {
                responseType: 'json'
            }
        ).pipe(catchError(
            (err) => {
                console.error(`could not delete product ${err.status}, body was: ${err.error}`);

                return throwError(() => err);
            }
        ));
    }

}