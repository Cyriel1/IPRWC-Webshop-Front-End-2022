import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

import { OrderService } from './order.service';

import { Order } from '../models/order.model';

@Injectable()
export class OrderStorageService {

  constructor(
    private http: HttpClient,
    private orderService: OrderService) { }

  fetchOrders(userId: number): Observable<Order[]> {
    return this.http
      .get<Order[]>(
        environment.serverDomain() + environment.shopPath + `/orders/${userId}`,
        {
          responseType: 'json'
        }
      ).pipe(tap({
        next: (responseData) => {
          this.orderService.setOrders(responseData);
        },
        error: (err) => {
          console.error(`could not load orders ${err.status}, body was: ${err.error}`);
        }
      }));
  }
}
