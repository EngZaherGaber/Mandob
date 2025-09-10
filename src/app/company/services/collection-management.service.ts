import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { Collection } from '../interfaces/collection';

@Injectable({
  providedIn: 'root',
})
export class CollectionManagementService {
  url = environment.api + 'Collection/';
  constructor(private http: HttpClient) {}
  getAll(body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<Collection[]>>(this.url + 'getall', body);
  }
  getOne(id: number) {
    return this.http.get<APIResponse<Collection>>(this.url + id);
  }
  edit(id: number, body: Collection) {
    return this.http.put<APIResponse<Collection>>(this.url + id, body);
  }
  add(body: Collection, files: File[]) {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('LogoFiles', file, file.name);
    });
    Object.keys(body).forEach((key) => {
      formData.append(key, (body as any)[key]);
    });
    return this.http.post<APIResponse<Collection>>(this.url, formData);
  }

  delete(id: number) {
    return this.http.delete<APIResponse<boolean>>(this.url + id);
  }
  changeStatus(id: number) {
    return this.http.put<APIResponse<boolean>>(this.url + 'status/' + id, {});
  }
}
