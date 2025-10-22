"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientReqManagementShowComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var product_general_items_component_1 = require("../../../../general/components/product-general-items/product-general-items.component");
var prod_general_list_component_1 = require("../../../../product/components/product-general/prod-general-list/prod-general-list.component");
var review_submit_component_1 = require("../../../../review/components/review-submit/review-submit.component");
var dynamic_input_component_1 = require("../../../../shared/components/dynamic-input/dynamic-input.component");
var dynamic_table_component_1 = require("../../../../shared/components/dynamic-table/dynamic-table.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var ClientReqManagementShowComponent = /** @class */ (function () {
    function ClientReqManagementShowComponent(tableSrv, route, clientRequestSrv, msgSrv, confirmationService, clientReturnSrv) {
        var _this = this;
        var _a, _b;
        this.route = route;
        this.clientRequestSrv = clientRequestSrv;
        this.msgSrv = msgSrv;
        this.confirmationService = confirmationService;
        this.clientReturnSrv = clientReturnSrv;
        this.isWaiting = false;
        this.selectedRequest = core_1.signal(null);
        this.items = core_1.computed(function () {
            var source = _this.selectedRequest();
            if (source) {
                return source.requestItems.map(function (x) {
                    return {
                        variantName: x.variantName,
                        quantity: x.quantity,
                        originalPrice: x.originalPrice,
                        totalFinalPrice: x.totalFinalPrice,
                        finalPrice: x.finalPrice
                    };
                });
            }
            return [];
        });
        this.columns = [
            {
                field: 'requestDate',
                header: 'تاريخ الطلبية',
                headerType: 'datetime'
            },
            {
                field: 'distributorName',
                header: 'الموزع',
                headerType: 'string'
            },
            {
                field: 'companyName',
                header: 'الشركة',
                headerType: 'string'
            },
            {
                field: 'status',
                header: 'الحالة',
                headerType: 'tag'
            },
            {
                field: 'isReviewed',
                header: 'تم تقييمه',
                headerType: 'bool'
            },
        ];
        this.objs = [
            {
                key: 'requestItemID',
                label: 'الاسم',
                value: null,
                dataType: 'list',
                required: true,
                visible: false,
                options: (_b = (_a = this.selectedRequest()) === null || _a === void 0 ? void 0 : _a.requestItems.map(function (x) { return ({ id: x.requestItemID, name: x.variantName }); })) !== null && _b !== void 0 ? _b : []
            },
            {
                key: 'variantName',
                label: 'المنتج',
                value: null,
                dataType: 'string',
                required: true,
                visible: true,
                options: []
            },
            {
                key: 'quantityToReturn',
                label: 'كمية المرتجع',
                value: null,
                dataType: 'int',
                required: true,
                visible: true,
                options: []
            },
            {
                key: 'reason',
                label: 'السبب',
                value: null,
                dataType: 'string',
                required: true,
                visible: true,
                options: []
            },
        ];
        this.controlArray = core_1.computed(function () {
            var _a;
            var arr = (_a = _this.selectedRequest()) === null || _a === void 0 ? void 0 : _a.requestItems.map(function (x) {
                var requestItemIDControl = new forms_1.FormControl(x.requestItemID);
                var variantNameControl = new forms_1.FormControl(x.variantName);
                variantNameControl.disable();
                var quantityToReturnControl = new forms_1.FormControl(0);
                var reasonControl = new forms_1.FormControl('');
                var group = new forms_1.FormGroup({
                    requestItemID: requestItemIDControl,
                    variantName: variantNameControl,
                    quantityToReturn: quantityToReturnControl,
                    reason: reasonControl
                });
                return group;
            });
            if (arr) {
                return new forms_1.FormArray(arr);
            }
            return new forms_1.FormArray([]);
        });
        this.getSeverity = function (rowData) {
            switch (rowData.status) {
                case 'قيد المراجعة':
                    return 'contrast';
                case 'جار تحضير الطلب':
                case 'قيد التوصيل':
                case 'تم التاكيد':
                    return 'info';
                case 'مرفوض':
                case 'ملغى':
                    return 'danger';
                default:
                    return 'success';
            }
        };
        this.returnVisible = false;
        this.returnFunc = function (rowData) {
            _this.selectedRequest.set(rowData);
            _this.returnVisible = true;
        };
        this.itemsVisible = false;
        this.showItemsFunc = function (rowData) {
            _this.selectedRequest.set(rowData);
            _this.itemsVisible = true;
        };
        this.usersVisible = false;
        this.showUsersFunc = function (rowData) {
            _this.selectedRequest.set(rowData);
            _this.usersVisible = true;
        };
        this.completeFunc = function (rowData) {
            _this.confirmationService.confirm({
                message: 'هل تم الانتهاء من العملية؟',
                header: 'اكتمال',
                icon: 'pi pi-info-circle',
                rejectLabel: 'الغاء',
                rejectButtonProps: {
                    label: 'الغاء',
                    severity: 'secondary',
                    outlined: true
                },
                acceptButtonProps: {
                    label: 'تأكييد',
                    severity: 'success'
                },
                accept: function () {
                    _this.clientRequestSrv.complete(rowData.requestID).subscribe(function (res) {
                        _this.msgSrv.showMessage(res.message, res.succeeded);
                        if (res.succeeded)
                            _this.tableConfig.getSub$.next({});
                    });
                }
            });
        };
        this.cancelFunc = function (rowData) {
            _this.confirmationService.confirm({
                message: 'هل تريد الغاء الطلبية؟',
                header: 'اكتمال',
                icon: 'pi pi-info-circle',
                rejectLabel: 'الغاء',
                rejectButtonProps: {
                    label: 'الغاء',
                    severity: 'secondary',
                    outlined: true
                },
                acceptButtonProps: {
                    label: 'تأكييد',
                    severity: 'danger'
                },
                accept: function () {
                    _this.clientRequestSrv.cancel(rowData.requestID).subscribe(function (res) {
                        _this.msgSrv.showMessage(res.message, res.succeeded);
                        if (res.succeeded)
                            _this.tableConfig.getSub$.next({});
                    });
                }
            });
        };
        this.reviewVisible = false;
        this.showReviewFunc = function (rowData) {
            _this.selectedRequest.set(rowData);
            _this.reviewVisible = true;
        };
        this.tableConfig = tableSrv.getStandardInfo(undefined, undefined, undefined, undefined);
        this.route.paramMap
            .pipe(rxjs_1.switchMap(function (paramMap) {
            _this.isWaiting = paramMap.get('type') === 'waiting';
            _this.tableConfig.get$ = _this.tableConfig.getSub$.pipe(rxjs_1.switchMap(function (body) {
                if (body) {
                    return _this.clientRequestSrv.getAll(_this.isWaiting, body).pipe(rxjs_1.switchMap(function (res) {
                        return rxjs_1.of({
                            data: res.data,
                            columns: _this.columns,
                            loading: false,
                            count: res.count
                        });
                    }), rxjs_1.catchError(function () { return rxjs_1.of({ loading: false, data: [], columns: _this.columns }); }));
                }
                return rxjs_1.of({ loading: false, data: [], columns: _this.columns });
            }));
            return rxjs_1.of(null);
        }), rxjs_1.switchMap(function (res) {
            _this.tableConfig.Buttons = [
                {
                    isShow: false,
                    showCommand: function (rowData) {
                        return rowData.status === 'مكتمل' && !_this.isWaiting && !rowData.reviews;
                    },
                    tooltip: 'اجراء تقييم',
                    icon: 'pi pi-comment',
                    key: 'review',
                    severity: 'contrast',
                    command: function (rowData) {
                        _this.showReviewFunc(rowData);
                    }
                },
                {
                    isShow: false,
                    showCommand: function (rowData) {
                        return rowData.status === 'مكتمل' && !_this.isWaiting;
                    },
                    tooltip: 'ارجاع',
                    icon: 'pi pi-arrow-circle-left',
                    key: 'Edit',
                    severity: 'contrast',
                    command: function (rowData) {
                        _this.returnFunc(rowData);
                    }
                },
                {
                    isShow: false,
                    showCommand: function (rowData) {
                        return rowData.status === 'قيد المراجعة' && _this.isWaiting;
                    },
                    tooltip: 'الغاء الطلب',
                    icon: 'pi pi-times',
                    key: 'cancel',
                    severity: 'contrast',
                    command: function (rowData) {
                        _this.cancelFunc(rowData);
                    }
                },
                {
                    isShow: false,
                    showCommand: function (rowData) {
                        return rowData.status === 'تم التوصيل' && _this.isWaiting;
                    },
                    tooltip: 'اكتمال',
                    icon: 'pi pi-check',
                    key: 'Edit',
                    severity: 'contrast',
                    command: function (rowData) {
                        _this.completeFunc(rowData);
                    }
                },
                {
                    isShow: true,
                    tooltip: 'المنتجات',
                    icon: 'pi pi-box',
                    key: 'show',
                    severity: 'contrast',
                    command: function (rowData) {
                        _this.showItemsFunc(rowData);
                    }
                },
                {
                    isShow: true,
                    tooltip: 'المستخدمين',
                    icon: 'pi pi-users',
                    key: 'users',
                    severity: 'contrast',
                    command: function (rowData) {
                        _this.showUsersFunc(rowData);
                    }
                },
            ];
            _this.tableConfig.getSub$.next({});
            return rxjs_1.of(null);
        }))
            .subscribe(function (res) { });
    }
    ClientReqManagementShowComponent.prototype.getControl = function (index, key) {
        return this.controlArray().controls[index].controls[key];
    };
    ClientReqManagementShowComponent.prototype["return"] = function () {
        var _this = this;
        var _a, _b;
        if (this.selectedRequest()) {
            var arr = this.controlArray()
                .getRawValue()
                .map(function (x) { return ({ requestItemID: x.requestItemID, quantityToReturn: x.quantityToReturn, reason: x.reason }); });
            var newArr = arr.flat().filter(function (x) { return x.quantityToReturn !== 0; });
            var body = { requestID: (_b = (_a = this.selectedRequest()) === null || _a === void 0 ? void 0 : _a.requestID) !== null && _b !== void 0 ? _b : 0, itemsToReturn: arr };
            this.clientReturnSrv.create(body).subscribe(function (res) {
                _this.msgSrv.showMessage(res.message, res.succeeded);
                _this.returnVisible = false;
                _this.tableConfig.getSub$.next({});
            });
        }
    };
    ClientReqManagementShowComponent.prototype.clostReturnDialog = function (event) {
        if (!event)
            this.selectedRequest.set(null);
    };
    ClientReqManagementShowComponent = __decorate([
        core_1.Component({
            selector: 'app-client-req-management-show',
            imports: [
                dynamic_table_component_1.DynamicTableComponent,
                primeng_shared_module_1.PrimeNgSharedModule,
                dynamic_input_component_1.DynamicInputComponent,
                review_submit_component_1.ReviewSubmitComponent,
                product_general_items_component_1.ProductGeneralItemsComponent,
                prod_general_list_component_1.ProdGeneralListComponent,
            ],
            templateUrl: './client-req-management-show.component.html',
            styleUrl: './client-req-management-show.component.scss'
        })
    ], ClientReqManagementShowComponent);
    return ClientReqManagementShowComponent;
}());
exports.ClientReqManagementShowComponent = ClientReqManagementShowComponent;
