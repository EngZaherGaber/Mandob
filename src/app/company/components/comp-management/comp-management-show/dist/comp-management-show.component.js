"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompManagementShowComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var owner_strategy_1 = require("../../../../owner/classes/owner-strategy");
var dynamic_input_component_1 = require("../../../../shared/components/dynamic-input/dynamic-input.component");
var dynamic_view_component_1 = require("../../../../shared/components/dynamic-view/dynamic-view.component");
var dynmaic_form_component_1 = require("../../../../shared/components/dynmaic-form/dynmaic-form.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var CompManagementShowComponent = /** @class */ (function () {
    function CompManagementShowComponent(tableSrv, msgSrv, route, router, confirmationService, userState, companyManagement) {
        var _this = this;
        this.msgSrv = msgSrv;
        this.route = route;
        this.router = router;
        this.confirmationService = confirmationService;
        this.userState = userState;
        this.companyManagement = companyManagement;
        this.imageField = '';
        this.type = 'table';
        this.columns = [
            {
                field: 'name',
                header: 'الاسم',
                headerType: 'string'
            },
            {
                field: 'companyDescription',
                header: 'الوصف',
                headerType: 'string'
            },
            {
                field: 'planName',
                header: 'الاشتراك',
                headerType: 'string'
            },
            {
                field: 'planStartDate',
                header: 'بدأ الاشتراك',
                headerType: 'datetime'
            },
            {
                field: 'planEndDate',
                header: 'نهاية الاشتراك',
                headerType: 'datetime'
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
            {
                field: 'address',
                header: 'العنوان',
                headerType: 'string'
            },
            {
                field: 'commercialRegistrationNumber',
                header: 'السجل التجاري',
                headerType: 'string'
            },
            {
                field: 'planStartDate',
                header: 'بداية خطة الاشتراك',
                headerType: 'datetime'
            },
            {
                field: 'planEndDate',
                header: 'نهاية خطة الاشتراك',
                headerType: 'datetime'
            },
            {
                field: 'createdBy',
                header: 'المسؤول',
                headerType: 'string'
            },
            {
                field: 'isActive',
                header: 'فعال',
                headerType: 'toggle'
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
                    label: 'تاكيد',
                    severity: 'danger'
                },
                accept: function () {
                    _this.companyManagement.changeStatus(rowData.userId).subscribe(function (res) {
                        _this.msgSrv.showMessage(res.message, res.succeeded);
                        if (res.succeeded)
                            _this.tableConfig.getSub$.next({});
                    });
                }
            });
        };
        this.deleteFunc = function (rowData) {
            _this.confirmationService.confirm({
                message: 'هل تريد حذف هذه الحساب؟',
                header: 'حذف الحساب',
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
                    _this.companyManagement["delete"](rowData.userId).subscribe(function (res) {
                        _this.msgSrv.showMessage(res.message, res.succeeded);
                        if (res.succeeded)
                            _this.tableConfig.getSub$.next({});
                    });
                }
            });
        };
        this.addFunc = function () {
            _this.router.navigate(['owner/company-management/add']);
        };
        this.editFunc = function (rowData) {
            _this.router.navigate(['owner/company-management/detail/edit/' + rowData.userId]);
        };
        this.displayFunc = function (rowData) {
            _this.router.navigate(['owner/company-management/detail/display/' + rowData.userId]);
        };
        this.resetFunc = function (rowData) {
            _this.getControl('userId').setValue(rowData.userId);
            _this.resetDialogVisible = true;
        };
        this.changePhoneNumberFunc = function (rowData) {
            var input = _this.changePhoneNumberForm['general'].find(function (x) { return x.key === 'userID'; });
            if (input) {
                input.value = rowData.userId;
                _this.changePhoneNumbervisible = true;
            }
        };
        this.changePhoneNumberForm = {};
        this.changePhoneNumbervisible = false;
        this.tableConfig = tableSrv.getStandardInfo(this.deleteFunc, this.editFunc, this.displayFunc, this.addFunc);
        this.tableConfig.Buttons.push({
            isShow: true,
            tooltip: 'تغيير كلمة السر',
            icon: 'pi pi-key',
            key: 'Delete',
            severity: 'contrast',
            command: function (rowData) {
                _this.resetFunc(rowData);
            }
        });
        this.tableConfig.Buttons.push({
            isShow: true,
            tooltip: 'تغيير رقم الموبايل',
            icon: 'pi pi-address-book',
            key: 'Edit',
            severity: 'contrast',
            command: function (rowData) {
                _this.changePhoneNumberFunc(rowData);
            }
        });
        this.changePhoneNumberForm = {
            general: [
                {
                    key: 'userID',
                    label: 'كلمة السر',
                    value: null,
                    dataType: 'string',
                    required: true,
                    visible: false,
                    options: []
                },
                {
                    key: 'adminPassword',
                    label: 'كلمة السر الادمن',
                    value: null,
                    dataType: 'string',
                    required: true,
                    visible: true,
                    options: []
                },
                {
                    key: 'newPhoneNumber',
                    label: 'رقم الهاتف الجديد للمستخدم',
                    value: null,
                    dataType: 'string',
                    required: true,
                    visible: true,
                    options: []
                },
            ]
        };
    }
    CompManagementShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (param) {
            _this.type = param['type'];
            _this.tableConfig.get$ = _this.tableConfig.getSub$.pipe(rxjs_1.switchMap(function (body) {
                if (body) {
                    return _this.companyManagement.getAll(body).pipe(rxjs_1.switchMap(function (res) {
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
    };
    CompManagementShowComponent.prototype.getControl = function (name) {
        return this.form.get(name);
    };
    CompManagementShowComponent.prototype.resetPassword = function () {
        var _this = this;
        var strategy = this.userState.strategy();
        if (strategy instanceof owner_strategy_1.OwnerStrategy) {
            strategy.resetPasswordAdmin(this.form.getRawValue()).subscribe(function (res) {
                _this.msgSrv.showMessage(res.message, res.succeeded);
                if (res.succeeded)
                    _this.resetDialogVisible = false;
            });
        }
    };
    CompManagementShowComponent.prototype.closeDialog = function (event, objs) {
        Object.keys(objs).forEach(function (x) {
            objs[x].map(function (z) {
                z.value = null;
                return z;
            });
        });
    };
    CompManagementShowComponent.prototype.changePhoneNumber = function (event) {
        var _this = this;
        this.userState.authSrv.changePhoneNumberForAdmin(event).subscribe(function (res) {
            _this.msgSrv.showMessage(res.message, res.succeeded);
            _this.changePhoneNumbervisible = !res.succeeded;
            _this.closeDialog(null, _this.changePhoneNumberForm);
            _this.tableConfig.getSub$.next({});
        });
    };
    CompManagementShowComponent = __decorate([
        core_1.Component({
            selector: 'comp-management-show',
            imports: [dynamic_view_component_1.DynamicViewComponent, dynmaic_form_component_1.DynmaicFormComponent, dynamic_input_component_1.DynamicInputComponent, primeng_shared_module_1.PrimeNgSharedModule],
            templateUrl: './comp-management-show.component.html',
            styleUrl: './comp-management-show.component.scss'
        })
    ], CompManagementShowComponent);
    return CompManagementShowComponent;
}());
exports.CompManagementShowComponent = CompManagementShowComponent;
