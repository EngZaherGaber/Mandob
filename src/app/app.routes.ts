import { Route, Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

const companyRoutes: Route = {
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
              './distributor/components/distributor-management/distributor-management-show/distributor-management-show.component'
            ).then((m) => m.DistributorManagementShowComponent),
        },
        {
          path: 'add',
          title: 'اضافة موزع',
          loadComponent: () =>
            import(
              './distributor/components/distributor-management/distributor-management-add/distributor-management-add.component'
            ).then((m) => m.DistributorManagementAddComponent),
        },
        {
          path: 'detail/:type/:id',
          title: 'بيانات الموزع',
          loadComponent: () =>
            import(
              './distributor/components/distributor-management/distributor-management-detail/distributor-management-detail.component'
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
            import('./product/components/prod-management/prod-management-show/prod-management-show.component').then(
              (m) => m.ProdManagementShowComponent,
            ),
        },
        {
          path: 'detail/edit/:id',
          title: 'بيانات المنتج',
          loadComponent: () =>
            import('./product/components/prod-management/prod-management-detail/prod-management-detail.component').then(
              (m) => m.ProdManagementDetailComponent,
            ),
        },
        {
          path: 'detail/display/:id',
          title: 'بيانات المنتج',
          loadComponent: () =>
            import('./product/components/product-general/prod-general-item/prod-general-item.component').then(
              (m) => m.ProdGeneralItemComponent,
            ),
        },
        {
          path: 'add',
          title: 'اضافة منتج',
          loadComponent: () =>
            import('./product/components/prod-management/prod-management-add/prod-management-add.component').then(
              (m) => m.ProdManagementAddComponent,
            ),
        },
      ],
    },
    {
      path: 'offer-management',
      children: [
        {
          path: 'show',
          title: 'عرض العروض',
          loadComponent: () =>
            import('./offer/components/offer-management/offer-management-show/offer-management-show.component').then(
              (m) => m.OfferManagementShowComponent,
            ),
        },
        {
          path: 'detail/:type/:id',
          title: 'بيانات العرض',
          loadComponent: () =>
            import(
              './offer/components/offer-management/offer-management-detail/offer-management-detail.component'
            ).then((m) => m.OfferManagementDetailComponent),
        },
        {
          path: 'add',
          title: 'اضافة عرض',
          loadComponent: () =>
            import('./offer/components/offer-management/offer-management-add/offer-management-add.component').then(
              (m) => m.OfferManagementAddComponent,
            ),
        },
      ],
    },
    {
      path: 'return-management',
      children: [
        {
          path: 'show',
          title: 'عرض المرتجع',
          loadComponent: () =>
            import(
              './company/components/comp-return-management/comp-return-management-show/comp-return-management-show.component'
            ).then((m) => m.CompReturnManagementShowComponent),
        },
        {
          path: 'show/:requestId',
          title: 'عرض المرتجع',
          loadComponent: () =>
            import(
              './company/components/comp-return-management/comp-return-management-show/comp-return-management-show.component'
            ).then((m) => m.CompReturnManagementShowComponent),
        },
      ],
    },
    {
      path: 'request-management',
      children: [
        {
          path: ':type',
          children: [
            {
              path: 'show',
              title: (snapshot) => {
                const type = snapshot.paramMap.get('type');
                switch (type) {
                  case 'waiting':
                    return 'عرض الطلبات المنتظرة';
                  default:
                    return 'عرض الطلبات المنتهية';
                }
              },
              loadComponent: () =>
                import(
                  './company/components/company-req-management/company-req-management-show/company-req-management-show.component'
                ).then((m) => m.CompanyReqManagementShowComponent),
            },
          ],
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
};
const ownerRoutes: Route = {
  path: 'owner',
  children: [
    {
      path: 'company-management',
      children: [
        {
          path: 'show',
          title: 'عرض الشركات',
          loadComponent: () =>
            import('./company/components/comp-management/comp-management-show/comp-management-show.component').then(
              (m) => m.CompManagementShowComponent,
            ),
        },
        {
          path: 'detail/:type/:id',
          title: 'بيانات الشركة',
          loadComponent: () =>
            import('./company/components/comp-management/comp-management-detail/comp-management-detail.component').then(
              (m) => m.CompManagementDetailComponent,
            ),
        },
        {
          path: 'add',
          title: 'اضافة شركة',
          loadComponent: () =>
            import('./company/components/comp-management/comp-management-add/comp-management-add.component').then(
              (m) => m.CompManagementAddComponent,
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
            import('./owner/components/owner-management/owner-management-show/owner-management-show.component').then(
              (m) => m.OwnerManagementShowComponent,
            ),
        },
        {
          path: 'add',
          title: 'اضافة مدير',
          loadComponent: () =>
            import('./owner/components/owner-management/owner-management-add/owner-management-add.component').then(
              (m) => m.OwnerManagementAddComponent,
            ),
        },
        {
          path: 'detail/:type/:id',
          title: 'بيانات مدير',
          loadComponent: () =>
            import(
              './owner/components/owner-management/owner-management-detail/owner-management-detail.component'
            ).then((m) => m.OwnerManagementDetailComponent),
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
            import(
              './client/components/clinet-management/client-management-show/client-management-show.component'
            ).then((m) => m.ClientManagementShowComponent),
        },
        {
          path: 'detail/display/:id',
          title: 'بيانات ماركت',
          loadComponent: () =>
            import(
              './client/components/clinet-management/client-management-detail/client-management-detail.component'
            ).then((m) => m.ClientManagementDetailComponent),
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
            import('./owner/components/plan-management/plan-management-show/plan-management-show.component').then(
              (m) => m.PlanManagementShowComponent,
            ),
        },
        {
          path: 'add',
          title: 'اضافة باقة',
          loadComponent: () =>
            import('./owner/components/plan-management/plan-management-add/plan-management-add.component').then(
              (m) => m.PlanManagementAddComponent,
            ),
        },
        {
          path: 'detail/:type/:id',
          title: 'بيانات باقة',
          loadComponent: () =>
            import('./owner/components/plan-management/plan-management-detail/plan-management-detail.component').then(
              (m) => m.PlanManagementDetailComponent,
            ),
        },
      ],
    },
    {
      path: 'category-management',
      children: [
        {
          path: 'show',
          title: 'عرض التصنيفات',
          loadComponent: () =>
            import(
              './owner/components/category-management/category-management-show/category-management-show.component'
            ).then((m) => m.CategoryManagementShowComponent),
        },
        {
          path: 'add',
          title: 'اضافة تصنيف',
          loadComponent: () =>
            import(
              './owner/components/category-management/category-management-add/category-management-add.component'
            ).then((m) => m.CategoryManagementAddComponent),
        },
        {
          path: 'detail/:type/:id',
          title: 'بيانات تصنيف',
          loadComponent: () =>
            import(
              './owner/components/category-management/category-management-detail/category-management-detail.component'
            ).then((m) => m.CategoryManagementDetailComponent),
        },
      ],
    },
  ],
};

const clientRoutes: Route = {
  path: 'client',
  children: [
    {
      path: '',
      pathMatch: 'full', // ✅ ensure exact match
      redirectTo: 'home', // ✅ redirect /client -> /client/home
    },
    {
      path: 'home',
      title: 'الصفحة الرئيسية',
      loadComponent: () =>
        import('./client/components/client-home-land/client-home-land.component').then(
          (m) => m.ClientHomeLandComponent,
        ),
    }, //TODO: create its company
    {
      path: 'company',
      children: [
        {
          path: 'profile/:id',
          title: 'صفحة الشركة',
          loadComponent: () =>
            import('./company/components/comp-general/comp-general-profile/comp-general-profile.component').then(
              (m) => m.CompGeneralProfileComponent,
            ),
        },
      ],
    },
    {
      path: 'product',
      children: [
        {
          path: 'group/:type/:header/:id',
          title: 'عرض المنتجات',
          loadComponent: () =>
            import('./product/components/product-general/prod-general-group/prod-general-group.component').then(
              (m) => m.ProdGeneralGroupComponent,
            ),
        },
        {
          path: 'item/:id',
          title: 'صفحة منتج',
          loadComponent: () =>
            import('./product/components/product-general/prod-general-item/prod-general-item.component').then(
              (m) => m.ProdGeneralItemComponent,
            ),
        },
      ],
    },
    {
      path: 'request-management',
      children: [
        {
          path: ':type',
          children: [
            {
              path: 'show',
              title: (snapshot) => {
                const type = snapshot.paramMap.get('type');
                switch (type) {
                  case 'waiting':
                    return 'عرض الطلبات المنتظرة';
                  default:
                    return 'عرض الطلبات المنتهية';
                }
              },
              loadComponent: () =>
                import(
                  './client/components/client-req-management/client-req-management-show/client-req-management-show.component'
                ).then((m) => m.ClientReqManagementShowComponent),
            },
          ],
        },
      ],
    },
    {
      path: 'return-management',
      children: [
        {
          path: 'show',
          title: 'عرض المرتجع',
          loadComponent: () =>
            import(
              './client/components/client-return-management/client-return-management-show/client-return-management-show.component'
            ).then((m) => m.ClientReturnManagementShowComponent),
        },
        {
          path: 'show/:requestId',
          title: 'عرض المرتجع',
          loadComponent: () =>
            import(
              './client/components/client-return-management/client-return-management-show/client-return-management-show.component'
            ).then((m) => m.ClientReturnManagementShowComponent),
        },
      ],
    },
  ],
};
const distributorRoutes: Route = {
  path: 'distributor',
  children: [
    {
      path: 'request-management',
      children: [
        {
          path: ':type',
          children: [
            {
              path: 'show',
              title: (snapshot) => {
                const type = snapshot.paramMap.get('type');
                switch (type) {
                  case 'waiting':
                    return 'عرض الطلبات المنتظرة';
                  default:
                    return 'عرض الطلبات المنتهية';
                }
              },
              loadComponent: () =>
                import(
                  './distributor/components/distributor-request-management/distributor-req-management-show/distributor-req-management-show.component'
                ).then((m) => m.DistributorReqManagementShowComponent),
            },
          ],
        },
      ],
    },
    {
      path: 'return-management',
      children: [
        {
          path: 'show',
          title: 'عرض المرتجع',
          loadComponent: () =>
            import(
              './distributor/components/distributor-return-management/distributor-return-management-show/distributor-return-management-show.component'
            ).then((m) => m.DistributorReturnManagementShowComponent),
        },
        {
          path: 'show/:requestId',
          title: 'عرض المرتجع',
          loadComponent: () =>
            import(
              './distributor/components/distributor-return-management/distributor-return-management-show/distributor-return-management-show.component'
            ).then((m) => m.DistributorReturnManagementShowComponent),
        },
      ],
    },
  ],
};
const authRoutes: Route = {
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
      loadComponent: () => import('./general/components/register/register.component').then((m) => m.RegisterComponent),
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
        import('./general/components/forget-password/forget-password.component').then((m) => m.ForgetPasswordComponent),
    },
  ],
};

const generalRoutes: Route[] = [
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
];
export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    title: 'الصفحة الرئيسية',
    loadComponent: () => import('./shared/components/layout/layout.component').then((m) => m.LayoutComponent),
    children: [ownerRoutes, companyRoutes, clientRoutes, distributorRoutes, ...generalRoutes],
  },
  authRoutes,
  {
    path: '**',
    loadComponent: () =>
      import('./general/components/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
];
