import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { Return } from '../../client/interfaces/return';
import { APIResponse } from '../../shared/interface/response';

@Injectable({
  providedIn: 'root',
})
export class CompanyReturnService {
  url = environment.api + 'CompanyReturns/';
  constructor(private http: HttpClient) {}

  getAll(requestId: number | null, body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<Return[]>>(this.url + 'getall/' + (requestId ?? ''), body);
  }
  approve(body: { returnRequestId: number; distributorId: number }) {
    return this.http.put<APIResponse<Return[]>>(this.url + 'approve', body);
  }
  reject(body: { returnRequestId: number; rejectionReason: string }) {
    return this.http.put<APIResponse<Return[]>>(this.url + 'reject', body);
  }
}
