"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompReturnManagementShowComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var product_general_items_component_1 = require("../../../../general/components/product-general-items/product-general-items.component");
var users_general_items_component_1 = require("../../../../general/components/users-general-items/users-general-items.component");
var dynamic_table_component_1 = require("../../../../shared/components/dynamic-table/dynamic-table.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var CompReturnManagementShowComponent = /** @class */ (function () {
    function CompReturnManagementShowComponent(tableSrv, route, msgSrv, userState, distributorManagement, companyReturnSrv) {
        var _this = this;
        this.route = route;
        this.msgSrv = msgSrv;
        this.userState = userState;
        this.distributorManagement = distributorManagement;
        this.companyReturnSrv = companyReturnSrv;
        this.requestId = null;
        this.selectedReturn = core_1.signal(null);
        this.items = core_1.computed(function () {
            var source = _this.selectedReturn();
            if (source) {
                return source.items.map(function (x) {
                    var _a;
                    return {
                        variantName: x.variantName,
                        quantity: x.quantity,
                        reason: (_a = x.reason) !== null && _a !== void 0 ? _a : ' ',
                        originalPrice: x.refundPricePerUnit,
                        totalFinalPrice: x.totalItemRefundAmount,
                        finalPrice: x.totalItemRefundAmount
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
                field: 'clientName',
                header: 'الزبون',
                headerType: 'string'
            },
            {
                field: 'distributorName',
                header: 'الموزع',
                headerType: 'string'
            },
            {
                field: 'returnStatusName',
                header: 'الحالة',
                headerType: 'tag'
            },
            {
                field: 'requestDate',
                header: 'تاريخ',
                headerType: 'datetime'
            },
            {
                field: 'totalRefundAmount',
                header: 'مبلغ الارجاع',
                headerType: 'float'
            },
            {
                field: 'notes',
                header: 'ملاحظة',
                headerType: 'string'
            },
        ];
        this.getSeverity = function (rowData) {
            switch (rowData.returnStatusName) {
                case 'قيد المراجعة':
                    return 'secondary';
                case 'تمت الموافقة':
                    return 'info';
                case 'مرفوض':
                case 'ملغى':
                    return 'danger';
                default:
                    return 'success';
            }
        };
        this.itemsVisible = false;
        this.showItemsFunc = function (rowData) {
            _this.selectedReturn.set(rowData);
            _this.itemsVisible = true;
        };
        this.rejectVisible = false;
        this.rejectFunc = function (rowData) {
            _this.selectedReturn.set(rowData);
            _this.rejectVisible = true;
        };
        this.usersVisible = false;
        this.showUsersFunc = function (rowData) {
            _this.selectedReturn.set(rowData);
            _this.usersVisible = true;
        };
        this.distributors = [];
        this.assignDistributorVisible = false;
        this.assignDistributorFunc = function (rowData) {
            _this.selectedReturn.set(rowData);
            _this.assignDistributorVisible = true;
        };
        this.tableConfig = tableSrv.getStandardInfo(undefined, undefined, undefined, undefined);
        this.route.paramMap
            .pipe(rxjs_1.switchMap(function (paramMap) {
            var _a, _b;
            var requestIdString = paramMap.get('requestId');
            _this.requestId = requestIdString ? +requestIdString : null;
            _this.tableConfig.get$ = _this.tableConfig.getSub$.pipe(rxjs_1.switchMap(function (body) {
                if (body) {
                    return _this.companyReturnSrv.getAll(_this.requestId, body).pipe(rxjs_1.switchMap(function (res) {
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
            return _this.distributorManagement.getAll({ rows: 5000, first: 0 }, (_b = (_a = _this.userState.user()) === null || _a === void 0 ? void 0 : _a.userId) !== null && _b !== void 0 ? _b : 0);
        }))
            .subscribe(function (res) {
            _this.tableConfig.Buttons = [
                {
                    isShow: false,
                    showCommand: function (rowData) {
                        return rowData.returnStatusName === 'قيد المراجعة';
                    },
                    tooltip: 'موافقة',
                    icon: 'pi pi-check',
                    key: 'show',
                    severity: 'contrast',
                    command: function (rowData) {
                        _this.assignDistributorFunc(rowData);
                    }
                },
                {
                    isShow: false,
                    showCommand: function (rowData) {
                        return rowData.returnStatusName === 'قيد المراجعة';
                    },
                    tooltip: 'رفض',
                    icon: 'pi pi-times',
                    key: 'show',
                    severity: 'contrast',
                    command: function (rowData) {
                        _this.rejectFunc(rowData);
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
            _this.distributors = res.data;
            _this.tableConfig.getSub$.next({});
        });
    }
    CompReturnManagementShowComponent.prototype.assignDistributor = function (value) {
        var _this = this;
        var req = this.selectedReturn();
        if (req && value) {
            this.companyReturnSrv.approve({ returnRequestId: req.returnRequestID, distributorId: value }).subscribe(function (res) {
                _this.msgSrv.showMessage(res.message, res.succeeded);
                _this.assignDistributorVisible = false;
                _this.tableConfig.getSub$.next({});
            });
        }
    };
    CompReturnManagementShowComponent.prototype.rejectReason = function (value) {
        var _this = this;
        var req = this.selectedReturn();
        if (req && value) {
            this.companyReturnSrv
                .reject({ returnRequestId: req.returnRequestID, rejectionReason: value })
                .subscribe(function (res) {
                _this.msgSrv.showMessage(res.message, res.succeeded);
                _this.rejectVisible = false;
                _this.tableConfig.getSub$.next({});
            });
        }
    };
    CompReturnManagementShowComponent.prototype.clostReturnDialog = function (event) {
        if (!event)
            this.selectedReturn.set(null);
    };
    CompReturnManagementShowComponent = __decorate([
        core_1.Component({
            selector: 'app-comp-return-management-show',
            imports: [dynamic_table_component_1.DynamicTableComponent, primeng_shared_module_1.PrimeNgSharedModule, product_general_items_component_1.ProductGeneralItemsComponent, users_general_items_component_1.UsersGeneralItemsComponent],
            templateUrl: './comp-return-management-show.component.html',
            styleUrl: './comp-return-management-show.component.scss'
        })
    ], CompReturnManagementShowComponent);
    return CompReturnManagementShowComponent;
}());
exports.CompReturnManagementShowComponent = CompReturnManagementShowComponent;
