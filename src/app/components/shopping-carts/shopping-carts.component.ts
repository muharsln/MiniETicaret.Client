import { Component, computed } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-shopping-carts',
  standalone: true,
  imports: [],
  templateUrl: './shopping-carts.component.html',
  styleUrl: './shopping-carts.component.css'
})
export class ShoppingCartsComponent {
  total = computed(() => {
    let t = 0;
    this.cart.carts().forEach((val) =>{
      t += val.productPrice * val.quantity;
    });

    return t;
  });
  constructor(
    public cart: CartsService
  ){}
}
