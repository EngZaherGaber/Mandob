import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { Offer } from '../interfaces/offer';
import { OfferMetadataItem } from '../interfaces/offer-metadata-item';

@Injectable({
  providedIn: 'root',
})
export class OfferManagementService {
  url = environment.api + 'Offer/';
  constructor(private http: HttpClient) {}
  getAll(body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<Offer[]>>(this.url + 'GetAll', body);
  }
  getOne(id: number) {
    return this.http.get<APIResponse<Offer>>(this.url + id);
  }
  edit(id: number, body: Offer) {
    return this.http.put<APIResponse<Offer>>(this.url + id, body);
  }
  add(body: Offer) {
    return this.http.post<APIResponse<Offer>>(this.url, body);
  }

  delete(id: number) {
    return this.http.delete<APIResponse<boolean>>(this.url + id);
  }
  changeStatus(id: number) {
    return this.http.put<APIResponse<boolean>>(this.url + 'status/' + id, {});
  }
  getOfferMetadata() {
    return this.http.get<OfferMetadataItem>(this.url + 'GetOfferMetadata/');
  }
}
