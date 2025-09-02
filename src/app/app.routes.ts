import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { ComDistributorShowComponent } from './company/components/distributor/com-distributor-show/com-distributor-show.component';
import { AuthComponent } from './general/components/auth/auth.component';
import { NotFoundPageComponent } from './general/components/not-found-page/not-found-page.component';
import { ProductDetailsComponent } from './general/components/product-details/product-details.component';
import { AccountComponent } from './general/components/account/account.component';
import { OwnerShowComponent } from './owner/components/owner-show/owner-show.component';
import { LoginComponent } from './general/components/login/login.component';
import { RegisterComponent } from './general/components/register/register.component';
import { VerficationComponent } from './general/components/verfication/verfication.component';
import { ForgetPasswordComponent } from './general/components/forget-password/forget-password.component';
import { CompShowComponent } from './company/components/comp-show/comp-show.component';
import { CompDetailComponent } from './company/components/comp-detail/comp-detail.component';
import { CompAddComponent } from './company/components/comp-add/comp-add.component';
import { OwnerAddComponent } from './owner/components/owner-add/owner-add.component';
import { OwnerDetailComponent } from './owner/components/owner-detail/owner-detail.component';
import { GalleryComponent } from './general/components/gallery/gallery.component';
import { ClientDetailComponent } from './client/components/client-detail/client-detail.component';
import { ClientShowComponent } from './client/components/client-show/client-show.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    title: 'الصفحة الرئيسية',
    // canActivateChild: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'owner',
        children: [
          {
            path: 'company-management',
            children: [
              {
                path: 'show/:type',
                title: 'عرض الشركات',
                component: CompShowComponent,
              },
              {
                path: 'detail/:type/:id',
                title: 'بيانات الشركة',
                component: CompDetailComponent,
              },
              {
                path: 'add',
                title: 'اضافة شركة',
                component: CompAddComponent,
              },
            ],
          },
          {
            path: 'owner-management',
            children: [
              {
                path: 'show/:type',
                title: 'عرض المدراء',
                component: OwnerShowComponent,
              },
              {
                path: 'add',
                title: 'اضافة مدير',
                component: OwnerAddComponent,
              },
              {
                path: 'detail/:type/:id',
                title: 'بيانات مدير',
                component: OwnerDetailComponent,
              },
            ],
          },
          {
            path: 'client-management',
            children: [
              {
                path: 'show/:type',
                title: 'عرض الماركت',
                component: ClientShowComponent,
              },
              {
                path: 'detail/display/:id',
                title: 'بيانات ماركت',
                component: ClientDetailComponent,
              },
            ],
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
        path: 'account',
        title: 'معلومات الحساب',
        component: AccountComponent,
      },
      {
        path: 'gallery',
        title: 'معرض الصور',
        component: GalleryComponent,
      },
    ],
  },
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
    path: '**',
    component: NotFoundPageComponent,
  },
];
