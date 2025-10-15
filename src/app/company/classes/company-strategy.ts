import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { BaseUserStrategy } from '../../general/classes/base-user-strategy';
import { AuthService } from '../../general/services/auth.service';
import { Company } from '../interfaces/company';

@Injectable({
  providedIn: 'root', // or inside providers: [] of a module
})
export class CompanyStrategy extends BaseUserStrategy<Company> {
  url = environment.api + 'Company';
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
      label: 'الادارة',
      icon: 'pi pi-cog', // ⚙ management / settings
      items: [
        {
          label: ' الموزعين',
          icon: 'pi pi-building', // 🏢 companies
          routerLink: ['company/distributor-management/show'],
        },
      ],
    },

    {
      label: 'المنتجات',
      items: [
        {
          label: 'المنتجات',
          icon: 'pi pi-box', // 📦 منتج
          routerLink: ['company/product-management/show'],
        },
        {
          label: 'المجموعات',
          icon: 'pi pi-folder', // 📦 منتج
          routerLink: ['company/collection-management/show'],
        },
        {
          label: 'العروض',
          icon: 'pi pi-tag', // 🏷️ عرض/تخفيض
          routerLink: ['company/offer-management/show'],
        },
      ],
    },
    {
      label: 'الطلبات',
      items: [
        {
          label: 'الطلبات المنتظرة',
          icon: 'pi pi-send', // 📤 تم تسليمها
          routerLink: ['company/request-management/waiting/show'],
        },
        {
          label: 'الطلبات المنتهية',
          icon: 'pi pi-inbox', // 📥 واردة
          routerLink: ['company/request-management/ending/show'],
        },
        {
          label: 'المرتجع',
          icon: 'pi pi-arrow-circle-left', // 📥 واردة
          routerLink: ['company/return-management/show'],
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
  resetPasswordAdmin(body: { newPassword: string; email: string; adminPassword: string }) {
    return this.authSrv.resetPasswordAdmin(body);
  }
}
