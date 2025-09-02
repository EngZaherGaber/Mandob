import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../../shared/interface/response';

@Injectable({
  providedIn: 'root',
})
export class UploadsService {
  url = environment.api + 'Uploads/';
  constructor(private http: HttpClient) {}
  upload(files: File[]) {
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append('LogoFiles', file, file.name);
      // you can also do 'LogoFiles[' + index + ']' if backend expects an array
    });
    return this.http.post<APIResponse<any>>(this.url + 'upload-images', formData);
  }
  delete(id: number) {
    return this.http.delete<APIResponse<any>>(this.url + 'delete-Logo/' + id);
  }
  setMain(id: number) {
    return this.http.post<APIResponse<any>>(this.url + 'set-main-logo/' + id, {});
  }
}
