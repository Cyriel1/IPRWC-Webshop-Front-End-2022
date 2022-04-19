import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shop/models/product.model';

import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss']
})
export class OrderPaymentComponent implements OnInit {
  @Input() order: Order = new Order(0, new Product(0, 0.00, '', '', '', ''), 0, '');

  constructor() { }

  ngOnInit(): void {
  }

}
