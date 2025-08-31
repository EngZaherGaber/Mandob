import { MenuItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthService } from '../../general/services/auth.service';
import { Distributor } from '../interfaces/distributor';
import { BaseUserStrategy } from '../../general/classes/base-user-strategy';
import { Router } from '@angular/router';
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

  constructor(http: HttpClient, authSrv: AuthService, router: Router) {
    super(http, authSrv, router);
  }
}
