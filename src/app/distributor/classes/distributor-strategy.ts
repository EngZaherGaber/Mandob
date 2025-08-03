import { MenuItem } from "primeng/api";
import { UserStrategy } from "../../general/interfaces/user-strategy";

export class DistributorStrategy implements UserStrategy {
  getNavMenu(role: string): MenuItem[] {
    if (role === 'distributor') {
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
    }
    return [];
  }
}
