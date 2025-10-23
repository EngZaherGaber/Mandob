"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientCartComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var primeng_shared_module_1 = require("../../../shared/modules/shared/primeng-shared.module");
var ClientCartComponent = /** @class */ (function () {
    function ClientCartComponent(stateSrv, msgSrv, shoppingManagement, clientRequestSrv) {
        var _this = this;
        this.stateSrv = stateSrv;
        this.msgSrv = msgSrv;
        this.shoppingManagement = shoppingManagement;
        this.clientRequestSrv = clientRequestSrv;
        this.result = null;
        this.get$ = new rxjs_1.Subject();
        this.getSub$ = new rxjs_1.Observable();
        this.itemUpdates = core_1.computed(function () {
            var _a;
            return (_a = _this.result) === null || _a === void 0 ? void 0 : _a.items.map(function (item) { return ({ cartItemId: item.cartItemId, newQuantity: item.quantity }); });
        });
        this.isUpdate = false;
        this.getSub$ = this.get$.pipe(rxjs_1.switchMap(function (res) {
            return _this.shoppingManagement.getOne().pipe(rxjs_1.switchMap(function (res) {
                if (res.succeeded) {
                    _this.result = res.data;
                }
                return rxjs_1.of(null);
            }));
        }));
        this.getSub$.subscribe(function (res) { });
        this.get$.next(true);
    }
    ClientCartComponent.prototype.onImgError = function (event) {
        var img = event.target;
        img.src = 'boxes.svg'; // 👈 your fallback image
    };
    ClientCartComponent.prototype.makeItRequest = function () {
        var _this = this;
        if (this.result) {
            this.clientRequestSrv.createFromCart(this.result).subscribe(function (res) {
                _this.msgSrv.showMessage(res.message, res.succeeded);
                _this.stateSrv.collapseCart();
            });
        }
    };
    ClientCartComponent.prototype.clear = function () {
        var _this = this;
        var _a, _b;
        if ((_a = this.result) === null || _a === void 0 ? void 0 : _a.cartId) {
            this.shoppingManagement.clear((_b = this.result) === null || _b === void 0 ? void 0 : _b.cartId).subscribe(function (res) {
                _this.msgSrv.showMessage(res.message, res.succeeded);
                _this.get$.next(true);
            });
        }
    };
    ClientCartComponent.prototype.update = function () {
        var _this = this;
        var itemUpdates = this.itemUpdates();
        if (itemUpdates) {
            this.shoppingManagement.update({ itemUpdates: itemUpdates }).subscribe(function (res) {
                _this.msgSrv.showMessage(res.message, res.succeeded);
                _this.get$.next(true);
            });
        }
    };
    ClientCartComponent = __decorate([
        core_1.Component({
            selector: 'client-cart',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, router_1.RouterModule, forms_1.FormsModule],
            templateUrl: './client-cart.component.html',
            styleUrl: './client-cart.component.scss'
        })
    ], ClientCartComponent);
    return ClientCartComponent;
}());
exports.ClientCartComponent = ClientCartComponent;
