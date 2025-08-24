import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AdCompanyShowComponent } from './admin/company/ad-company-show/ad-company-show.component';
import { ComDistributorShowComponent } from './company/components/distributor/com-distributor-show/com-distributor-show.component';
import { AuthComponent } from './general/components/auth/auth.component';
import { NotFoundPageComponent } from './general/components/not-found-page/not-found-page.component';
import { ProductDetailsComponent } from './general/components/product-details/product-details.component';
import { AdCompanyAddComponent } from './admin/company/ad-company-add/ad-company-add.component';
import { AdAccountComponent } from './admin/ad-account/ad-account.component';
import { AdOwnerAddComponent } from './admin/owner/ad-owner-add/ad-owner-add.component';
import { AdOwnerShowComponent } from './admin/owner/ad-owner-show/ad-owner-show.component';
import { LoginComponent } from './general/components/login/login.component';
import { RegisterComponent } from './general/components/register/register.component';
import { VerficationComponent } from './general/components/verfication/verfication.component';
import { ForgetPasswordComponent } from './general/components/forget-password/forget-password.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'تسجيل الدخول',
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'انشاء حساب',
      },
      {
        path: 'verfication',
        component: VerficationComponent,
        canActivate: [authGuard],
        title: 'تأكيد الحساب',
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
        title: 'استعادة كلمة المرور',
      },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        children: [
          {
            path: 'company',
            children: [
              {
                path: 'show/:type',
                title: 'عرض الشركات',
                component: AdCompanyShowComponent,
              },
              {
                path: 'add',
                title: 'اضافة شركة',
                component: AdCompanyAddComponent,
              },
            ],
          },
          {
            path: 'owner',
            children: [
              {
                path: 'show/:type',
                title: 'عرض المدراء',
                component: AdOwnerShowComponent,
              },
              {
                path: 'add',
                title: 'اضافة مدير',
                component: AdOwnerAddComponent,
              },
            ],
          },
          {
            path: 'account',
            title: 'معلومات الحساب',
            component: AdAccountComponent,
          },
        ],
      },
      {
        path: 'company',
        children: [
          {
            path: 'distributor',
            children: [
              {
                path: 'show/:type',
                title: 'عرض الموزعين',
                component: ComDistributorShowComponent,
              },
            ],
          },
          {
            path: 'product',
            component: ProductDetailsComponent,
          },
        ],
      },
      {
        path: '**',
        component: NotFoundPageComponent,
      },
    ],
  },
];
