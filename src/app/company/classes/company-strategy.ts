import { MenuItem } from 'primeng/api';
import { UserStrategy } from '../../general/interfaces/user-strategy';
import { User } from '../../general/interfaces/user.model';
import { TableLazyLoadEvent } from 'primeng/table';
import { APIResponse } from '../../shared/interface/response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthService } from '../../general/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // or inside providers: [] of a module
})
export class CompanyStrategy implements UserStrategy {
  url = environment.api + 'Company';
  constructor(private http: HttpClient, private authSrv: AuthService) {}
  getNavMenu(role: string): MenuItem[] {
    if (role.toLowerCase() === 'company') {
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
          label: 'الموزعين',
          items: [
            {
              label: 'قائمة الموزعين',
              icon: 'pi pi-sitemap',
              routerLink: ['company/distributor/show/list'],
            },
            {
              label: 'جدول الموزعين',
              icon: 'pi pi-table',
              routerLink: ['company/distributor/show/table'],
            },
          ],
        },
        {
          label: 'المنتجات',
          items: [
            {
              label: 'قائمة المنتجات',
              icon: 'pi pi-box', // 📦 منتج
              routerLink: ['company/product'],
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
              label: 'الطلبات الواردة',
              icon: 'pi pi-inbox', // 📥 واردة
            },
          ],
        },
        {
          label: 'احصائيات',
          items: [
            {
              label: 'احصائيات',
              icon: 'pi pi-chart-line', // 📈 تفصيل إحصائي
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
    return this.authSrv.requestVerficationCodeCompanyDistributor(body);
  }
}
