"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersGeneralItemsComponent = void 0;
var core_1 = require("@angular/core");
var UsersGeneralItemsComponent = /** @class */ (function () {
    function UsersGeneralItemsComponent() {
        this.client = null;
        this.distributor = null;
        this.company = null;
    }
    __decorate([
        core_1.Input()
    ], UsersGeneralItemsComponent.prototype, "client");
    __decorate([
        core_1.Input()
    ], UsersGeneralItemsComponent.prototype, "distributor");
    __decorate([
        core_1.Input()
    ], UsersGeneralItemsComponent.prototype, "company");
    UsersGeneralItemsComponent = __decorate([
        core_1.Component({
            selector: 'users-general-items',
            imports: [],
            templateUrl: './users-general-items.component.html',
            styleUrl: './users-general-items.component.scss'
        })
    ], UsersGeneralItemsComponent);
    return UsersGeneralItemsComponent;
}());
exports.UsersGeneralItemsComponent = UsersGeneralItemsComponent;
