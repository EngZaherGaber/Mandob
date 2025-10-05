import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { ShoppingCart } from '../interfaces/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class RequestManagementService {
  url = environment.api + 'Request/';
  constructor(private http: HttpClient) {}
  createFromCart(body: ShoppingCart) {
    return this.http.post<APIResponse<any>>(this.url + 'create-from-cart', body);
  }
}
