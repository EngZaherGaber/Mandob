import { computed, effect, inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageToastService } from '../../shared/service/message-toast.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APIResponse } from '../../shared/interface/response';
import { isPlatformBrowser } from '@angular/common';
import { loginResponse } from '../interfaces/login';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.api + 'Auth';
  helper = new JwtHelperService();
  isBrowser = computed(() => isPlatformBrowser(this.platformId));

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private msgSrv: MessageToastService
  ) {}

  login(input: string, password: string) {
    return this.http.post<APIResponse<loginResponse>>(
      this.url + '/login', // 👈 always start with /api
      { input, password },
      { withCredentials: true }
    );
  }
  forgetPassword(body: { email: string }) {
    return this.http.post<APIResponse<any>>(this.url + '/forget-password', body);
  }
  verfiyCodeForForgetPassword(body: { code: string; email: string }) {
    return this.http.post<APIResponse<any>>(this.url + '/verify-code-for-forget-password', body);
  }
  resetPassword(body: { newPassword: string; email: string; code: string }) {
    return this.http.post<APIResponse<any>>(this.url + '/reset-password', body);
  }
  updateToken(refreshToken: string) {
    return this.http.post<APIResponse<any>>(this.url + '/UpdateToken', { refreshToken });
  }
  logout() {
    return this.http.post<APIResponse<any>>(this.url + '/logout', {});
  }
  changePassword(body: { oldPassword: string; newPassword: string }) {
    return this.http.put<APIResponse<any>>(this.url + '/change-password', body);
  }

  verifyCode(body: { code: string }) {
    return this.http.post<APIResponse<any>>(this.url + '/verify-code', body);
  }
  myInfo() {
    return this.http.get<APIResponse<any>>(this.url + '/me');
    return of({
      succeeded: true,
      message: 'string',
      data: {
        userId: 1,
        userName: 'string',
        email: 'string',
        name: 'string',
        phoneNumber: 'string',
        isActive: true,
        role: 'client',
      },
      error: [],
      count: 0,
    });
  }
}
