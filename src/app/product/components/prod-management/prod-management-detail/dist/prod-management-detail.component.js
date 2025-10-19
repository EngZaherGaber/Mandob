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
exports.ProdManagementDetailComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var dynamic_input_component_1 = require("../../../../shared/components/dynamic-input/dynamic-input.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var ProdManagementDetailComponent = /** @class */ (function () {
    function ProdManagementDetailComponent(productManagement, msgSrv, fileSrv, router, route, http, categoryManagement, userState, collectionManagement) {
        var _this = this;
        this.productManagement = productManagement;
        this.msgSrv = msgSrv;
        this.fileSrv = fileSrv;
        this.router = router;
        this.route = route;
        this.http = http;
        this.form = new forms_1.FormGroup({
            productName: new forms_1.FormControl(null, forms_1.Validators.required),
            productDescription: new forms_1.FormControl(null, forms_1.Validators.required),
            CollectionIDs: new forms_1.FormControl(null, forms_1.Validators.required),
            CategorieIDs: new forms_1.FormControl(null, forms_1.Validators.required)
        });
        this.objs = [];
        this.options = [];
        this.variants = [];
        this.uploadedFiles = [];
        this.currencyID = 0;
        this.showForm = false;
        this.productId = 0;
        this.isShow = false;
        var result = null;
        this.route.params
            .pipe(operators_1.switchMap(function (param) {
            _this.productId = param['id'];
            _this.isShow = param['type'] === 'display';
            var user = userState.user();
            var strategy = userState.strategy();
            if (user && user.userId && strategy) {
                return rxjs_1.forkJoin({
                    company: strategy.getById(),
                    collection: collectionManagement.getAll({ first: 0, rows: 1000 }, user.userId),
                    categories: categoryManagement.getAll({ first: 0, rows: 1000 }),
                    product: productManagement.getOne(_this.productId)
                });
            }
            else {
                return rxjs_1.of(null);
            }
        }), operators_1.switchMap(function (res) {
            var _a;
            if (res) {
                if ('currencyId' in res.company.data) {
                    _this.currencyID = res.company.data.currencyId;
                }
                _this.objs = [
                    {
                        key: 'ProductName',
                        value: res.product.data.productName,
                        label: 'الاسم',
                        dataType: 'string',
                        required: true,
                        visible: true,
                        options: []
                    },
                    {
                        key: 'ProductDescription',
                        value: res.product.data.productDescription,
                        label: 'الوصف',
                        dataType: 'editor',
                        required: true,
                        visible: true,
                        options: []
                    },
                    {
                        key: 'CollectionIDs',
                        value: res.product.data.collectionIDs.map(function (x) { return x.toString(); }),
                        label: 'المجموعات',
                        dataType: 'MultiSelect',
                        required: true,
                        visible: true,
                        options: res.collection.data.map(function (x) { return ({ id: x.id.toString(), name: x.name }); })
                    },
                    {
                        key: 'CategorieIDs',
                        value: res.product.data.categorieIDs.map(function (x) { return x.toString(); }),
                        label: 'التصنيف',
                        dataType: 'MultiSelect',
                        required: true,
                        visible: true,
                        options: res.categories.data.map(function (x) { return ({ id: x.id.toString(), name: x.name }); })
                    },
                ];
                _this.form.setValue({
                    productName: res.product.data.productName,
                    productDescription: res.product.data.productDescription,
                    CollectionIDs: res.product.data.collectionIDs.map(function (x) { return x.toString(); }),
                    CategorieIDs: res.product.data.categorieIDs.map(function (x) { return x.toString(); })
                });
                result = res.product.data;
                return _this.fileSrv.getImages((_a = res.product.data.productImages) !== null && _a !== void 0 ? _a : []);
            }
            else {
                return rxjs_1.of(null);
            }
        }), operators_1.switchMap(function (res) {
            var _a;
            if (res && typeof res !== 'boolean') {
                _this.uploadedFiles = res; // assign to <p-fileupload> if needed
                _this.options = (_a = result === null || result === void 0 ? void 0 : result.options) !== null && _a !== void 0 ? _a : [];
                // const filesNames = result?.productImages?.map((x: string) => {
                //   const sections = x.split('/');
                //   return sections[sections.length - 1];
                // });
                // result?.variants.forEach((variant) => {
                //   variant.variantImages = variant.variantImages?.filter((img) => filesNames?.includes(img));
                // });
                return rxjs_1.of(true);
            }
            return rxjs_1.of(false);
        }))
            .subscribe(function (res) {
            var _a, _b;
            _this.variants = (_a = result === null || result === void 0 ? void 0 : result.variants) !== null && _a !== void 0 ? _a : [];
            _this.options = (_b = result === null || result === void 0 ? void 0 : result.options) !== null && _b !== void 0 ? _b : [];
            _this.showForm = true;
        });
    }
    ProdManagementDetailComponent.prototype.getControl = function (name) {
        return this.form.get(name);
    };
    ProdManagementDetailComponent.prototype.onImgError = function (event) {
        var img = event.target;
        img.src = 'productIcon.svg'; // 👈 your fallback image
    };
    ProdManagementDetailComponent.prototype.onSelect = function (event) {
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
    ProdManagementDetailComponent.prototype.onRemove = function (event) {
        var _this = this;
        var index = this.uploadedFiles.findIndex(function (x) { return x.name === event.file.name; });
        if (index > -1) {
            this.variants = this.variants.map(function (variant) {
                var _a;
                variant.variantImages = (_a = variant.variantImages) === null || _a === void 0 ? void 0 : _a.filter(function (img) { return img !== _this.uploadedFiles[index].name; });
                return variant;
            });
            this.uploadedFiles.splice(index, 1);
        }
    };
    ProdManagementDetailComponent.prototype.addOptionName = function (input) {
        this.options.push({ optionName: input.value, values: [] });
        input.value = null;
    };
    ProdManagementDetailComponent.prototype.addOptionValue = function (input, optionIndex) {
        this.options[optionIndex].values.push({ valueName: input.value });
        input.value = null;
    };
    ProdManagementDetailComponent.prototype.removeOptionValue = function (optionIndex, valueIndex) {
        this.options[optionIndex].values.splice(valueIndex, 1);
    };
    ProdManagementDetailComponent.prototype.removeOption = function (optionIndex) {
        this.options.splice(optionIndex, 1);
    };
    ProdManagementDetailComponent.prototype.generateVariants = function () {
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
    ProdManagementDetailComponent.prototype.openVariantPanel = function (event) {
        if (event.index === '2') {
            this.variants = this.generateVariants();
        }
    };
    ProdManagementDetailComponent.prototype.checkVariantPanel = function () {
        return (this.form.invalid || this.options.length === 0 || this.options.filter(function (opt) { return opt.values.length === 0; }).length > 0);
    };
    ProdManagementDetailComponent.prototype.saveProduct = function () {
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
            this.productManagement.edit(this.productId, product, this.uploadedFiles).subscribe(function (res) {
                _this.msgSrv.showMessage(res.message, res.succeeded);
                if (res.succeeded)
                    _this.router.navigate(['company/product-management/show']);
            });
        }
        else {
            this.msgSrv.showError('يجب ان ينتمي لكل تشكيل صور خاصة به من ضمن صور المنتج');
        }
    };
    __decorate([
        core_1.ViewChild('fu')
    ], ProdManagementDetailComponent.prototype, "fu");
    ProdManagementDetailComponent = __decorate([
        core_1.Component({
            selector: 'prod-management-detail',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, dynamic_input_component_1.DynamicInputComponent, forms_1.FormsModule],
            templateUrl: './prod-management-detail.component.html',
            styleUrl: './prod-management-detail.component.scss'
        })
    ], ProdManagementDetailComponent);
    return ProdManagementDetailComponent;
}());
exports.ProdManagementDetailComponent = ProdManagementDetailComponent;
