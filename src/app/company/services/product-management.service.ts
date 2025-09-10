import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { ProductManagementAdd } from '../interfaces/product-management-add';
import { ProductManagementItem } from '../interfaces/product-management-item';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  url = environment.api + 'Product/';
  constructor(private http: HttpClient) {}
  getAll(body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<any[]>>(this.url + 'getall', body);
  }
  getOne(id: number) {
    return this.http.get<APIResponse<ProductManagementItem>>(this.url + id);
  }
  edit(id: number, body: ProductManagementItem) {
    return this.http.put<APIResponse<ProductManagementItem>>(this.url + id, body);
  }
  add(body: ProductManagementAdd) {
    return this.http.post<APIResponse<ProductManagementItem>>(this.url, body);
  }

  delete(id: number) {
    return this.http.delete<APIResponse<boolean>>(this.url + id);
  }
  changeStatus(id: number) {
    return this.http.put<APIResponse<boolean>>(this.url + 'status/' + id, {});
  }
}
