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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ProdManagementAddComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var dynamic_input_component_1 = require("../../../../shared/components/dynamic-input/dynamic-input.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var ProdManagementAddComponent = /** @class */ (function () {
    function ProdManagementAddComponent(productManagement, msgSrv, router, categoryManagement, userState, collectionManagement, companyManagement) {
        var _this = this;
        this.productManagement = productManagement;
        this.msgSrv = msgSrv;
        this.router = router;
        this.form = new forms_1.FormGroup({
            productName: new forms_1.FormControl(null, forms_1.Validators.required),
            productDescription: new forms_1.FormControl(null, forms_1.Validators.required),
            CollectionIDs: new forms_1.FormControl(null, forms_1.Validators.required),
            CategorieIDs: new forms_1.FormControl(null, forms_1.Validators.required)
        });
        this.objs = [];
        this.currencyID = 0;
        this.options = [];
        this.variants = [];
        this.uploadedFiles = [];
        this.showForm = false;
        var user = userState.user();
        var strategy = userState.strategy();
        if (user && user.userId && strategy) {
            rxjs_1.forkJoin({
                company: strategy.getById(),
                collection: collectionManagement.getAll({ first: 0, rows: 1000 }, user.userId),
                categories: categoryManagement.getAll({ first: 0, rows: 1000 })
            }).subscribe(function (res) {
                if ('currencyId' in res.company.data) {
                    _this.currencyID = res.company.data.currencyId;
                }
                _this.objs = [
                    {
                        key: 'name',
                        value: null,
                        label: 'الاسم',
                        dataType: 'string',
                        required: true,
                        visible: true,
                        options: []
                    },
                    {
                        key: 'productDescription',
                        value: null,
                        label: 'الوصف',
                        dataType: 'editor',
                        required: true,
                        visible: true,
                        options: []
                    },
                    {
                        key: 'CollectionIDs',
                        value: null,
                        label: 'المجموعات',
                        dataType: 'MultiSelect',
                        required: true,
                        visible: true,
                        options: res.collection.data
                    },
                    {
                        key: 'CategorieIDs',
                        value: null,
                        label: 'التصنيف',
                        dataType: 'MultiSelect',
                        required: true,
                        visible: true,
                        options: res.categories.data
                    },
                ];
                _this.showForm = true;
            });
        }
    }
    ProdManagementAddComponent.prototype.getControl = function (name) {
        return this.form.get(name);
    };
    ProdManagementAddComponent.prototype.onSelect = function (event) {
        var _loop_1 = function (file) {
            if (!this_1.uploadedFiles.find(function (x) { return x.name === file.name; })) {
                this_1.uploadedFiles.push(file);
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var file = _a[_i];
            _loop_1(file);
        }
    };
    ProdManagementAddComponent.prototype.onRemove = function (event) {
        var index = this.uploadedFiles.findIndex(function (x) { return x.name === event.file.name; });
        if (index > -1) {
            this.uploadedFiles.splice(index, 1);
        }
    };
    ProdManagementAddComponent.prototype.addOptionName = function (input) {
        this.options.push({ optionName: input.value, values: [] });
        input.value = null;
    };
    ProdManagementAddComponent.prototype.addOptionValue = function (input, optionIndex) {
        this.options[optionIndex].values.push({ valueName: input.value });
        input.value = null;
    };
    ProdManagementAddComponent.prototype.removeOptionValue = function (optionIndex, valueIndex) {
        this.options[optionIndex].values.splice(valueIndex, 1);
    };
    ProdManagementAddComponent.prototype.removeOption = function (optionIndex) {
        this.options.splice(optionIndex, 1);
    };
    ProdManagementAddComponent.prototype.generateVariants = function () {
        var _this = this;
        var options = this.options;
        // Step 1: prepare array of arrays of values
        var valuesArray = options.map(function (opt) {
            return opt.values.map(function (v) { return ({
                optionName: opt.optionName,
                optionValueName: v.valueName
            }); });
        });
        // Step 2: Cartesian product
        var cartesian = function (arr) { return arr.reduce(function (a, b) { return a.flatMap(function (d) { return b.map(function (e) { return __spreadArrays(d, [e]); }); }); }, [[]]); };
        var combinations = cartesian(valuesArray);
        // Step 3: map to VariantItem but keep old values if exist
        var newVariants = combinations.map(function (combo, index) {
            var _a;
            var variantName = _this.form.value.productName + ' ' + combo.map(function (c) { return c.optionValueName; }).join(' ');
            // Try to find existing variant
            var existing = (_a = _this.variants) === null || _a === void 0 ? void 0 : _a.find(function (v) {
                return v.optionAssignments.length === combo.length &&
                    v.optionAssignments.every(function (oa, i) { return oa.optionName === combo[i].optionName && oa.optionValueName === combo[i].optionValueName; });
            });
            if (existing) {
                // Keep its values
                return __assign(__assign({}, existing), { variantName: variantName });
            }
            // Otherwise create new default variant
            return {
                variantName: variantName,
                sku: "SKU-" + (index + 1),
                quantity: 0,
                optionAssignments: combo,
                VariantImages: [],
                price: 0
            };
        });
        return newVariants;
    };
    ProdManagementAddComponent.prototype.openVariantPanel = function (event) {
        if (event.index === '2') {
            this.variants = this.generateVariants();
        }
    };
    ProdManagementAddComponent.prototype.checkVariantPanel = function () {
        return this.form.invalid || this.options.filter(function (opt) { return opt.values.length === 0; }).length > 0;
    };
    ProdManagementAddComponent.prototype.saveProduct = function () {
        var _this = this;
        var product = {
            productName: this.form.value.productName,
            productDescription: this.form.value.productDescription,
            collectionIDs: this.form.value.CollectionIDs,
            categorieIDs: this.form.value.CategorieIDs,
            options: this.options,
            variants: this.variants
        };
        var variantImage = product.variants.flatMap(function (x) { return x.variantImages; });
        var everyVariantHaveImage = variantImage.length > 0 && variantImage.every(function (x) { return (x ? x.length > 0 : false); });
        if (everyVariantHaveImage) {
            this.productManagement.add(product, this.uploadedFiles).subscribe(function (res) {
                _this.msgSrv.showMessage(res.message, res.succeeded);
                if (res.succeeded)
                    _this.router.navigate(['company/product-management/show']);
            });
        }
        else {
            this.msgSrv.showError('يجب ان ينتمي لكل تشكيل صور خاصة به من ضمن صور المنتج');
        }
    };
    ProdManagementAddComponent = __decorate([
        core_1.Component({
            selector: 'prod-management-add',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, dynamic_input_component_1.DynamicInputComponent, forms_1.FormsModule],
            templateUrl: './prod-management-add.component.html',
            styleUrl: './prod-management-add.component.scss'
        })
    ], ProdManagementAddComponent);
    return ProdManagementAddComponent;
}());
exports.ProdManagementAddComponent = ProdManagementAddComponent;
