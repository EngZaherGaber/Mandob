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
          routerLink: ['owner/company-management/show/list'],
        },
        {
          label: 'جدول الشركات',
          icon: 'pi pi-table',
          routerLink: ['owner/company-management/show/table'],
        },
        {
          label: 'اضافة شركة',
          icon: 'pi pi-plus',
          routerLink: ['owner/company-management/add'],
        },
      ],
    },
    {
      label: 'المدراء',
      items: [
        {
          label: 'قائمة المدراء',
          icon: 'pi pi-sitemap',
          routerLink: ['owner/owner-management/show/list'],
        },
        {
          label: 'جدول المدراء',
          icon: 'pi pi-table',
          routerLink: ['owner/owner-management/show/table'],
        },
        {
          label: 'اضافة مدير',
          icon: 'pi pi-plus',
          routerLink: ['owner/owner-management/add'],
        },
      ],
    },
    {
      label: 'الماركت',
      items: [
        {
          label: 'قائمة الماركت',
          icon: 'pi pi-sitemap',
          routerLink: ['owner/client-management/show/list'],
        },
        {
          label: 'جدول الماركت',
          icon: 'pi pi-table',
          routerLink: ['owner/client-management/show/table'],
        },
        {
          label: 'اضافة ماركت',
          icon: 'pi pi-plus',
          routerLink: ['owner/client-management/add'],
        },
      ],
    },
  ];
  constructor(http: HttpClient, authSrv: AuthService, router: Router) {
    super(http, authSrv, router);
  }
}
