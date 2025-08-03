import { MenuItem } from "primeng/api";
import { UserStrategy } from "../../general/interfaces/user-strategy";
import { User } from "../../general/interfaces/user.model";

export class CompanyStrategy implements UserStrategy {
  getNavMenu(role: string): MenuItem[] {
    if (role === 'company') {
      return [
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
    return [];
  }
}
