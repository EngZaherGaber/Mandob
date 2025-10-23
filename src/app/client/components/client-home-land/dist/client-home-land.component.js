"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientHomeLandComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var comp_general_list_component_1 = require("../../../company/components/comp-general/comp-general-list/comp-general-list.component");
var prod_general_list_component_1 = require("../../../product/components/product-general/prod-general-list/prod-general-list.component");
var ClientHomeLandComponent = /** @class */ (function () {
    function ClientHomeLandComponent(categoryManagement, companyStore, productStore) {
        this.categoryManagement = categoryManagement;
        this.companyStore = companyStore;
        this.productStore = productStore;
        this.categories = [];
        this.companies = [];
        this.listToShow = [];
    }
    ClientHomeLandComponent.prototype.ngOnInit = function () {
        var _this = this;
        var productObs$ = this.categoryManagement
            .getAll({ first: 0, rows: 4, multiSortMeta: [{ field: 'categoryName', order: 1 }] }, true)
            .pipe(rxjs_1.switchMap(function (res) {
            if (res.succeeded) {
                _this.categories = res.data;
            }
            return rxjs_1.from(_this.categories).pipe(rxjs_1.concatMap(function (category) {
                return rxjs_1.timer(0).pipe(
                // wait 3 seconds before request
                rxjs_1.switchMap(function () {
                    return _this.productStore.getAll({ categoryId: category.id, pageNumber: 1, pageSize: 8 }).pipe(rxjs_1.map(function (productRes) { return ({ category: category, products: productRes.data.products }); }), rxjs_1.catchError(function () { return rxjs_1.of({ category: category, products: [] }); }));
                }));
            }));
        }));
        this.companyStore
            .getAll({ first: 0, rows: 10, multiSortMeta: [{ field: 'name', order: 1 }] })
            .pipe(rxjs_1.switchMap(function (res) {
            if (res.succeeded) {
                _this.companies = res.data;
            }
            return productObs$;
        }), rxjs_1.catchError(function (err) { return productObs$; }))
            .subscribe(function (res) {
            if (res.products.length > 0)
                _this.listToShow.push(res);
        });
    };
    ClientHomeLandComponent = __decorate([
        core_1.Component({
            selector: 'client-home-land',
            imports: [prod_general_list_component_1.ProdGeneralListComponent, comp_general_list_component_1.CompGeneralListComponent, common_1.CommonModule],
            templateUrl: './client-home-land.component.html',
            styleUrl: './client-home-land.component.scss'
        })
    ], ClientHomeLandComponent);
    return ClientHomeLandComponent;
}());
exports.ClientHomeLandComponent = ClientHomeLandComponent;
