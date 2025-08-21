import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageToastService } from '../../shared/service/message-toast.service';
import { User } from '../../general/interfaces/user.model';
import { APIResponse } from '../../shared/interface/response';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  url = environment.api + 'Client';
  constructor(private http: HttpClient, private router: Router, private msgSrv: MessageToastService) {}
  create(body: User) {
    return this.http.post<APIResponse<User>>(this.url, body);
  }
}
