"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.routes = void 0;
var auth_guard_1 = require("./shared/guards/auth.guard");
var companyRoutes = {
    path: 'company',
    children: [
        {
            path: 'distributor-management',
            children: [
                {
                    path: 'show',
                    title: 'عرض الموزعين',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./distributor/components/distributor-management/distributor-management-show/distributor-management-show.component'); }).then(function (m) { return m.DistributorManagementShowComponent; });
                    }
                },
                {
                    path: 'add',
                    title: 'اضافة موزع',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./distributor/components/distributor-management/distributor-management-add/distributor-management-add.component'); }).then(function (m) { return m.DistributorManagementAddComponent; });
                    }
                },
                {
                    path: 'detail/:type/:id',
                    title: 'بيانات الموزع',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./distributor/components/distributor-management/distributor-management-detail/distributor-management-detail.component'); }).then(function (m) { return m.DistributorDetailComponent; });
                    }
                },
            ]
        },
        {
            path: 'product-management',
            children: [
                {
                    path: 'show',
                    title: 'عرض المنتجات',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./product/components/prod-management/prod-management-show/prod-management-show.component'); }).then(function (m) { return m.ProdManagementShowComponent; });
                    }
                },
                {
                    path: 'detail/edit/:id',
                    title: 'بيانات المنتج',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./product/components/prod-management/prod-management-detail/prod-management-detail.component'); }).then(function (m) { return m.ProdManagementDetailComponent; });
                    }
                },
                {
                    path: 'detail/display/:id',
                    title: 'بيانات المنتج',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./product/components/product-general/prod-general-item/prod-general-item.component'); }).then(function (m) { return m.ProdGeneralItemComponent; });
                    }
                },
                {
                    path: 'add',
                    title: 'اضافة منتج',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./product/components/prod-management/prod-management-add/prod-management-add.component'); }).then(function (m) { return m.ProdManagementAddComponent; });
                    }
                },
            ]
        },
        {
            path: 'offer-management',
            children: [
                {
                    path: 'show',
                    title: 'عرض العروض',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./offer/components/offer-management/offer-management-show/offer-management-show.component'); }).then(function (m) { return m.OfferManagementShowComponent; });
                    }
                },
                {
                    path: 'detail/:type/:id',
                    title: 'بيانات العرض',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./offer/components/offer-management/offer-management-detail/offer-management-detail.component'); }).then(function (m) { return m.OfferManagementDetailComponent; });
                    }
                },
                {
                    path: 'add',
                    title: 'اضافة عرض',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./offer/components/offer-management/offer-management-add/offer-management-add.component'); }).then(function (m) { return m.OfferManagementAddComponent; });
                    }
                },
            ]
        },
        {
            path: 'collection-management',
            children: [
                {
                    path: 'show',
                    title: 'عرض المجموعات',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./company/components/collection-management/collection-management-show/collection-management-show.component'); }).then(function (m) { return m.CollectionManagementShowComponent; });
                    }
                },
                {
                    path: 'detail/:type/:id',
                    title: 'بيانات المجموعة',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./company/components/collection-management/collection-management-detail/collection-management-detail.component'); }).then(function (m) { return m.CollectionManagementDetailComponent; });
                    }
                },
                {
                    path: 'add',
                    title: 'اضافة مجموعة',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./company/components/collection-management/collection-management-add/collection-management-add.component'); }).then(function (m) { return m.CollectionManagementAddComponent; });
                    }
                },
            ]
        },
    ]
};
var ownerRoutes = {
    path: 'owner',
    children: [
        {
            path: 'company-management',
            children: [
                {
                    path: 'show',
                    title: 'عرض الشركات',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./company/components/comp-management/comp-management-show/comp-management-show.component'); }).then(function (m) { return m.CompManagementShowComponent; });
                    }
                },
                {
                    path: 'detail/:type/:id',
                    title: 'بيانات الشركة',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./company/components/comp-management/comp-management-detail/comp-management-detail.component'); }).then(function (m) { return m.CompManagementDetailComponent; });
                    }
                },
                {
                    path: 'add',
                    title: 'اضافة شركة',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./company/components/comp-management/comp-management-add/comp-management-add.component'); }).then(function (m) { return m.CompManagementAddComponent; });
                    }
                },
            ]
        },
        {
            path: 'owner-management',
            children: [
                {
                    path: 'show',
                    title: 'عرض المدراء',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./owner/components/owner-management/owner-management-show/owner-management-show.component'); }).then(function (m) { return m.OwnerManagementShowComponent; });
                    }
                },
                {
                    path: 'add',
                    title: 'اضافة مدير',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./owner/components/owner-management/owner-management-add/owner-management-add.component'); }).then(function (m) { return m.OwnerManagementAddComponent; });
                    }
                },
                {
                    path: 'detail/:type/:id',
                    title: 'بيانات مدير',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./owner/components/owner-management/owner-management-detail/owner-management-detail.component'); }).then(function (m) { return m.OwnerManagementDetailComponent; });
                    }
                },
            ]
        },
        {
            path: 'client-management',
            children: [
                {
                    path: 'show',
                    title: 'عرض الماركت',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./client/components/clinet-management/client-management-show/client-management-show.component'); }).then(function (m) { return m.ClientManagementShowComponent; });
                    }
                },
                {
                    path: 'detail/display/:id',
                    title: 'بيانات ماركت',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./client/components/clinet-management/client-management-detail/client-management-detail.component'); }).then(function (m) { return m.ClientManagementDetailComponent; });
                    }
                },
            ]
        },
        {
            path: 'plan-management',
            children: [
                {
                    path: 'show',
                    title: 'عرض الباقات',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./owner/components/plan-management/plan-management-show/plan-management-show.component'); }).then(function (m) { return m.PlanManagementShowComponent; });
                    }
                },
                {
                    path: 'add',
                    title: 'اضافة باقة',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./owner/components/plan-management/plan-management-add/plan-management-add.component'); }).then(function (m) { return m.PlanManagementAddComponent; });
                    }
                },
                {
                    path: 'detail/:type/:id',
                    title: 'بيانات باقة',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./owner/components/plan-management/plan-management-detail/plan-management-detail.component'); }).then(function (m) { return m.PlanManagementDetailComponent; });
                    }
                },
            ]
        },
        {
            path: 'category-management',
            children: [
                {
                    path: 'show',
                    title: 'عرض التصنيفات',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./owner/components/category-management/category-management-show/category-management-show.component'); }).then(function (m) { return m.CategoryManagementShowComponent; });
                    }
                },
                {
                    path: 'add',
                    title: 'اضافة تصنيف',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./owner/components/category-management/category-management-add/category-management-add.component'); }).then(function (m) { return m.CategoryManagementAddComponent; });
                    }
                },
                {
                    path: 'detail/:type/:id',
                    title: 'بيانات تصنيف',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./owner/components/category-management/category-management-detail/category-management-detail.component'); }).then(function (m) { return m.CategoryManagementDetailComponent; });
                    }
                },
            ]
        },
    ]
};
var clientRoutes = {
    path: 'client',
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home'
        },
        {
            path: 'home',
            title: 'الصفحة الرئيسية',
            loadComponent: function () {
                return Promise.resolve().then(function () { return require('./client/components/client-home-land/client-home-land.component'); }).then(function (m) { return m.ClientHomeLandComponent; });
            }
        },
        {
            path: 'company',
            children: [
                {
                    path: 'profile/:id',
                    title: 'صفحة الشركة',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./company/components/comp-general/comp-general-profile/comp-general-profile.component'); }).then(function (m) { return m.CompGeneralProfileComponent; });
                    }
                },
            ]
        },
        {
            path: 'product',
            children: [
                {
                    path: 'group/:type/:header/:id',
                    title: 'عرض المنتجات',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./product/components/product-general/prod-general-group/prod-general-group.component'); }).then(function (m) { return m.ProdGeneralGroupComponent; });
                    }
                },
                {
                    path: 'item/:id',
                    title: 'صفحة منتج',
                    loadComponent: function () {
                        return Promise.resolve().then(function () { return require('./product/components/product-general/prod-general-item/prod-general-item.component'); }).then(function (m) { return m.ProdGeneralItemComponent; });
                    }
                },
            ]
        },
    ]
};
var authRoutes = {
    path: 'auth',
    loadComponent: function () { return Promise.resolve().then(function () { return require('./general/components/auth/auth.component'); }).then(function (m) { return m.AuthComponent; }); },
    children: [
        {
            path: 'login',
            title: 'تسجيل الدخول',
            loadComponent: function () { return Promise.resolve().then(function () { return require('./general/components/login/login.component'); }).then(function (m) { return m.LoginComponent; }); }
        },
        {
            path: 'register',
            title: 'انشاء حساب',
            loadComponent: function () { return Promise.resolve().then(function () { return require('./general/components/register/register.component'); }).then(function (m) { return m.RegisterComponent; }); }
        },
        {
            path: 'verfication',
            title: 'تأكيد الحساب',
            loadComponent: function () {
                return Promise.resolve().then(function () { return require('./general/components/verfication/verfication.component'); }).then(function (m) { return m.VerficationComponent; });
            }
        },
        {
            path: 'forget-password',
            title: 'استعادة كلمة المرور',
            loadComponent: function () {
                return Promise.resolve().then(function () { return require('./general/components/forget-password/forget-password.component'); }).then(function (m) { return m.ForgetPasswordComponent; });
            }
        },
    ]
};
var generalRoutes = [
    {
        path: 'account',
        title: 'معلومات الحساب',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./general/components/account/account.component'); }).then(function (m) { return m.AccountComponent; }); }
    },
    {
        path: 'gallery',
        title: 'معرض الصور',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./general/components/gallery/gallery.component'); }).then(function (m) { return m.GalleryComponent; }); }
    },
];
exports.routes = [
    {
        path: '',
        canActivate: [auth_guard_1.authGuard],
        title: 'الصفحة الرئيسية',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./shared/components/layout/layout.component'); }).then(function (m) { return m.LayoutComponent; }); },
        children: __spreadArrays([ownerRoutes, companyRoutes, clientRoutes], generalRoutes)
    },
    authRoutes,
    {
        path: '**',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('./general/components/not-found-page/not-found-page.component'); }).then(function (m) { return m.NotFoundPageComponent; });
        }
    },
];
