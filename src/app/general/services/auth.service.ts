import { computed, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageToastService } from '../../shared/service/message-toast.service';
import { catchError, EMPTY } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { APIResponse } from '../../shared/interface/response';
import { isPlatformBrowser } from '@angular/common';

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
  ) {
    this.getFingerPrint();
  }
  async getFingerPrint() {
    if (this.isBrowser()) {
      // Initialize FingerprintJS
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const fingerprint = result.visitorId;
      localStorage.setItem('fingerPrint', fingerprint);
    }
  }
  login(input: string, password: string) {
    const lowerInput = input.toLowerCase();
    return this.http.post<APIResponse<any>>(this.url + '/login', { input: lowerInput, password: password });
  }
  forgetPassword(body: { preferredVerificationMethod: number; email: string; phoneNumber: string }) {
    return this.http.post<APIResponse<any>>(this.url + '/forget-password', body);
  }
  verfiyCodeForForgetPassword(body: { code: string; email: string; phoneNumber: string }) {
    return this.http.post<APIResponse<any>>(this.url + '/verify-code-for-forget-password', body);
  }
  resetPassword(body: {
    newPassword: string;
    email: string;
    phoneNumber: string;
    code: string;
    verificationMethod: number;
  }) {
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
  requestVerficationCodeOwnerClient(body: any) {
    return this.http.post<APIResponse<any>>(this.url + '/request-verification-code-owner-client', body);
  }
  requestVerficationCodeCompanyDistributor(body: any) {
    return this.http.post<APIResponse<any>>(this.url + '/request-verification-code-company-distributor', body);
  }
  verifyCode(body: { code: string }) {
    return this.http.post<APIResponse<any>>(this.url + '/verify-code', body);
  }
}
