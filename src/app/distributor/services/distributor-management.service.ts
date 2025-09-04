import { Injectable } from '@angular/core';
import { Distributor } from '../interfaces/distributor';
import { HttpClient } from '@angular/common/http';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';

@Injectable({
  providedIn: 'root',
})
export class DistributorManagementService {
  url = environment.api + 'CompanyDistributorManagement/';
  constructor(private http: HttpClient) {}
  getAll(body: TableLazyLoadEvent, companyId: number) {
    return this.http.post<APIResponse<Distributor[]>>(this.url + 'getall/' + companyId, body);
  }
  getOne(id: number) {
    return this.http.get<APIResponse<Distributor>>(this.url + id);
  }
  edit(id: number, body: Distributor) {
    return this.http.put<APIResponse<Distributor>>(this.url + id, body);
  }
  add(body: Distributor) {
    return this.http.post<APIResponse<Distributor>>(this.url, body);
  }

  delete(id: number) {
    return this.http.delete<APIResponse<boolean>>(this.url + id);
  }
  changeStatus(id: number) {
    return this.http.put<APIResponse<boolean>>(this.url + 'status/' + id, {});
  }
}
