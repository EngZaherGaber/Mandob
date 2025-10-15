import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { BaseUserStrategy } from '../../general/classes/base-user-strategy';
import { AuthService } from '../../general/services/auth.service';
import { Distributor } from '../interfaces/distributor';
@Injectable({
  providedIn: 'root', // or inside providers: [] of a module
})
export class DistributorStrategy extends BaseUserStrategy<Distributor> {
  url = environment.api + 'Distributor';
  navMenu: MenuItem[] = [
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
          label: 'الطلبات المنتظرة',
          icon: 'pi pi-send', // 📤 تم تسليمها
          routerLink: ['distributor/request-management/waiting/show'],
        },
        {
          label: 'الطلبات المنتهية',
          icon: 'pi pi-inbox', // 📥 واردة
          routerLink: ['distributor/request-management/ending/show'],
        },
        {
          label: 'المرتجع',
          icon: 'pi pi-arrow-circle-left', // 📥 واردة
          routerLink: ['distributor/return-management/show'],
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

  constructor(http: HttpClient, authSrv: AuthService, router: Router) {
    super(http, authSrv, router);
  }
}
