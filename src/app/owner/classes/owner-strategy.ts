import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { BaseUserStrategy } from '../../general/classes/base-user-strategy';
import { AuthService } from '../../general/services/auth.service';
import { Owner } from '../interfaces/owner';
@Injectable({
  providedIn: 'root', // or inside providers: [] of a module
})
export class OwnerStrategy extends BaseUserStrategy<Owner> {
  url = environment.api + 'Owner';
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
          label: ' الشركات',
          icon: 'pi pi-building', // 🏢 companies
          routerLink: ['owner/company-management/show'],
        },
        {
          label: ' المدراء',
          icon: 'pi pi-users', // 👥 managers
          routerLink: ['owner/owner-management/show'],
        },
        {
          label: ' الماركت',
          icon: 'pi pi-shopping-bag', // 🛍️ market
          routerLink: ['owner/client-management/show'],
        },
        {
          label: ' الباقات',
          icon: 'pi pi-box', // 📦 packages/plans
          routerLink: ['owner/plan-management/show'],
        },
      ],
    },
    // {
    //   label: 'ادارة الماركت',
    //   items: [],
    // },
    // {
    //   label: 'ادارة الباقات',
    //   items: [],
    // },
  ];
  constructor(http: HttpClient, authSrv: AuthService, router: Router) {
    super(http, authSrv, router);
  }

  resetPasswordAdmin(body: { newPassword: string; email: string; adminPassword: string }) {
    return this.authSrv.resetPasswordAdmin(body);
  }
}
