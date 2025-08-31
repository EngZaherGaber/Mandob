import { MenuItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthService } from '../../general/services/auth.service';
import { Owner } from '../interfaces/owner';
import { BaseUserStrategy } from '../../general/classes/base-user-strategy';
import { Router } from '@angular/router';
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
      label: 'الشركات',
      items: [
        {
          label: 'قائمة الشركات',
          icon: 'pi pi-sitemap',
          routerLink: ['owner/company/show/list'],
        },
        {
          label: 'جدول الشركات',
          icon: 'pi pi-table',
          routerLink: ['owner/company/show/table'],
        },
        {
          label: 'اضافة شركة',
          icon: 'pi pi-plus',
          routerLink: ['owner/company/add'],
        },
      ],
    },
    {
      label: 'المدراء',
      items: [
        {
          label: 'قائمة المدراء',
          icon: 'pi pi-sitemap',
          routerLink: ['owner/owner/show/list'],
        },
        {
          label: 'جدول المدراء',
          icon: 'pi pi-table',
          routerLink: ['owner/owner/show/table'],
        },
        {
          label: 'اضافة مدير',
          icon: 'pi pi-plus',
          routerLink: ['owner/owner/add'],
        },
      ],
    },
  ];
  constructor(http: HttpClient, authSrv: AuthService, router: Router) {
    super(http, authSrv, router);
  }
}
