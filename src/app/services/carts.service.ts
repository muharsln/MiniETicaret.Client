import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ShoppingCartModel } from '../models/shopping-cart.model';
import { api } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  token = signal<string>("");
  carts = signal<ShoppingCartModel[]>([]);
  constructor(
    private http: HttpClient
  ) {
    if (localStorage.getItem("my-token")) {
      this.token.set(localStorage.getItem("my-token")!);
      this.getAll();
    }
  }

  getAll() {
    this.http.get<ShoppingCartModel[]>(`${api}/shoppingCarts/getall`, {
      headers: {
        "Authorization": "Bearer " + this.token()
      }
    }).subscribe(res => {
      this.carts.set(res);
    })
  }

  createOrder() {
    this.http.get<string>(`${api}/shoppingCarts/createOrder`, {
      headers: {
        "Authorization": "Bearer " + this.token()
      }
    }).subscribe(res => {
      this.getAll();
      // Toast ile uyarı basılacak
      console.log(res)
    })
  }
}
