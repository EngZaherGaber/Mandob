import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { Return } from '../interfaces/return';
import { ReturnAdd } from '../interfaces/return-add';

@Injectable({
  providedIn: 'root',
})
export class ClientReturnService {
  url = environment.api + 'ClientReturns/';
  constructor(private http: HttpClient) {}
  create(body: ReturnAdd) {
    return this.http.post<APIResponse<Return>>(this.url, body);
  }
  cancel(returnRequestId: number) {
    return this.http.put<APIResponse<Return>>(this.url + '/cancel/' + returnRequestId, {});
  }
  getAll(requestId: number | null, body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<Return[]>>(this.url + 'getall/' + (requestId ?? ''), body);
  }
}
