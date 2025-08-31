import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../../shared/interface/response';
import { TableLazyLoadEvent } from 'primeng/table';

@Injectable({
  providedIn: 'root',
})
export class AdCompanyManagementService {
  url = environment.api + 'OwnerManagementCompany/';
  constructor(private http: HttpClient) {}
  edit(body: any, id: number) {
    return this.http.put<APIResponse<any>>(this.url + '/' + id, body);
  }
  getAll(body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<any[]>>(this.url + '/GetAll', body);
  }
}
