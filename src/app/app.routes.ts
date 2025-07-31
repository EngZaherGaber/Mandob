import { Routes } from '@angular/router';
import { loginGuard } from './shared/guards/login.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AdCompanyShowComponent } from './admin/company/ad-company-show/ad-company-show.component';
import { ComDistributorShowComponent } from './company/components/distributor/com-distributor-show/com-distributor-show.component';
import { LoginComponent } from './general/components/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivateChild: [loginGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        children: [
          {
            path: 'company',
            children: [
              {
                path: ':type',
                component: ComDistributorShowComponent,
                title: 'عرض الموزعين',
              },
            ],
          },
        ],
      },
    ],
  },
];
