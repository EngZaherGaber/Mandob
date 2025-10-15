"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DistributorManagementShowComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var company_strategy_1 = require("../../../../company/classes/company-strategy");
var dynamic_input_component_1 = require("../../../../shared/components/dynamic-input/dynamic-input.component");
var dynamic_view_component_1 = require("../../../../shared/components/dynamic-view/dynamic-view.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var DistributorManagementShowComponent = /** @class */ (function () {
    function DistributorManagementShowComponent(tableSrv, userState, msgSrv, route, router, confirmationService, distributorManagement) {
        var _this = this;
        this.tableSrv = tableSrv;
        this.userState = userState;
        this.msgSrv = msgSrv;
        this.route = route;
        this.router = router;
        this.confirmationService = confirmationService;
        this.distributorManagement = distributorManagement;
        this.type = '';
        this.columns = [
            {
                field: 'isActive',
                header: 'فعال',
                headerType: 'toggle'
            },
            {
                field: 'name',
                header: 'الاسم',
                headerType: 'string'
            },
            {
                field: 'email',
                header: 'الايميل',
                headerType: 'string'
            },
            {
                field: 'phoneNumber',
                header: 'رقم الهاتف',
                headerType: 'string'
            },
        ];
        this.columnsEvent = [
            {
                field: 'isActive',
                command: function (event, field, rowData) {
                    _this.changeState(rowData);
                }
            },
        ];
        this.step = 1;
        this.resetDialogVisible = false;
        this.form = new forms_1.FormGroup({
            userId: new forms_1.FormControl(null),
            adminPassword: new forms_1.FormControl(null),
            newPassword: new forms_1.FormControl(null)
        });
        this.objs = [
            {
                key: 'newPassword',
                value: null,
                label: 'كلمة السر الجديدة',
                dataType: 'string',
                required: true,
                visible: true,
                options: []
            },
            {
                key: 'adminPassword',
                value: null,
                label: 'كلمة سر المدير',
                dataType: 'string',
                required: true,
                visible: true,
                options: []
            },
        ];
        this.changeState = function (rowData) {
            _this.confirmationService.confirm({
                message: 'هل تريد تغيير حالة هذا المستخدم؟',
                header: 'تغيير حالة المستخدم',
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
                    _this.distributorManagement.changeStatus(rowData.userId).subscribe(function (res) {
                        _this.msgSrv.showMessage(res.message, res.succeeded);
                        if (res.succeeded) {
                            _this.tableConfig.getSub$.next({});
                        }
                    });
                }
            });
        };
        this.deleteFunc = function (rowData) {
            _this.confirmationService.confirm({
                message: 'هل تريد حذف هذا المستخدم؟',
                header: 'حذف المستخدم',
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
                    _this.distributorManagement["delete"](rowData.userId).subscribe(function (res) {
                        _this.msgSrv.showMessage(res.message, res.succeeded);
                        if (res.succeeded) {
                            _this.tableConfig.getSub$.next({});
                        }
                    });
                }
            });
        };
        this.addFunc = function () {
            _this.router.navigate(['company/distributor-management/add']);
        };
        this.editFunc = function (rowData) {
            _this.router.navigate(['company/distributor-management/detail/edit/' + rowData.userId]);
        };
        this.displayFunc = function (rowData) {
            _this.router.navigate(['company/distributor-management/detail/display/' + rowData.userId]);
        };
        this.resetFunc = function (rowData) {
            _this.getControl('userId').setValue(rowData.userId);
            _this.resetDialogVisible = true;
        };
        this.tableConfig = tableSrv.getStandardInfo(this.deleteFunc, this.editFunc, this.displayFunc, this.addFunc);
        this.route.params.subscribe(function (param) {
            _this.type = param['type'];
            _this.tableConfig.get$ = _this.tableConfig.getSub$.pipe(rxjs_1.switchMap(function (body) {
                var user = userState.user();
                if (body && (user === null || user === void 0 ? void 0 : user.userId)) {
                    return _this.distributorManagement.getAll(body, user.userId).pipe(rxjs_1.switchMap(function (res) {
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
        });
    }
    DistributorManagementShowComponent.prototype.getControl = function (name) {
        return this.form.get(name);
    };
    DistributorManagementShowComponent.prototype.resetPassword = function () {
        var _this = this;
        var strategy = this.userState.strategy();
        if (strategy instanceof company_strategy_1.CompanyStrategy) {
            strategy.resetPasswordAdmin(this.form.getRawValue()).subscribe(function (res) {
                _this.msgSrv.showSuccess(res.message);
                if (res.succeeded)
                    _this.resetDialogVisible = false;
            });
        }
    };
    DistributorManagementShowComponent = __decorate([
        core_1.Component({
            selector: 'distributor-management-show',
            imports: [dynamic_view_component_1.DynamicViewComponent, primeng_shared_module_1.PrimeNgSharedModule, dynamic_input_component_1.DynamicInputComponent],
            templateUrl: './distributor-management-show.component.html',
            styleUrl: './distributor-management-show.component.scss'
        })
    ], DistributorManagementShowComponent);
    return DistributorManagementShowComponent;
}());
exports.DistributorManagementShowComponent = DistributorManagementShowComponent;
