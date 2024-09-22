import { Component, signal } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { api } from '../../constants';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products = signal<ProductModel[]>([]);
  token = signal<string>("");
  constructor(
    private http: HttpClient,
    private cart:CartsService
  ) {
    if (localStorage.getItem("my-token")) {
      this.token.set(localStorage.getItem("my-token")!);

      this.getAll();
    }
  };

  getAll() {
    this.http.get<ProductModel[]>(`${api}/products/getall`, {
      headers: {
        "Authorization": "Bearer " + this.token()
      }
    }).subscribe(res => {
      this.products.set(res);
    })
  }

  addShoppingCart(product: ProductModel) {
    const data = {
      productId: product.id,
      quantity: 1
    }
    this.http.post<string>(`${api}/shoppingCarts/create`, data, {
      headers: {
        "Authorization": "Bearer " + this.token()
      }
    }).subscribe(res => {
      // Toast ile sepete eklendi uyarısı bas
      console.log("Sepete eklendi");
      this.cart.getAll();
      this.getAll();
    })
  }
}
