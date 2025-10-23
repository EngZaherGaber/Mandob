"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientStrategy = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../environments/environment");
var base_user_strategy_1 = require("../../general/classes/base-user-strategy");
var ClientStrategy = /** @class */ (function (_super) {
    __extends(ClientStrategy, _super);
    function ClientStrategy(http, authSrv, router, categorySrv) {
        var _this = _super.call(this, http, authSrv, router) || this;
        _this.categorySrv = categorySrv;
        _this.url = environment_1.environment.api + 'Client';
        _this.navMenu = [];
        _this.categorySrv.getAll({ first: 0, rows: 10 }).subscribe(function (res) {
            var arr = res.data.map(function (x) {
                var header = 'منتجات ' + x.name;
                return {
                    label: x.name,
                    icon: 'pi pi-angle-double-left',
                    routerLink: ['client/product/group/category/' + header + '/' + x.id]
                };
            });
            arr.push({
                label: 'قراءة المزيد',
                icon: 'pi pi-eye',
                routerLink: ['client/product/group/all/' + 'كل المنتجات' + '/' + 0]
            });
            _this.navMenu = [
                {
                    label: 'الصفحة الرئيسية',
                    icon: 'pi pi-eye',
                    routerLink: ['client/home']
                },
                {
                    label: 'العروض',
                    icon: 'pi pi-tag',
                    routerLink: ['item']
                },
                {
                    label: 'المنتجات',
                    icon: 'pi pi-box',
                    items: arr
                },
                {
                    label: 'الطلبات',
                    icon: 'pi pi-file',
                    items: [
                        {
                            label: 'الطلبات المنتظرة',
                            icon: 'pi pi-send',
                            routerLink: ['client/request-management/waiting/show']
                        },
                        {
                            label: 'الطلبات المنتهية',
                            icon: 'pi pi-inbox',
                            routerLink: ['client/request-management/ending/show']
                        },
                        {
                            label: 'المرتجع',
                            icon: 'pi pi-arrow-circle-left',
                            routerLink: ['client/return-management/show']
                        },
                    ]
                },
            ];
        });
        return _this;
    }
    ClientStrategy.prototype.getNavMenu = function () {
        return this.navMenu;
    };
    ClientStrategy = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ClientStrategy);
    return ClientStrategy;
}(base_user_strategy_1.BaseUserStrategy));
exports.ClientStrategy = ClientStrategy;
