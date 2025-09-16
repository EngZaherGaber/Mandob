import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { computed, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { MessageToastService } from '../../shared/service/message-toast.service';
import { loginResponse } from '../interfaces/login';

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
  resetPasswordAdmin(body: { newPassword: string; email: string; adminPassword: string }) {
    return this.http.post<APIResponse<any>>(this.url + '/reset-password-for-admin', body);
  }
  updateToken(refreshToken: string) {
    return this.http.post<APIResponse<any>>(this.url + '/UpdateToken', { refreshToken });
  }
  logout() {
    return this.http.post<APIResponse<any>>(this.url + '/logout', {});
  }
  changePhoneNumberForAdmin(body: { adminPassword: string; newPhoneNumber: string; userId: number }) {
    return this.http.post<APIResponse<any>>(this.url + '/change-phone-number-for-admin', body);
  }
  changePhoneNumber(body: { password: string; newPhoneNumber: string }) {
    return this.http.post<APIResponse<any>>(this.url + '/change-phone-number', body);
  }
  VerifyChangePhoneNumber(body: { code: string; newPhoneNumber: string }) {
    return this.http.post<APIResponse<any>>(this.url + '/verify-code-for-change-phone-number', body);
  }
  changePassword(body: { oldPassword: string; newPassword: string }) {
    return this.http.put<APIResponse<any>>(this.url + '/change-password', body);
  }

  verifyCode(body: { code: string; email: string }) {
    return this.http.post<APIResponse<any>>(this.url + '/verify-code', body);
  }
  myInfo() {
    return this.http.get<APIResponse<any>>(this.url + '/me');
  }
}
