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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var dynamic_input_component_1 = require("../../../../shared/components/dynamic-input/dynamic-input.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var ProdGeneralCardComponent = /** @class */ (function () {
    function ProdGeneralCardComponent(router, msgSrv, shoppingManagement, productStore, userState, stateSrv) {
        this.router = router;
        this.msgSrv = msgSrv;
        this.shoppingManagement = shoppingManagement;
        this.productStore = productStore;
        this.userState = userState;
        this.stateSrv = stateSrv;
        this.product = core_1.input.required();
        this.get$ = new rxjs_1.Observable();
        this.getSub$ = new rxjs_1.Subject();
        this.buyDialog = false;
        this.objs = [];
        this.form = new forms_1.FormGroup({
            quanitiy: new forms_1.FormControl(0),
            variantSKU: new forms_1.FormControl(null)
        });
    }
    ProdGeneralCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.get$ = this.getSub$.pipe(rxjs_1.switchMap(function (res) {
            _this.buyDialog = res;
            if (_this.buyDialog) {
                return _this.productStore.getOne(_this.product().productID);
            }
            return rxjs_1.of(null);
        }));
        this.get$.subscribe(function (res) {
            if (res && res.succeeded) {
                _this.objs = [
                    {
                        label: 'التشكيل المطلوب',
                        key: 'variantSKU',
                        value: null,
                        required: true,
                        visible: true,
                        dataType: 'list',
                        options: res.data.variants.map(function (x) { return ({ id: x.sku, name: x.variantName }); })
                    },
                    {
                        label: 'الكمية',
                        key: 'quanitiy',
                        value: null,
                        required: true,
                        visible: true,
                        dataType: 'int',
                        options: []
                    },
                ];
            }
        });
    };
    ProdGeneralCardComponent.prototype.getControl = function (key) {
        return this.form.controls[key];
    };
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
    ProdGeneralCardComponent.prototype.addToCart = function () {
        var _this = this;
        var _a, _b;
        var body = {
            sku: this.getControl('variantSKU').value,
            quantity: +this.getControl('quanitiy').value,
            userId: +((_b = (_a = this.userState.user()) === null || _a === void 0 ? void 0 : _a.userId) !== null && _b !== void 0 ? _b : 0)
        };
        this.shoppingManagement.add(body).subscribe(function (res) {
            _this.msgSrv.showMessage(res.message, res.succeeded);
            if (res.succeeded) {
                _this.buyDialog = false;
                _this.stateSrv.collapseCart();
            }
        });
    };
    ProdGeneralCardComponent = __decorate([
        core_1.Component({
            selector: 'prod-general-card',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, router_1.RouterModule, dynamic_input_component_1.DynamicInputComponent],
            templateUrl: './prod-general-card.component.html',
            styleUrl: './prod-general-card.component.scss'
        })
    ], ProdGeneralCardComponent);
    return ProdGeneralCardComponent;
}());
exports.ProdGeneralCardComponent = ProdGeneralCardComponent;
