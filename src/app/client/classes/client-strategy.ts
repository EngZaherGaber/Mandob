import { MenuItem } from 'primeng/api';
import { UserStrategy } from '../../general/interfaces/user-strategy';
import { TableLazyLoadEvent } from 'primeng/table';
import { APIResponse } from '../../shared/interface/response';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../general/services/auth.service';
@Injectable({
  providedIn: 'root', // or inside providers: [] of a module
})
export class ClientStrategy implements UserStrategy {
  url: string = environment.api + 'Client';
  constructor(private http: HttpClient, private authSrv: AuthService) {}
  getNavMenu(role: string): MenuItem[] {
    if (role.toLowerCase() === 'client') {
      return [
        {
          label: 'المتابعات',
          items: [
            {
              label: 'المتابعات',
              icon: 'pi pi-eye',
              routerLink: [''],
            },
          ],
        },
        {
          label: 'المنتجات',
          items: [
            {
              label: 'المنتجات',
              icon: 'pi pi-box', // 📦 منتج
              routerLink: ['item'],
            },
            {
              label: 'العروض',
              icon: 'pi pi-tag', // 🏷️ عرض/تخفيض
              routerLink: ['item'],
            },
          ],
        },
        {
          label: 'الطلبات',
          items: [
            {
              label: 'الطلبات المسلمة',
              icon: 'pi pi-send', // 📤 تم تسليمها
            },
            {
              label: 'الطلبات المرسلة',
              icon: 'pi pi-inbox', // 📥 واردة
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
  requestVerfication(body: any): Observable<APIResponse<any>> {
    return this.authSrv.requestVerficationCodeOwnerClient(body);
  }
}
