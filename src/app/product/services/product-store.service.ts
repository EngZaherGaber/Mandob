import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GlobalSearchResponse } from '../../client/interfaces/global-search-response';
import { APIResponse } from '../../shared/interface/response';
import { ProductListFilter } from '../interfaces/product-list-filter';
import { ProductManagementItem } from '../interfaces/product-management-item';
import { ProductStoreResult } from '../interfaces/product-store-result';

@Injectable({
  providedIn: 'root',
})
export class ProductStoreService {
  url = environment.api + 'ProductStore/';
  constructor(private http: HttpClient) {}
  getAll(body: ProductListFilter) {
    return this.http.post<APIResponse<ProductStoreResult>>(this.url + 'getall', body);
  }
  globalSearch(globalFilter: string) {
    let params = new HttpParams();
    params = params.append('globalFilter', globalFilter);
    return this.http.get<APIResponse<GlobalSearchResponse>>(this.url + 'GlobalSearch', { params: params });
  }
  getOne(id: number) {
    return this.http.get<APIResponse<ProductManagementItem>>(this.url + id);
  }
}
