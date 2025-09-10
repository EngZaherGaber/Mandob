import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    title: 'الصفحة الرئيسية',
    loadComponent: () => import('./shared/components/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'owner',
        children: [
          {
            path: 'company-management',
            children: [
              {
                path: 'show',
                title: 'عرض الشركات',
                loadComponent: () =>
                  import('./company/components/comp-management/comp-show/comp-show.component').then(
                    (m) => m.CompShowComponent
                  ),
              },
              {
                path: 'detail/:type/:id',
                title: 'بيانات الشركة',
                loadComponent: () =>
                  import('./company/components/comp-management/comp-detail/comp-detail.component').then(
                    (m) => m.CompDetailComponent
                  ),
              },
              {
                path: 'add',
                title: 'اضافة شركة',
                loadComponent: () =>
                  import('./company/components/comp-management/comp-add/comp-add.component').then(
                    (m) => m.CompAddComponent
                  ),
              },
            ],
          },
          {
            path: 'owner-management',
            children: [
              {
                path: 'show',
                title: 'عرض المدراء',
                loadComponent: () =>
                  import('./owner/components/owner-management/owner-show/owner-show.component').then(
                    (m) => m.OwnerShowComponent
                  ),
              },
              {
                path: 'add',
                title: 'اضافة مدير',
                loadComponent: () =>
                  import('./owner/components/owner-management/owner-add/owner-add.component').then(
                    (m) => m.OwnerAddComponent
                  ),
              },
              {
                path: 'detail/:type/:id',
                title: 'بيانات مدير',
                loadComponent: () =>
                  import('./owner/components/owner-management/owner-detail/owner-detail.component').then(
                    (m) => m.OwnerDetailComponent
                  ),
              },
            ],
          },
          {
            path: 'client-management',
            children: [
              {
                path: 'show',
                title: 'عرض الماركت',
                loadComponent: () =>
                  import('./client/components/clinet-management/client-show/client-show.component').then(
                    (m) => m.ClientShowComponent
                  ),
              },
              {
                path: 'detail/display/:id',
                title: 'بيانات ماركت',
                loadComponent: () =>
                  import('./client/components/clinet-management/client-detail/client-detail.component').then(
                    (m) => m.ClientDetailComponent
                  ),
              },
            ],
          },
          {
            path: 'plan-management',
            children: [
              {
                path: 'show',
                title: 'عرض الباقات',
                loadComponent: () =>
                  import('./company/components/plan-management/plan-show/plan-show.component').then(
                    (m) => m.PlanShowComponent
                  ),
              },
              {
                path: 'add',
                title: 'اضافة باقة',
                loadComponent: () =>
                  import('./company/components/plan-management/plan-add/plan-add.component').then(
                    (m) => m.PlanAddComponent
                  ),
              },
              {
                path: 'detail/:type/:id',
                title: 'بيانات باقة',
                loadComponent: () =>
                  import('./company/components/plan-management/plan-detail/plan-detail.component').then(
                    (m) => m.PlanDetailComponent
                  ),
              },
            ],
          },
        ],
      },
      {
        path: 'company',
        children: [
          {
            path: 'distributor-management',
            children: [
              {
                path: 'show',
                title: 'عرض الموزعين',
                loadComponent: () =>
                  import(
                    './distributor/components/distributor-management/distributor-show/distributor-show.component'
                  ).then((m) => m.DistributorShowComponent),
              },
              {
                path: 'add',
                title: 'اضافة موزع',
                loadComponent: () =>
                  import(
                    './distributor/components/distributor-management/distributor-add/distributor-add.component'
                  ).then((m) => m.DistributorAddComponent),
              },
              {
                path: 'detail/:type/:id',
                title: 'بيانات الموزع',
                loadComponent: () =>
                  import(
                    './distributor/components/distributor-management/distributor-detail/distributor-detail.component'
                  ).then((m) => m.DistributorDetailComponent),
              },
            ],
          },
          {
            path: 'product-management',
            children: [
              {
                path: 'show',
                title: 'عرض المنتجات',
                loadComponent: () =>
                  import(
                    './company/components/prod-management/prod-management-show/prod-management-show.component'
                  ).then((m) => m.ProdManagementShowComponent),
              },
              {
                path: 'detail/:type/:id',
                title: 'بيانات المنتج',
                loadComponent: () =>
                  import(
                    './company/components/prod-management/prod-management-detail/prod-management-detail.component'
                  ).then((m) => m.ProdManagementDetailComponent),
              },
              {
                path: 'add',
                title: 'اضافة منتج',
                loadComponent: () =>
                  import('./company/components/prod-management/prod-management-add/prod-management-add.component').then(
                    (m) => m.ProdManagementAddComponent
                  ),
              },
            ],
          },
          {
            path: 'collection-management',
            children: [
              {
                path: 'show',
                title: 'عرض المجموعات',
                loadComponent: () =>
                  import(
                    './company/components/collection-management/collection-management-show/collection-management-show.component'
                  ).then((m) => m.CollectionManagementShowComponent),
              },
              {
                path: 'detail/:type/:id',
                title: 'بيانات المجموعة',
                loadComponent: () =>
                  import(
                    './company/components/collection-management/collection-management-detail/collection-management-detail.component'
                  ).then((m) => m.CollectionManagementDetailComponent),
              },
              {
                path: 'add',
                title: 'اضافة مجموعة',
                loadComponent: () =>
                  import(
                    './company/components/collection-management/collection-management-add/collection-management-add.component'
                  ).then((m) => m.CollectionManagementAddComponent),
              },
            ],
          },
        ],
      },
      {
        path: 'account',
        title: 'معلومات الحساب',
        loadComponent: () => import('./general/components/account/account.component').then((m) => m.AccountComponent),
      },
      {
        path: 'gallery',
        title: 'معرض الصور',
        loadComponent: () => import('./general/components/gallery/gallery.component').then((m) => m.GalleryComponent),
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () => import('./general/components/auth/auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: 'login',
        title: 'تسجيل الدخول',
        loadComponent: () => import('./general/components/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        title: 'انشاء حساب',
        loadComponent: () =>
          import('./general/components/register/register.component').then((m) => m.RegisterComponent),
      },
      {
        path: 'verfication',
        title: 'تأكيد الحساب',
        loadComponent: () =>
          import('./general/components/verfication/verfication.component').then((m) => m.VerficationComponent),
      },
      {
        path: 'forget-password',
        title: 'استعادة كلمة المرور',
        loadComponent: () =>
          import('./general/components/forget-password/forget-password.component').then(
            (m) => m.ForgetPasswordComponent
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./general/components/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
];
