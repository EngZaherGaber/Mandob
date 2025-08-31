import { MenuItem } from 'primeng/api';
import { APIResponse } from '../../shared/interface/response';
import { Observable } from 'rxjs';
import { User } from './user';

export interface UserStrategy<T extends User> {
  url: string;
  navMenu: MenuItem[];
  getById(): Observable<APIResponse<T>>;
  edit(body: any): Observable<APIResponse<T>>;

  verifyCode(body: { code: string }): Observable<APIResponse<any>>;
  changePassword(body: { oldPassword: string; newPassword: string }): Observable<APIResponse<string>>;

  logout(): void;
}
