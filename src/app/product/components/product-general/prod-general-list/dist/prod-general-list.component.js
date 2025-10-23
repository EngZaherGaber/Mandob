"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProdGeneralListComponent = void 0;
var core_1 = require("@angular/core");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var prod_general_card_component_1 = require("../prod-general-card/prod-general-card.component");
var ProdGeneralListComponent = /** @class */ (function () {
    function ProdGeneralListComponent(router) {
        this.router = router;
        this.header = '';
        this.view = 'slider';
        this.data = [];
        this.type = 'category';
        this.totalCount = 0;
        this.id = 0;
        this.numVisible = 5;
        this.getSeverity = function () {
            return;
        };
        this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 4,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1
            },
        ];
    }
    ProdGeneralListComponent.prototype.ngOnInit = function () { };
    ProdGeneralListComponent.prototype.seeMoreNavigation = function () {
        this.router.navigate(['client/product/group/' + this.type + '/' + this.header + '/' + this.id]);
    };
    __decorate([
        core_1.Input()
    ], ProdGeneralListComponent.prototype, "header");
    __decorate([
        core_1.Input()
    ], ProdGeneralListComponent.prototype, "view");
    __decorate([
        core_1.Input()
    ], ProdGeneralListComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], ProdGeneralListComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], ProdGeneralListComponent.prototype, "totalCount");
    __decorate([
        core_1.Input()
    ], ProdGeneralListComponent.prototype, "id");
    __decorate([
        core_1.Input()
    ], ProdGeneralListComponent.prototype, "numVisible");
    __decorate([
        core_1.Input()
    ], ProdGeneralListComponent.prototype, "getSeverity");
    __decorate([
        core_1.Input()
    ], ProdGeneralListComponent.prototype, "responsiveOptions");
    ProdGeneralListComponent = __decorate([
        core_1.Component({
            selector: 'prod-general-list',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, prod_general_card_component_1.ProdGeneralCardComponent],
            templateUrl: './prod-general-list.component.html',
            styleUrl: './prod-general-list.component.scss'
        })
    ], ProdGeneralListComponent);
    return ProdGeneralListComponent;
}());
exports.ProdGeneralListComponent = ProdGeneralListComponent;
