import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable, of, switchMap } from 'rxjs';
import { APIResponse } from '../../shared/interface/response';
import { User } from '../interfaces/user';
import { UserStrategy } from '../interfaces/user-strategy';
import { AuthService } from '../services/auth.service';

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
    return this.authSrv.logout().pipe(
      switchMap((res) => {
        if (res.succeeded) {
          this.router.navigate(['auth/login']);
          return of(true);
        }
        return of(false);
      })
    );
  }
}
