"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProdGeneralGroupComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var dynamic_input_component_1 = require("../../../../shared/components/dynamic-input/dynamic-input.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var prod_general_card_component_1 = require("../prod-general-card/prod-general-card.component");
var ProdGeneralGroupComponent = /** @class */ (function () {
    function ProdGeneralGroupComponent(route, productStoreSrv) {
        var _this = this;
        this.route = route;
        this.productStoreSrv = productStoreSrv;
        this.header = '';
        this.rows = 12;
        this.type = '';
        this.id = 0;
        this.body = { pageNumber: 0, pageSize: 4 };
        this.result = null;
        this.objs = [];
        this.controlsArr = new forms_1.FormArray([]);
        this.loadData$ = new rxjs_1.Subject();
        this.priceRange$ = new rxjs_1.Subject();
        this.priceRange = [];
        this.loadData$
            .pipe(rxjs_1.debounceTime(2000), rxjs_1.distinctUntilChanged(), rxjs_1.switchMap(function (event) {
            var _a, _b;
            _this.body.pageSize = (_a = event.rows) !== null && _a !== void 0 ? _a : 4;
            var number = ((_b = event.first) !== null && _b !== void 0 ? _b : 0) / _this.body.pageSize;
            _this.body.pageNumber = number + 1;
            return _this.productStoreSrv.getAll(_this.body);
        }))
            .subscribe(function (res) {
            var _a;
            _this.result = res.data;
            _this.priceRange = [_this.result.minPrice, _this.result.maxPrice];
            _this.objs = Object.keys(_this.result.optionList).map(function (key) {
                var _a;
                return {
                    key: key,
                    label: key,
                    value: null,
                    required: false,
                    visible: true,
                    dataType: 'MultiSelect',
                    options: ((_a = _this.result) === null || _a === void 0 ? void 0 : _a.optionList) ? _this.result.optionList[key].map(function (x) { return ({ id: x, name: x }); }) : []
                };
            });
            var arr = Object.keys(_this.result.optionList).map(function (key) {
                var control = new forms_1.FormControl(null);
                control.valueChanges.subscribe(function (res) { return _this.changeFilter(key, res !== null && res !== void 0 ? res : []); });
                return control;
            });
            (_a = _this.controlsArr.controls).push.apply(_a, arr);
        });
    }
    ProdGeneralGroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (param) {
            var _a, _b, _c;
            _this.type = (_a = param.get('type')) !== null && _a !== void 0 ? _a : '';
            _this.id = (_b = Number(param.get('id'))) !== null && _b !== void 0 ? _b : 0;
            _this.header = (_c = param.get('header')) !== null && _c !== void 0 ? _c : '';
            _this.body.changeOption = true;
            switch (_this.type) {
                case 'category':
                    _this.body.categoryId = +_this.id;
                    break;
                case 'collection':
                    _this.body.collectionId = +_this.id;
                    break;
                case 'company':
                    _this.body.companyId = +_this.id;
                    break;
                case 'search':
                    _this.body.globalFilter = _this.header;
                    break;
                default:
                    break;
            }
            _this.loadData$.next(__assign({}, _this.body));
        });
    };
    ProdGeneralGroupComponent.prototype.load = function (event) {
        this.loadData$.next(__assign(__assign({}, event), this.body));
    };
    ProdGeneralGroupComponent.prototype.getControl = function (index) {
        return this.controlsArr.controls[index];
    };
    ProdGeneralGroupComponent.prototype.changeFilter = function (key, value) {
        var _a;
        var _b, _c;
        var newBody = {
            rows: (_b = this.body.pageSize) !== null && _b !== void 0 ? _b : 4,
            first: ((_c = this.body.pageSize) !== null && _c !== void 0 ? _c : 0) * (this.body.pageNumber ? this.body.pageNumber - 1 : 0)
        };
        this.body.changeOption = false;
        this.body.optionFilters = __assign(__assign({}, this.body.optionFilters), (_a = {}, _a[key] = value, _a));
        this.loadData$.next(__assign(__assign({}, newBody), this.body));
    };
    ProdGeneralGroupComponent.prototype.priceRangeChange = function () {
        var _a, _b;
        var newBody = {
            rows: (_a = this.body.pageSize) !== null && _a !== void 0 ? _a : 4,
            first: ((_b = this.body.pageSize) !== null && _b !== void 0 ? _b : 0) * (this.body.pageNumber ? this.body.pageNumber - 1 : 0)
        };
        this.body.minPrice = this.priceRange[0];
        this.body.maxPrice = this.priceRange[1];
        this.loadData$.next(__assign(__assign({}, newBody), this.body));
    };
    __decorate([
        core_1.ViewChild('dv')
    ], ProdGeneralGroupComponent.prototype, "dv");
    ProdGeneralGroupComponent = __decorate([
        core_1.Component({
            selector: 'prod-general-group',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, prod_general_card_component_1.ProdGeneralCardComponent, dynamic_input_component_1.DynamicInputComponent, forms_1.FormsModule],
            templateUrl: './prod-general-group.component.html',
            styleUrl: './prod-general-group.component.scss'
        })
    ], ProdGeneralGroupComponent);
    return ProdGeneralGroupComponent;
}());
exports.ProdGeneralGroupComponent = ProdGeneralGroupComponent;
