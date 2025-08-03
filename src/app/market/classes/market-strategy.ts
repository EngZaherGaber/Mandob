import { MenuItem } from "primeng/api";
import { UserStrategy } from "../../general/interfaces/user-strategy";

export class MarketStrategy implements UserStrategy {
  getNavMenu(role: string): MenuItem[] {
    if (role === 'market') {
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
    }
    return [];
  }
}
