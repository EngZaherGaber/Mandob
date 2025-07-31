import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { StateService } from '../../service/state.service';

@Component({
  selector: 'sidenav',
  imports: [MenuModule, RouterModule, ButtonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(public stateSrv: StateService) {}
  ngOnInit(): void {
    this.items = [
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
        label: 'الموزعين',
        items: [
          {
            label: 'قائمة الموزعين',
            icon: 'pi pi-sitemap',
            routerLink: ['admin/company/list'],
          },
          {
            label: 'جدول الموزعين',
            icon: 'pi pi-table',
            routerLink: ['admin/company/table'],
          },
        ],
      },
      {
        label: 'المنتجات',
        items: [
          {
            label: 'قائمة المنتجات',
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
}
