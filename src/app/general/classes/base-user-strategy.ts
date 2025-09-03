import { HttpClient } from '@angular/common/http';
import { MenuItem } from 'primeng/api';
import { catchError, map, Observable, of } from 'rxjs';
import { APIResponse } from '../../shared/interface/response';
import { User } from '../interfaces/user';
import { UserStrategy } from '../interfaces/user-strategy';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export abstract class BaseUserStrategy<T extends User> implements UserStrategy<T> {
  abstract url: string;
  abstract navMenu: MenuItem[];
  constructor(protected http: HttpClient, protected authSrv: AuthService, private router: Router) {}

  getById(): Observable<APIResponse<T>> {
    return this.http.get<APIResponse<T>>(`${this.url}`);
  }

  edit(body: any): Observable<APIResponse<T>> {
    return this.http.put<APIResponse<T>>(this.url, body);
  }

  verifyCode(body: { code: string; email: string }): Observable<APIResponse<any>> {
    return this.authSrv.verifyCode(body);
  }

  changePassword(body: { oldPassword: string; newPassword: string }): Observable<APIResponse<string>> {
    return this.authSrv.changePassword(body);
  }

  logout() {
    this.authSrv.logout().subscribe((res) => {
      if (res.succeeded) {
        this.router.navigate(['auth/login']);
        localStorage.clear();
      }
    });
  }
}
