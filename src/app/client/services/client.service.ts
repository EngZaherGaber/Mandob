import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageToastService } from '../../shared/service/message-toast.service';
import { User } from '../../general/interfaces/user';
import { APIResponse } from '../../shared/interface/response';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  url = environment.api + 'Client';
  constructor(private http: HttpClient, private router: Router, private msgSrv: MessageToastService) {}
  create(body: Partial<Client>) {
    return this.http.post<APIResponse<Client>>(this.url, body);
  }
}
