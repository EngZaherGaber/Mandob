import { DatePipe } from '@angular/common';
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
  add(body: any, files: File[]) {
    const formData = new FormData();

    // Append image files
    files.forEach((file) => {
      formData.append('ImageFiles', file, file.name);
    });

    const datePipe = new DatePipe('en-US');
    const { generalInfo, conditions, benfints } = body; // typo fixed (Benfints → benefits)

    // Append general info fields
    formData.append('GeneralInfo.Name', generalInfo.title);
    formData.append('GeneralInfo.Description', generalInfo.description);
    formData.append('GeneralInfo.OfferType', generalInfo.offerType);

    formData.append('GeneralInfo.StartDate', datePipe.transform(generalInfo.startDate, 'dd-MM-yyyy') || '');
    formData.append('GeneralInfo.EndDate', datePipe.transform(generalInfo.endDate, 'dd-MM-yyyy') || '');

    formData.append('GeneralInfo.Priority', generalInfo.priority?.toString() ?? '');

    // Append objects as JSON strings
    formData.append('Conditions', JSON.stringify(conditions || {}));
    formData.append('Benefits', JSON.stringify(benfints || {}));

    // Send form data
    return this.http.post<APIResponse<Offer>>(this.url, formData);
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
