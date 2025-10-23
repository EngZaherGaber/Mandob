import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { CompTask } from '../interfaces/comp-task';

@Injectable({
  providedIn: 'root',
})
export class CompanyRequestService {
  url = environment.api + 'CompanyRequest/';
  constructor(private http: HttpClient) {}
  getAll(isWaiting: boolean, body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<Request[]>>(this.url + 'my-requests/' + isWaiting, body);
  }
  assignDistributor(body: { requestId: number; distributorId: number; expectedDeliveryDate: number }) {
    return this.http.put<APIResponse<Request[]>>(this.url + 'assign-distributor', body);
  }
  reject(requestId: number) {
    return this.http.put<APIResponse<Request[]>>(this.url + 'reject/' + requestId, {});
  }
  myTask() {
    return this.http.post<APIResponse<CompTask[]>>(this.url + 'mytasks', {});
  }
}
