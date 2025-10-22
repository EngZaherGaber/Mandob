"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LayoutComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var client_cart_component_1 = require("../../../client/components/client-cart/client-cart.component");
var comp_tasks_component_1 = require("../../../company/components/comp-tasks/comp-tasks.component");
var review_submit_component_1 = require("../../../review/components/review-submit/review-submit.component");
var click_outside_directive_1 = require("../../directives/click-outside.directive");
var primeng_shared_module_1 = require("../../modules/shared/primeng-shared.module");
var header_component_1 = require("../header/header.component");
var sidenav_component_1 = require("../sidenav/sidenav.component");
var LayoutComponent = /** @class */ (function () {
    function LayoutComponent(stateSrv, router, userState) {
        this.stateSrv = stateSrv;
        this.router = router;
        this.userState = userState;
        this.showSubmitReview = false;
        this.requestID = null;
    }
    LayoutComponent.prototype.onClickOutside = function (event) {
        if (this.stateSrv.isOpenedNotficiation()) {
            this.stateSrv.collapseNotficiation();
        }
    };
    LayoutComponent.prototype.goToByNotification = function (value) {
        this.stateSrv.markNotificationAsRead(value.id);
        switch (value.type) {
            case 'تقييم':
                this.requestID = value.recordId;
                this.showSubmitReview = true;
                break;
            default:
                this.router.navigate([this.userState.role() + '/' + value.type + '/' + value.recordId]);
                break;
        }
    };
    LayoutComponent.prototype.timeSince = function (timestamp) {
        var date = new Date(timestamp);
        // Handle invalid or default date
        if (isNaN(date.getTime()) || date.getFullYear() <= 1900) {
            return 'قديم'; // or 'N/A' or ''
        }
        var now = new Date();
        var seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(seconds / 3600);
        var days = Math.floor(seconds / 86400);
        var weeks = Math.floor(seconds / (86400 * 7));
        var months = Math.floor(seconds / (86400 * 30));
        var years = Math.floor(seconds / (86400 * 365));
        if (years > 0)
            return years + "Y";
        if (months > 0)
            return months + "M";
        if (weeks > 0)
            return weeks + "W";
        if (days > 0)
            return days + "D";
        if (hours > 0)
            return hours + "H";
        if (minutes > 0)
            return minutes + "m";
        return seconds + "s";
    };
    LayoutComponent.prototype.ngOnDestroy = function () {
        this.stateSrv.wsSrv.stopConnection();
    };
    LayoutComponent = __decorate([
        core_1.Component({
            selector: 'layout',
            imports: [
                sidenav_component_1.SidenavComponent,
                router_1.RouterOutlet,
                header_component_1.HeaderComponent,
                review_submit_component_1.ReviewSubmitComponent,
                click_outside_directive_1.ClickOutsideDirective,
                client_cart_component_1.ClientCartComponent,
                primeng_shared_module_1.PrimeNgSharedModule,
                comp_tasks_component_1.CompTasksComponent,
            ],
            templateUrl: './layout.component.html',
            styleUrl: './layout.component.scss',
            animations: [
                animations_1.trigger('sidebarAnimation', [
                    animations_1.transition(':enter', [
                        animations_1.style({ width: '0', overflow: 'hidden' }),
                        animations_1.animate('0.5s ease-in', animations_1.style({ width: '16.6667%' })),
                    ]),
                    animations_1.transition(':leave', [animations_1.animate('0.5s ease-in', animations_1.style({ width: '0', overflow: 'hidden' }))]),
                ]),
                animations_1.trigger('contentAnimation', [animations_1.transition('* <=> *', [animations_1.animate('0.5s ease-in', animations_1.style({ width: '*' }))])]),
            ]
        })
    ], LayoutComponent);
    return LayoutComponent;
}());
exports.LayoutComponent = LayoutComponent;
