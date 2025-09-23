import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { BaseUserStrategy } from '../../general/classes/base-user-strategy';
import { AuthService } from '../../general/services/auth.service';
import { Client } from '../interfaces/client';
@Injectable({
  providedIn: 'root', // or inside providers: [] of a module
})
export class ClientStrategy extends BaseUserStrategy<Client> {
  url: string = environment.api + 'Client';
  navMenu: MenuItem[] = [
    {
      label: 'المتابعات',
      items: [
        {
          label: 'الصفحة الرئيسية',
          icon: 'pi pi-eye',
          routerLink: ['client/home'],
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
  constructor(http: HttpClient, authSrv: AuthService, router: Router) {
    super(http, authSrv, router);
  }
}
