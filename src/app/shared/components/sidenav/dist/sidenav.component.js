"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SidenavComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var primeng_shared_module_1 = require("../../modules/shared/primeng-shared.module");
var SidenavComponent = /** @class */ (function () {
    function SidenavComponent(stateSrv, userState) {
        var _this = this;
        this.stateSrv = stateSrv;
        this.items = [];
        this.role = '';
        core_1.effect(function () {
            var _a;
            var strategy = userState.strategy();
            _this.role = (_a = userState.role()) !== null && _a !== void 0 ? _a : null;
            _this.items = strategy ? strategy.navMenu : [];
        });
    }
    SidenavComponent.prototype.ngOnInit = function () { };
    SidenavComponent = __decorate([
        core_1.Component({
            selector: 'sidenav',
            imports: [router_1.RouterModule, primeng_shared_module_1.PrimeNgSharedModule],
            templateUrl: './sidenav.component.html',
            styleUrl: './sidenav.component.scss'
        })
    ], SidenavComponent);
    return SidenavComponent;
}());
exports.SidenavComponent = SidenavComponent;
