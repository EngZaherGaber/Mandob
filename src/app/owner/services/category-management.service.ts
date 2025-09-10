import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryManagementService {
  url = environment.api + 'Category/';
  constructor(private http: HttpClient) {}
  getAll(body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<Category[]>>(this.url + 'getall', body);
  }
  getOne(id: number) {
    return this.http.get<APIResponse<Category>>(this.url + id);
  }
  edit(id: number, body: Category) {
    return this.http.put<APIResponse<Category>>(this.url + id, body);
  }
  add(body: Category) {
    return this.http.post<APIResponse<Category>>(this.url, body);
  }

  delete(id: number) {
    return this.http.delete<APIResponse<boolean>>(this.url + id);
  }
  changeStatus(id: number) {
    return this.http.put<APIResponse<boolean>>(this.url + 'status/' + id, {});
  }
}
