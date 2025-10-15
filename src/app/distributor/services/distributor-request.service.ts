import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { DistributorTask } from '../interfaces/distributor-task';

@Injectable({
  providedIn: 'root',
})
export class DistributorRequestService {
  url = environment.api + 'DistributorRequest/';
  constructor(private http: HttpClient) {}
  getAll(isWaiting: boolean, body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<Request[]>>(this.url + 'my-requests/' + isWaiting, body);
  }
  changeStatus(requestId: number, newRequestStatusId: number) {
    return this.http.put<APIResponse<Request[]>>(this.url + 'change-status/' + requestId, {
      newRequestStatusId: newRequestStatusId,
    });
  }
  myTask() {
    return this.http.post<APIResponse<DistributorTask[]>>(this.url + 'mytasks', {});
  }
}
