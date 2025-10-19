import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { ReviewSubmit } from '../interfaces/review-submit';

@Injectable({
  providedIn: 'root',
})
export class ReviewClientService {
  url = environment.api + 'Review/';
  constructor(private http: HttpClient) {}
  submit(body: ReviewSubmit) {
    return this.http.post<APIResponse<boolean>>(this.url, body);
  }
}
