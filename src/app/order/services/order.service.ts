import { Injectable } from '@angular/core';
import { Profile } from 'src/app/profile/models/profile.model';

import { Receipt } from '../models/receipt.model';
import { Order } from '../models/order.model';

@Injectable()
export class OrderService {
    orders: Order[] = [];

    constructor() { }

    getReceipts(profile: Profile): Receipt[] {
        const receipts: Receipt[] = []
        const timestamps = this.getTimestamps();
        timestamps.forEach(timestamp => {
            receipts.push(new Receipt(profile,
                this.orders.filter(
                    (value) => value.timestamp == timestamp)
                , timestamp));
        });

        return receipts;
    }

    getTimestamps(): string[] {
        const timestamps: string[] = [];
        this.orders.forEach((value) => {
            timestamps.push(value.timestamp);
        });

        return [...new Set(timestamps)];
    }

    setOrders(orders: Order[]): void {
        this.orders = orders;
    }

    getOrders(): Order[] {
        return this.orders;
    }
}
