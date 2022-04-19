import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { OrderStorageService } from '../order-storage.service';

import { Order } from '../../models/order.model';

@Injectable()
export class OrderResolverService implements Resolve<Order[]> {
    userId: number = 0;
    userSub: Subscription = new Subscription();

    constructor(
        private authService: AuthService,
        private orderStorageService: OrderStorageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order[]> {
        this.userSub = this.authService.user.subscribe((user) => {
            if (!!user) this.userId = user.id;
            this.userSub.unsubscribe();
        });

        return this.orderStorageService.fetchOrders(this.userId);
    }
}
