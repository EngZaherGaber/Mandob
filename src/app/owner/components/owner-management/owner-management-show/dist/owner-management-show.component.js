"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OwnerManagementShowComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var dynamic_view_component_1 = require("../../../../shared/components/dynamic-view/dynamic-view.component");
var dynmaic_form_component_1 = require("../../../../shared/components/dynmaic-form/dynmaic-form.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var OwnerManagementShowComponent = /** @class */ (function () {
    function OwnerManagementShowComponent(tableSrv, userState, confirmationService, msgSrv, route, router, ownerManagement) {
        var _this = this;
        this.tableSrv = tableSrv;
        this.userState = userState;
        this.confirmationService = confirmationService;
        this.msgSrv = msgSrv;
        this.route = route;
        this.router = router;
        this.ownerManagement = ownerManagement;
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
                    _this.ownerManagement.changeStatus(rowData.userId).subscribe(function (res) {
                        _this.msgSrv.showMessage(res.message, res.succeeded);
                        if (res.succeeded) {
                            _this.tableConfig.getSub$.next({});
                        }
                    });
                }
            });
        };
        this.addFunc = function () {
            _this.router.navigate(['owner/owner-management/add']);
        };
        this.editFunc = function (rowData) {
            rowData['image.imageUrl'];
            _this.router.navigate(['owner/owner-management/detail/edit/' + rowData.userId]);
        };
        this.displayFunc = function (rowData) {
            _this.router.navigate(['owner/owner-management/detail/display/' + rowData.userId]);
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
        this.tableConfig = tableSrv.getStandardInfo(undefined, this.editFunc, this.displayFunc, this.addFunc);
        this.route.params.subscribe(function (param) {
            _this.type = param['type'];
            _this.tableConfig.get$ = _this.tableConfig.getSub$.pipe(rxjs_1.switchMap(function (body) {
                if (body) {
                    return _this.ownerManagement.getAll(body).pipe(rxjs_1.switchMap(function (res) {
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
    OwnerManagementShowComponent.prototype.closeDialog = function (event, objs) {
        Object.keys(objs).forEach(function (x) {
            objs[x].map(function (z) {
                z.value = null;
                return z;
            });
        });
    };
    OwnerManagementShowComponent.prototype.changePhoneNumber = function (event) {
        var _this = this;
        this.userState.authSrv.changePhoneNumberForAdmin(event).subscribe(function (res) {
            _this.msgSrv.showMessage(res.message, res.succeeded);
            _this.changePhoneNumbervisible = !res.succeeded;
            _this.closeDialog(null, _this.changePhoneNumberForm);
            _this.tableConfig.getSub$.next({});
        });
    };
    OwnerManagementShowComponent = __decorate([
        core_1.Component({
            selector: 'owner-management-show',
            imports: [dynamic_view_component_1.DynamicViewComponent, primeng_shared_module_1.PrimeNgSharedModule, dynmaic_form_component_1.DynmaicFormComponent],
            templateUrl: './owner-management-show.component.html',
            styleUrl: './owner-management-show.component.scss'
        })
    ], OwnerManagementShowComponent);
    return OwnerManagementShowComponent;
}());
exports.OwnerManagementShowComponent = OwnerManagementShowComponent;
