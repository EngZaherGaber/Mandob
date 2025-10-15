"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AccountComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var dynmaic_form_component_1 = require("../../../shared/components/dynmaic-form/dynmaic-form.component");
var AccountComponent = /** @class */ (function () {
    function AccountComponent(userState, router, msgSrv) {
        var _this = this;
        var _a;
        this.userState = userState;
        this.router = router;
        this.msgSrv = msgSrv;
        this.resetObjs = {};
        this.stepsList = [{ label: 'المعلومات العامة' }, { label: 'المعلومات الخاصة' }];
        this.disableAtt = {
            general: ['phoneNumber']
        };
        this.final = false;
        (_a = this.userState
            .strategy()) === null || _a === void 0 ? void 0 : _a.getById().subscribe(function (res) {
            if (res.succeeded) {
                _this.resetObjs = {
                    general: [
                        {
                            key: 'name',
                            label: 'اسم',
                            value: res.data.name,
                            dataType: 'string',
                            required: true,
                            visible: true,
                            options: []
                        },
                        {
                            key: 'phoneNumber',
                            label: 'الرقم',
                            value: res.data.phoneNumber,
                            dataType: 'string',
                            required: true,
                            visible: true,
                            options: []
                        },
                    ]
                };
                if ('commercialRegistrationNumber' in res.data) {
                    // TypeScript now treats res.data as Company
                    _this.resetObjs['general'].push({
                        key: 'commercialRegistrationNumber',
                        label: 'السجل التجاري',
                        value: res.data.commercialRegistrationNumber,
                        dataType: 'string',
                        required: true,
                        visible: true,
                        options: []
                    }, {
                        key: 'address',
                        label: 'العنوان',
                        value: res.data.address,
                        dataType: 'string',
                        required: true,
                        visible: true,
                        options: []
                    });
                    if ('currencyID' in res.data) {
                        _this.resetObjs['general'].push({
                            key: 'currencyID',
                            label: 'العملة',
                            value: res.data.currencyID,
                            dataType: 'list',
                            required: true,
                            visible: true,
                            options: [
                                { id: 1, name: 'الليرة السورية' },
                                { id: 2, name: 'الدولار' },
                            ]
                        });
                    }
                }
                _this.final = true;
            }
        });
    }
    AccountComponent.prototype.submit = function (event) {
        var _this = this;
        var _a;
        (_a = this.userState
            .strategy()) === null || _a === void 0 ? void 0 : _a.edit(event).pipe(rxjs_1.switchMap(function (res) {
            if (res.succeeded) {
                _this.userState.user.set(null);
                return _this.userState.checkUser();
            }
            return rxjs_1.of(false);
        })).subscribe(function (res) {
            if (res) {
                _this.msgSrv.showSuccess('تم تعديل الحساب');
                _this.router.navigate(['']);
            }
        });
    };
    AccountComponent = __decorate([
        core_1.Component({
            selector: 'account',
            imports: [dynmaic_form_component_1.DynmaicFormComponent, common_1.CommonModule],
            templateUrl: './account.component.html',
            styleUrl: './account.component.scss'
        })
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;
