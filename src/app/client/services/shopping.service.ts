import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { ShoppingCart } from '../interfaces/shopping-cart';
import { ShoppingCartAddItem } from '../interfaces/shopping-cart-add-item';
import { ShoppingCartUpdateItem } from '../interfaces/shopping-cart-update-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingManagementService {
  url = environment.api + 'ShoppingCart/';
  constructor(private http: HttpClient) {}
  add(body: ShoppingCartAddItem) {
    return this.http.post<APIResponse<ShoppingCart>>(this.url + 'add', body);
  }
  update(body: ShoppingCartUpdateItem[]) {
    return this.http.put<APIResponse<ShoppingCart>>(this.url + 'update', body);
  }
  getOne() {
    return this.http.get<APIResponse<ShoppingCart>>(this.url);
  }
  removeItem(cartItemId: number) {
    return this.http.delete<APIResponse<ShoppingCart>>(this.url + 'remove-item/' + cartItemId);
  }
  clear(cartId: number) {
    return this.http.delete<APIResponse<boolean>>(this.url + 'clear');
  }
}
