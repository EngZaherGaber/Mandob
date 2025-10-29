"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotificationMenuComponent = void 0;
var core_1 = require("@angular/core");
var review_submit_component_1 = require("../../../review/components/review-submit/review-submit.component");
var primeng_shared_module_1 = require("../../modules/shared/primeng-shared.module");
var NotificationMenuComponent = /** @class */ (function () {
    function NotificationMenuComponent(stateSrv, router, msgSrv, userState) {
        this.stateSrv = stateSrv;
        this.router = router;
        this.msgSrv = msgSrv;
        this.userState = userState;
        this.showSubmitReview = false;
        this.requestID = null;
    }
    NotificationMenuComponent.prototype.goToByNotification = function (value) {
        switch (value.type) {
            case 'تقييم':
                this.requestID = value.recordId;
                this.showSubmitReview = true;
                break;
            default:
                this.router.navigate([this.userState.role() + '/' + value.type + '/' + value.recordId]);
                break;
        }
        this.stateSrv.markNotificationAsRead(value.id);
    };
    NotificationMenuComponent.prototype.timeSince = function (timestamp) {
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
    NotificationMenuComponent.prototype.ngOnDestroy = function () {
        this.stateSrv.wsSrv.stopConnection();
    };
    NotificationMenuComponent = __decorate([
        core_1.Component({
            selector: 'notification-menu',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, review_submit_component_1.ReviewSubmitComponent],
            templateUrl: './notification-menu.component.html',
            styleUrl: './notification-menu.component.scss'
        })
    ], NotificationMenuComponent);
    return NotificationMenuComponent;
}());
exports.NotificationMenuComponent = NotificationMenuComponent;
