import { MenuItem } from 'primeng/api';
import { User } from './user.model';
import { APIResponse } from '../../shared/interface/response';
import { TableLazyLoadEvent } from 'primeng/table';
import { Observable } from 'rxjs';

export interface UserStrategy {
  url: string;
  getNavMenu(role: string): MenuItem[];
  getAll(body: TableLazyLoadEvent): Observable<APIResponse<any[]>>;
  getById(id: number): Observable<APIResponse<any>>;
  delete(id: number): Observable<APIResponse<any>>;
  add(body: any): Observable<APIResponse<any>>;
  edit(body: any, id: number): Observable<APIResponse<any>>;
}
