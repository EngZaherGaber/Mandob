import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../../shared/interface/response';
import { TableLazyLoadEvent } from 'primeng/table';
import { Company } from '../interfaces/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyManagementService {
  url = environment.api + 'OwnerCompanyManagement/';
  constructor(private http: HttpClient) {}
  getAll(body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<Company[]>>(this.url + 'getall', body);
  }
  getOne(id: number) {
    return this.http.get<APIResponse<Company>>(this.url + id);
  }
  edit(id: number, body: Company) {
    return this.http.put<APIResponse<Company>>(this.url + id, body);
  }
  add(body: Company) {
    return this.http.post<APIResponse<Company>>(this.url, body);
  }

  delete(id: number) {
    return this.http.delete<APIResponse<boolean>>(this.url + id);
  }
  changeStatus(id: number) {
    return this.http.put<APIResponse<boolean>>(this.url + 'status/' + id, {});
  }
}
