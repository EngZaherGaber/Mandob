import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { Request } from '../interfaces/request';
import { ShoppingCart } from '../interfaces/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class ClientRequestService {
  url = environment.api + 'ClientRequest/';
  constructor(private http: HttpClient) {}
  createFromCart(body: ShoppingCart) {
    return this.http.post<APIResponse<any>>(this.url + 'create-from-cart', body);
  }
  getAll(isWaiting: boolean, body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<Request[]>>(this.url + 'my-requests/' + isWaiting, body);
  }
  complete(requestId: number) {
    return this.http.put<APIResponse<Request>>(this.url + 'complete-request/' + requestId, {});
  }
  cancel(requestId: number) {
    return this.http.put<APIResponse<Request>>(this.url + 'cancel-request/' + requestId, {});
  }
}
