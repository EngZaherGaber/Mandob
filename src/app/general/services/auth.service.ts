import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserStateService } from './user-state.service';
import { Router } from '@angular/router';
import { MessageToastService } from '../../shared/service/message-toast.service';
import { catchError, EMPTY } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { APIResponse } from '../../shared/interface/response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.api + 'Auth';
  helper = new JwtHelperService();
  constructor(
    private http: HttpClient,
    private userState: UserStateService,
    private router: Router,
    private msgSrv: MessageToastService
  ) {
    this.getFingerPrint();
  }
  async getFingerPrint() {
    if (this.userState.isBrowser()) {
      // Initialize FingerprintJS
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const fingerprint = result.visitorId;
      localStorage.setItem('fingerPrint', fingerprint);
    }
  }
  logout() {
    this.userState.storeUser(null);
    this.router.navigate(['auth/login']);
  }
  login(input: string, password: string) {
    const lowerInput = input.toLowerCase();
    return this.http.post<APIResponse<any>>(this.url + '/login', { lowerInput, password });
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
}
