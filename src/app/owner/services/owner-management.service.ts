import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { Owner } from '../interfaces/owner';

@Injectable({
  providedIn: 'root',
})
export class OwnerManagementService {
  url = environment.api + 'OwnerManagement/';
  constructor(private http: HttpClient) {}
  getAll(body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<Owner[]>>(this.url + 'getall', body);
  }
  getOne(id: number) {
    return this.http.get<APIResponse<Owner>>(this.url + id);
  }
  edit(id: number, body: Owner) {
    return this.http.put<APIResponse<Owner>>(this.url + id, body);
  }
  add(body: Owner) {
    return this.http.post<APIResponse<Owner>>(this.url, body);
  }

  delete(id: number) {
    return this.http.delete<APIResponse<boolean>>(this.url + id);
  }
  changeStatus(id: number) {
    return this.http.put<APIResponse<boolean>>(this.url + 'status/' + id, {});
  }
}
