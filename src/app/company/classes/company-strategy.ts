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
          routerLink: ['ss'],
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
          label: 'قائمة المنتجات',
          icon: 'pi pi-box', // 📦 منتج
          routerLink: ['company/product-management/show'],
        },
        {
          label: 'قائمة المجموعات',
          icon: 'pi pi-folder', // 📦 منتج
          routerLink: ['company/collection-management/show'],
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
  constructor(http: HttpClient, authSrv: AuthService, router: Router) {
    super(http, authSrv, router);
  }
  resetPasswordAdmin(body: { newPassword: string; email: string; adminPassword: string }) {
    return this.authSrv.resetPasswordAdmin(body);
  }
}
