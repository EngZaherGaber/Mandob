"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProdGeneralCardComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var ProdGeneralCardComponent = /** @class */ (function () {
    function ProdGeneralCardComponent() {
        this.product = core_1.input.required();
    }
    ProdGeneralCardComponent.prototype.onImgError = function (event) {
        var img = event.target;
        img.src = 'productIcon.svg'; // 👈 your fallback image
    };
    ProdGeneralCardComponent.prototype.getRating = function () {
        var _a;
        if (this.product)
            return (_a = this.product()) === null || _a === void 0 ? void 0 : _a.ratingCount.toString();
        else
            return '0';
    };
    ProdGeneralCardComponent = __decorate([
        core_1.Component({
            selector: 'prod-general-card',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, router_1.RouterModule],
            templateUrl: './prod-general-card.component.html',
            styleUrl: './prod-general-card.component.scss'
        })
    ], ProdGeneralCardComponent);
    return ProdGeneralCardComponent;
}());
exports.ProdGeneralCardComponent = ProdGeneralCardComponent;
