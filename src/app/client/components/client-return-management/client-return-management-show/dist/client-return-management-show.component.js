"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientReturnManagementShowComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var product_general_items_component_1 = require("../../../../general/components/product-general-items/product-general-items.component");
var dynamic_table_component_1 = require("../../../../shared/components/dynamic-table/dynamic-table.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var ClientReturnManagementShowComponent = /** @class */ (function () {
    function ClientReturnManagementShowComponent(tableSrv, route, msgSrv, confirmationService, clientReturnSrv) {
        var _this = this;
        this.route = route;
        this.msgSrv = msgSrv;
        this.confirmationService = confirmationService;
        this.clientReturnSrv = clientReturnSrv;
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
        this.usersVisible = false;
        this.showUsersFunc = function (rowData) {
            _this.selectedReturn.set(rowData);
            _this.usersVisible = true;
        };
        this.cancelFunc = function (rowData) {
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
                    _this.clientReturnSrv.cancel(rowData.returnRequestID).subscribe(function (res) {
                        _this.msgSrv.showMessage(res.message, res.succeeded);
                        if (res.succeeded)
                            _this.tableConfig.getSub$.next({});
                    });
                }
            });
        };
        this.tableConfig = tableSrv.getStandardInfo(undefined, undefined, undefined, undefined);
        this.route.paramMap
            .pipe(rxjs_1.switchMap(function (paramMap) {
            var requestIdString = paramMap.get('requestId');
            _this.requestId = requestIdString ? +requestIdString : null;
            _this.tableConfig.get$ = _this.tableConfig.getSub$.pipe(rxjs_1.switchMap(function (body) {
                if (body) {
                    return _this.clientReturnSrv.getAll(_this.requestId, body).pipe(rxjs_1.switchMap(function (res) {
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
        }))
            .subscribe(function (res) {
            _this.tableConfig.Buttons[_this.tableConfig.Buttons.length] = {
                isShow: true,
                tooltip: 'المنتجات',
                icon: 'pi pi-box',
                key: 'show',
                severity: 'contrast',
                command: function (rowData) {
                    _this.showItemsFunc(rowData);
                }
            };
            _this.tableConfig.Buttons[_this.tableConfig.Buttons.length] = {
                isShow: true,
                tooltip: 'المستخدمين',
                icon: 'pi pi-users',
                key: 'users',
                severity: 'contrast',
                command: function (rowData) {
                    _this.showUsersFunc(rowData);
                }
            };
            _this.tableConfig.getSub$.next({});
        });
    }
    ClientReturnManagementShowComponent.prototype.clostReturnDialog = function (event) {
        if (!event)
            this.selectedReturn.set(null);
    };
    ClientReturnManagementShowComponent = __decorate([
        core_1.Component({
            selector: 'app-client-return-management-show',
            imports: [dynamic_table_component_1.DynamicTableComponent, primeng_shared_module_1.PrimeNgSharedModule, product_general_items_component_1.ProductGeneralItemsComponent],
            templateUrl: './client-return-management-show.component.html',
            styleUrl: './client-return-management-show.component.scss'
        })
    ], ClientReturnManagementShowComponent);
    return ClientReturnManagementShowComponent;
}());
exports.ClientReturnManagementShowComponent = ClientReturnManagementShowComponent;
