import { MenuItem } from 'primeng/api';
import { UserStrategy } from '../../general/interfaces/user-strategy';
import { User } from '../../general/interfaces/user.model';
import { HttpClient } from '@angular/common/http';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { Injectable } from '@angular/core';
import { AuthService } from '../../general/services/auth.service';
@Injectable({
  providedIn: 'root', // or inside providers: [] of a module
})
export class AdminStrategy implements UserStrategy {
  url = environment.api + 'Owner';

  constructor(private http: HttpClient, private authSrv: AuthService) {}
  getNavMenu(role: string): MenuItem[] {
    if (role.toLowerCase() === 'owner') {
      return [
        {
          label: 'المتابعات',
          items: [
            {
              label: 'المتابعات',
              icon: 'pi pi-eye',
              routerLink: ['ss'],
            },
          ],
        },
        {
          label: 'الشركات',
          items: [
            {
              label: 'قائمة الشركات',
              icon: 'pi pi-sitemap',
              routerLink: ['admin/company/show/list'],
            },
            {
              label: 'جدول الشركات',
              icon: 'pi pi-table',
              routerLink: ['admin/company/show/table'],
            },
            {
              label: 'اضافة شركة',
              icon: 'pi pi-plus',
              routerLink: ['admin/company/add'],
            },
          ],
        },
        {
          label: 'المدراء',
          items: [
            {
              label: 'قائمة المدراء',
              icon: 'pi pi-sitemap',
              routerLink: ['admin/owner/show/list'],
            },
            {
              label: 'جدول المدراء',
              icon: 'pi pi-table',
              routerLink: ['admin/owner/show/table'],
            },
            {
              label: 'اضافة مدير',
              icon: 'pi pi-plus',
              routerLink: ['admin/owner/add'],
            },
          ],
        },
      ];
    }
    return [];
  }
  getAll(body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<any[]>>(this.url + '/GetAll', body);
  }
  getById(id: number) {
    return this.http.get<APIResponse<any>>(this.url + '/' + id);
  }
  delete(id: number) {
    return this.http.delete<APIResponse<any>>(this.url + '/' + id);
  }
  add(body: any) {
    return this.http.post<APIResponse<any>>(this.url, body);
  }
  edit(body: any, id: number) {
    return this.http.put<APIResponse<any>>(this.url + '/' + id, body);
  }
  requestVerfication(body: any) {
    return this.authSrv.requestVerficationCodeOwnerClient(body);
  }
}
