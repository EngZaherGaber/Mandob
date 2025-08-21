import { MenuItem } from 'primeng/api';
import { UserStrategy } from '../../general/interfaces/user-strategy';
import { HttpClient } from '@angular/common/http';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root', // or inside providers: [] of a module
})
export class DistributorStrategy implements UserStrategy {
  url = environment.api + 'Distributor';
  constructor(private http: HttpClient) {}
  getNavMenu(role: string): MenuItem[] {
    if (role === 'distributor') {
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
          label: 'المحلات التجارية',
          items: [
            {
              label: 'المحلات التجارية',
              icon: 'pi pi-send', // 📤 تم تسليمها
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
}
