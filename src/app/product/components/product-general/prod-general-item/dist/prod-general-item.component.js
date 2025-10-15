"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProdGeneralItemComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var dynamic_input_component_1 = require("../../../../shared/components/dynamic-input/dynamic-input.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var prod_general_list_component_1 = require("../prod-general-list/prod-general-list.component");
var ProdGeneralItemComponent = /** @class */ (function () {
    function ProdGeneralItemComponent(userState, productStore, shoppingManagement, msgSrv, stateSrv, route, router) {
        this.userState = userState;
        this.productStore = productStore;
        this.shoppingManagement = shoppingManagement;
        this.msgSrv = msgSrv;
        this.stateSrv = stateSrv;
        this.route = route;
        this.router = router;
        this.images = core_1.model([]);
        this.obj = {
            key: 'option',
            value: null,
            label: 'اللون',
            dataType: 'list',
            required: true,
            visible: true,
            options: []
        };
        this.optionsArrayControl = new forms_1.FormArray([]);
        this.countObj = {
            key: 'count',
            value: 1,
            label: 'الكمية',
            dataType: 'int',
            required: true,
            visible: true,
            options: []
        };
        this.countControl = new forms_1.FormControl(1);
        this.responsiveOptions = [
            {
                breakpoint: '1200px',
                numVisible: 4
            },
            {
                breakpoint: '992px',
                numVisible: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2
            },
        ];
        this.options = [];
        this.variants = [];
        this.price = 0;
        this.activeIndex = 0;
        this.productId = 0;
        this.variantSKU = '';
        this.product = null;
        this.productsForSameCompany = [];
        this.productsForSameCategory = [];
    }
    ProdGeneralItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .pipe(rxjs_1.switchMap(function (param) {
            _this.productId = param['id'];
            return _this.productStore.getOne(_this.productId);
        }), rxjs_1.switchMap(function (res) {
            var _a, _b, _c;
            _this.images.set((_a = res.data.productImages) !== null && _a !== void 0 ? _a : []);
            _this.product = res.data;
            _this.options = res.data.options;
            _this.variants = res.data.variants;
            _this.createOptionArrayControl();
            _this.getPrice();
            return rxjs_1.forkJoin({
                sameCompany: _this.productStore.getAll({ userId: (_b = _this.product) === null || _b === void 0 ? void 0 : _b.companyId, pageNumber: 1, pageSize: 8 }),
                sameCategory: _this.productStore.getAll({
                    categoryId: (_c = _this.product) === null || _c === void 0 ? void 0 : _c.categorieIDs[0],
                    pageNumber: 1,
                    pageSize: 8
                })
            });
        }))
            .subscribe(function (res) {
            _this.productsForSameCompany = res.sameCompany.data.products;
            _this.productsForSameCategory = res.sameCategory.data.products;
        });
    };
    ProdGeneralItemComponent.prototype.getControl = function (index) {
        return this.optionsArrayControl.controls[index];
    };
    ProdGeneralItemComponent.prototype.getPrice = function () {
        var optionsValues = this.optionsArrayControl.getRawValue();
        var variant = this.variants.find(function (x) {
            return x.optionAssignments.map(function (assign) { return assign.optionValueName; }).every(function (assign) { return optionsValues.includes(assign); });
        });
        if (variant) {
            this.price = variant.price;
            this.variantSKU = variant.sku;
            var images = this.images().map(function (x) {
                var imgSplitter = x.split('/');
                return imgSplitter[imgSplitter.length - 1];
            });
            var Index = images.findIndex(function (x) { return x === (variant.variantImages ? variant.variantImages[0] : ''); });
            this.activeIndex = Index > -1 ? Index : 0;
        }
    };
    ProdGeneralItemComponent.prototype.goToCompany = function (companyId) {
        this.router.navigate(['client/company/profile/' + companyId]);
    };
    ProdGeneralItemComponent.prototype.createOptionArrayControl = function () {
        var _this = this;
        this.options.forEach(function (opt) {
            _this.optionsArrayControl.controls.push(new forms_1.FormControl(opt.values[0].valueName));
        });
    };
    ProdGeneralItemComponent.prototype.addToCart = function () {
        var _this = this;
        var _a, _b;
        var body = {
            sku: this.variantSKU,
            quantity: this.countControl.value,
            userId: +((_b = (_a = this.product) === null || _a === void 0 ? void 0 : _a.companyId) !== null && _b !== void 0 ? _b : 0)
        };
        this.shoppingManagement.add(body).subscribe(function (res) {
            _this.msgSrv.showMessage(res.message, res.succeeded);
            if (res.succeeded) {
                _this.stateSrv.collapseCart();
            }
        });
    };
    ProdGeneralItemComponent.prototype.getRating = function () {
        var _a;
        if (this.product)
            return (_a = this.product) === null || _a === void 0 ? void 0 : _a.ratingCount.toString();
        else
            return '0';
    };
    ProdGeneralItemComponent = __decorate([
        core_1.Component({
            selector: 'app-prod-general-item',
            imports: [forms_1.ReactiveFormsModule, dynamic_input_component_1.DynamicInputComponent, forms_1.FormsModule, primeng_shared_module_1.PrimeNgSharedModule, prod_general_list_component_1.ProdGeneralListComponent],
            templateUrl: './prod-general-item.component.html',
            styleUrl: './prod-general-item.component.scss'
        })
    ], ProdGeneralItemComponent);
    return ProdGeneralItemComponent;
}());
exports.ProdGeneralItemComponent = ProdGeneralItemComponent;
