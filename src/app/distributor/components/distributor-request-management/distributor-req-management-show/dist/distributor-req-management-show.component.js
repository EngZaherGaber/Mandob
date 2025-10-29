"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DistributorReqManagementShowComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var product_general_items_component_1 = require("../../../../general/components/product-general-items/product-general-items.component");
var users_general_items_component_1 = require("../../../../general/components/users-general-items/users-general-items.component");
var review_detail_component_1 = require("../../../../review/components/review-detail/review-detail.component");
var dynamic_table_component_1 = require("../../../../shared/components/dynamic-table/dynamic-table.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var DistributorReqManagementShowComponent = /** @class */ (function () {
    function DistributorReqManagementShowComponent(tableSrv, route, msgSrv, confirmationService, userState, distributorRequestSrv) {
        var _this = this;
        this.route = route;
        this.msgSrv = msgSrv;
        this.confirmationService = confirmationService;
        this.userState = userState;
        this.distributorRequestSrv = distributorRequestSrv;
        this.isWaiting = false;
        this.selectedRequest = core_1.signal(null);
        this.selectedRequestStatus = null;
        this.columns = [
            {
                field: 'requestDate',
                header: 'تاريخ الطلبية',
                headerType: 'datetime'
            },
            {
                field: 'clientName',
                header: 'الزبون',
                headerType: 'string'
            },
            {
                field: 'companyName',
                header: 'الشركة',
                headerType: 'string'
            },
            {
                field: 'expectedDeliveryDate',
                header: 'التاريخ المتوقع للوصول',
                headerType: 'datetime'
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
        this.getSeverity = function (rowData) {
            switch (rowData.status) {
                case 'قيد المراجعة':
                    return 'warn';
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
        this.changeStatusVisible = false;
        this.status = [
            { id: 4, name: 'جار تحضير الطلب' },
            { id: 5, name: 'قيد التوصيل' },
            { id: 6, name: 'تم التوصيل' },
        ];
        this.changeStatusFunc = function (rowData) {
            var _a, _b;
            _this.selectedRequest.set(rowData);
            _this.selectedRequestStatus = (_b = (_a = _this.status.find(function (x) { return x.name === rowData.status; })) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null;
            _this.changeStatusVisible = true;
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
                    return _this.distributorRequestSrv.getAll(_this.isWaiting, body).pipe(rxjs_1.switchMap(function (res) {
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
            if (_this.isWaiting)
                return rxjs_1.of(_this.status);
            else
                return rxjs_1.of(null);
        }))
            .subscribe(function (res) {
            if (res) {
                _this.status = res;
                _this.tableConfig.Buttons = [
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
                    {
                        isShow: false,
                        showCommand: function (rowData) {
                            return _this.isWaiting && rowData.status !== 'تم التوصيل';
                        },
                        tooltip: 'تغيير حالة',
                        icon: 'pi pi-pencil',
                        key: 'Edit',
                        severity: 'contrast',
                        command: function (rowData) {
                            _this.changeStatusFunc(rowData);
                        }
                    },
                    {
                        isShow: false,
                        showCommand: function (rowData) {
                            return rowData.status === 'مكتمل' && !_this.isWaiting && !!rowData.reviews;
                        },
                        tooltip: 'تقييم الزبون',
                        icon: 'pi pi-comment',
                        key: 'review',
                        severity: 'contrast',
                        command: function (rowData) {
                            _this.showReviewFunc(rowData);
                        }
                    },
                ];
            }
            _this.tableConfig.getSub$.next({});
        });
    }
    DistributorReqManagementShowComponent.prototype.changeStatus = function (value) {
        var _this = this;
        var req = this.selectedRequest();
        if (value && req) {
            this.distributorRequestSrv.changeStatus(req.requestID, value).subscribe(function (res) {
                _this.msgSrv.showMessage(res.message, res.succeeded);
                _this.changeStatusVisible = false;
                _this.tableConfig.getSub$.next({});
            });
        }
    };
    DistributorReqManagementShowComponent.prototype.clostReturnDialog = function (event) {
        if (!event)
            this.selectedRequest.set(null);
    };
    DistributorReqManagementShowComponent = __decorate([
        core_1.Component({
            selector: 'app-distributor-req-management-show',
            imports: [
                dynamic_table_component_1.DynamicTableComponent,
                primeng_shared_module_1.PrimeNgSharedModule,
                review_detail_component_1.ReviewDetailComponent,
                forms_1.FormsModule,
                product_general_items_component_1.ProductGeneralItemsComponent,
                users_general_items_component_1.UsersGeneralItemsComponent,
            ],
            templateUrl: './distributor-req-management-show.component.html',
            styleUrl: './distributor-req-management-show.component.scss'
        })
    ], DistributorReqManagementShowComponent);
    return DistributorReqManagementShowComponent;
}());
exports.DistributorReqManagementShowComponent = DistributorReqManagementShowComponent;
