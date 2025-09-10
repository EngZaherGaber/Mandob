import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { Plan } from '../interfaces/plan';

@Injectable({
  providedIn: 'root',
})
export class PlanManagementService {
  url = environment.api + 'Plans/';
  constructor(private http: HttpClient) {}
  getAll(body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<Plan[]>>(this.url + 'getall', body);
  }
  getOne(id: number) {
    return this.http.get<APIResponse<Plan>>(this.url + id);
  }
  edit(id: number, body: Plan) {
    return this.http.put<APIResponse<Plan>>(this.url + id, body);
  }
  add(body: Plan) {
    return this.http.post<APIResponse<Plan>>(this.url, body);
  }

  delete(id: number) {
    return this.http.delete<APIResponse<boolean>>(this.url + id);
  }
  changeStatus(id: number) {
    return this.http.put<APIResponse<boolean>>(this.url + 'status/' + id, {});
  }
}
