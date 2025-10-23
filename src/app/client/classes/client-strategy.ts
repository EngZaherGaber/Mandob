import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { BaseUserStrategy } from '../../general/classes/base-user-strategy';
import { AuthService } from '../../general/services/auth.service';
import { CategoryManagementService } from '../../owner/services/category-management.service';
import { Client } from '../interfaces/client';
@Injectable({
  providedIn: 'root', // or inside providers: [] of a module
})
export class ClientStrategy extends BaseUserStrategy<Client> {
  url: string = environment.api + 'Client';
  navMenu: MenuItem[] = [];
  constructor(
    http: HttpClient,
    authSrv: AuthService,
    router: Router,
    private categorySrv: CategoryManagementService,
  ) {
    super(http, authSrv, router);
    this.categorySrv.getAll({ first: 0, rows: 10 }).subscribe((res) => {
      const arr = res.data.map((x) => {
        const header = 'منتجات ' + x.name;
        return {
          label: x.name,
          icon: 'pi pi-angle-double-left',
          routerLink: ['client/product/group/category/' + header + '/' + x.id],
        };
      });
      arr.push({
        label: 'قراءة المزيد',
        icon: 'pi pi-eye',
        routerLink: ['client/product/group/all/' + 'كل المنتجات' + '/' + 0],
      });
      this.navMenu = [
        {
          label: 'الصفحة الرئيسية',
          icon: 'pi pi-eye',
          routerLink: ['client/home'],
        },
        {
          label: 'العروض',
          icon: 'pi pi-tag', // 🏷️ عرض/تخفيض
          routerLink: ['item'],
        },
        {
          label: 'المنتجات',
          icon: 'pi pi-box', // 📦 منتج
          items: arr,
        },
        {
          label: 'الطلبات',
          icon: 'pi pi-file',
          items: [
            {
              label: 'الطلبات المنتظرة',
              icon: 'pi pi-send', // 📤 تم تسليمها
              routerLink: ['client/request-management/waiting/show'],
            },
            {
              label: 'الطلبات المنتهية',
              icon: 'pi pi-inbox', // 📥 واردة
              routerLink: ['client/request-management/ending/show'],
            },
            {
              label: 'المرتجع',
              icon: 'pi pi-arrow-circle-left', // 📥 واردة
              routerLink: ['client/return-management/show'],
            },
          ],
        },
      ];
    });
  }
  getNavMenu() {
    return this.navMenu;
  }
}
