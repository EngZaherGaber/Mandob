"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanyReqManagementShowComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var dynamic_table_component_1 = require("../../../../shared/components/dynamic-table/dynamic-table.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var CompanyReqManagementShowComponent = /** @class */ (function () {
    function CompanyReqManagementShowComponent(tableSrv, route, msgSrv, confirmationService, distributorManagement, userState, companyRequestSrv) {
        var _this = this;
        this.route = route;
        this.msgSrv = msgSrv;
        this.confirmationService = confirmationService;
        this.distributorManagement = distributorManagement;
        this.userState = userState;
        this.companyRequestSrv = companyRequestSrv;
        this.isWaiting = false;
        this.selectedRequest = core_1.signal(null);
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
                field: 'status',
                header: 'الحالة',
                headerType: 'tag'
            },
        ];
        this.distributors = [];
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
        this.assignDistributorVisible = false;
        this.assignDistributorFunc = function (rowData) {
            _this.selectedRequest.set(rowData);
            _this.assignDistributorVisible = true;
        };
        this.rejectFunc = function (rowData) {
            _this.confirmationService.confirm({
                message: 'هل تريد رفض هذه الطلبية؟',
                header: 'رفض',
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
                    _this.companyRequestSrv.reject(rowData.requestID).subscribe(function (res) {
                        _this.msgSrv.showMessage(res.message, res.succeeded);
                        if (res.succeeded)
                            _this.tableConfig.getSub$.next({});
                    });
                }
            });
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
        this.tableConfig = tableSrv.getStandardInfo(undefined, undefined, undefined, undefined);
        this.route.paramMap
            .pipe(rxjs_1.switchMap(function (paramMap) {
            var _a, _b;
            _this.isWaiting = paramMap.get('type') === 'waiting';
            _this.tableConfig.get$ = _this.tableConfig.getSub$.pipe(rxjs_1.switchMap(function (body) {
                if (body) {
                    return _this.companyRequestSrv.getAll(_this.isWaiting, body).pipe(rxjs_1.switchMap(function (res) {
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
                return _this.distributorManagement.getAll({ rows: 5000, first: 0 }, (_b = (_a = _this.userState.user()) === null || _a === void 0 ? void 0 : _a.userId) !== null && _b !== void 0 ? _b : 0);
            else
                return rxjs_1.of(null);
        }))
            .subscribe(function (res) {
            _this.tableConfig.Buttons = [
                {
                    isShow: false,
                    tooltip: 'اسناد موزع',
                    showCommand: function (rowData) {
                        return rowData.status === 'قيد المراجعة';
                    },
                    icon: 'pi pi-truck',
                    key: 'Edit',
                    severity: 'contrast',
                    command: function (rowData) {
                        _this.assignDistributorFunc(rowData);
                    }
                },
                {
                    isShow: false,
                    showCommand: function (rowData) {
                        return rowData.status !== 'تم التوصيل' && _this.isWaiting;
                    },
                    tooltip: 'رفض',
                    icon: 'pi pi-times',
                    key: 'reject',
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
            if (res) {
                _this.distributors = res.data;
            }
            _this.tableConfig.getSub$.next({});
        });
    }
    CompanyReqManagementShowComponent.prototype.onRowExapnd = function (event) {
        console.log(event.requestItems);
    };
    CompanyReqManagementShowComponent.prototype.assignDistributor = function (value) {
        var _this = this;
        var req = this.selectedRequest();
        if (req && value) {
            this.companyRequestSrv.assignDistributor({ requestId: req.requestID, distributorId: value }).subscribe(function (res) {
                _this.msgSrv.showMessage(res.message, res.succeeded);
                _this.assignDistributorVisible = false;
                _this.tableConfig.getSub$.next({});
            });
        }
    };
    CompanyReqManagementShowComponent.prototype.clostReturnDialog = function (event) {
        if (!event)
            this.selectedRequest.set(null);
    };
    CompanyReqManagementShowComponent = __decorate([
        core_1.Component({
            selector: 'app-company-req-management-show',
            imports: [dynamic_table_component_1.DynamicTableComponent, primeng_shared_module_1.PrimeNgSharedModule],
            templateUrl: './company-req-management-show.component.html',
            styleUrl: './company-req-management-show.component.scss'
        })
    ], CompanyReqManagementShowComponent);
    return CompanyReqManagementShowComponent;
}());
exports.CompanyReqManagementShowComponent = CompanyReqManagementShowComponent;
