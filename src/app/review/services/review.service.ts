import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { ProdComment } from '../../product/interfaces/prod-comment';
import { APIResponse } from '../../shared/interface/response';
import { RequestReviewDetails } from '../interfaces/request-review-details';
import { ReviewSubmit } from '../interfaces/review-submit';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  url = environment.api + 'Review/';
  constructor(private http: HttpClient) {}
  submit(body: ReviewSubmit) {
    return this.http.post<APIResponse<boolean>>(this.url + 'SubmitReviews', body);
  }
  getProductComments(productID: number, body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<ProdComment[]>>(this.url + 'GetProductComments/' + productID, body);
  }
  getOne(requestID: number) {
    return this.http.get<APIResponse<RequestReviewDetails>>(this.url + 'get-request-details/' + requestID);
  }
}
