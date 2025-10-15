import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { Return } from '../../client/interfaces/return';
import { APIResponse } from '../../shared/interface/response';

@Injectable({
  providedIn: 'root',
})
export class DistributorReturnService {
  url = environment.api + 'DistributorReturns/';
  constructor(private http: HttpClient) {}

  getAll(requestId: number | null, body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<Return[]>>(this.url + 'getall/' + (requestId ?? ''), body);
  }
  reciveItem(returnRequestId: number) {
    return this.http.put<APIResponse<Return[]>>(this.url + 'receive-item/' + returnRequestId, {});
  }
  complete(returnRequestId: number) {
    return this.http.put<APIResponse<Return[]>>(this.url + 'complete/' + returnRequestId, {});
  }
  reject(body: { returnRequestId: number; rejectionReason: string }) {
    return this.http.put<APIResponse<Return[]>>(this.url + 'reject', body);
  }
}
