import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { OrderModel } from '../../models/order.model';
import { api } from '../../constants';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders = signal<OrderModel[]>([]);
  token = signal<string>("");

  constructor(
    private http: HttpClient
  ) {
    if (localStorage.getItem("my-token")) {
      this.token.set(localStorage.getItem("my-token")!);
      this.getAll();
    }
  }

  getAll() {
    this.http.get<OrderModel[]>(`${api}/orders/getall`, {
      headers: {
        "Authorization": "Bearer " + this.token()
      }
    }).subscribe(res => {
      this.orders.set(res);
    })
  }
}
