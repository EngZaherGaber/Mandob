"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ForgetPasswordComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dynamic_input_component_1 = require("../../../shared/components/dynamic-input/dynamic-input.component");
var loading_component_1 = require("../../../shared/components/loading/loading.component");
var primeng_shared_module_1 = require("../../../shared/modules/shared/primeng-shared.module");
var ForgetPasswordComponent = /** @class */ (function () {
    function ForgetPasswordComponent(router, authSrv, userState, msgSrv) {
        this.router = router;
        this.authSrv = authSrv;
        this.userState = userState;
        this.msgSrv = msgSrv;
        this.form = new forms_1.FormGroup({
            email: new forms_1.FormControl(null),
            code: new forms_1.FormControl(null),
            newPassword: new forms_1.FormControl(null)
        });
        this.step = 1;
        this.loading = false;
        this.objs = [
            {
                key: 'email',
                value: null,
                label: 'الايميل',
                dataType: 'string',
                required: true,
                visible: true,
                options: []
            },
            {
                key: 'code',
                value: null,
                label: 'كود التاكيد',
                dataType: 'string',
                required: true,
                visible: true,
                options: []
            },
            {
                key: 'newPassword',
                value: null,
                label: 'كلمة السر الجديدة',
                dataType: 'string',
                required: true,
                visible: true,
                options: []
            },
        ];
    }
    ForgetPasswordComponent.prototype.getControl = function (name) {
        return this.form.get(name);
    };
    ForgetPasswordComponent.prototype.login = function () {
        this.router.navigate(['auth/login']);
    };
    ForgetPasswordComponent.prototype.forgetPassword = function () {
        var _this = this;
        this.loading = true;
        var formValue = {
            email: this.form.value.email
        };
        this.authSrv.forgetPassword(formValue).subscribe(function (res) {
            if (res.data) {
                _this.loading = false;
                _this.msgSrv.showSuccess(res.message);
                _this.step = 2;
            }
        }, function (err) {
            _this.loading = false;
        });
    };
    ForgetPasswordComponent.prototype.verfication = function () {
        var _this = this;
        this.loading = true;
        var formValue = {
            code: this.form.value.code,
            email: this.form.value.email
        };
        this.authSrv.verfiyCodeForForgetPassword(formValue).subscribe(function (res) {
            _this.loading = false;
            // this.userState.setToken(res.data.accessToken, res.data.refreshToken);
            var token = _this.authSrv.helper.decodeToken(res.data.token);
            _this.step = 3;
            _this.loading = false;
        }, function (err) {
            _this.loading = false;
        });
    };
    ForgetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        this.loading = true;
        var formValue = {
            code: this.form.value.code,
            newPassword: this.form.value.newPassword,
            email: this.form.value.email
        };
        this.authSrv.resetPassword(formValue).subscribe(function (res) {
            _this.loading = false;
            if (res.succeeded)
                _this.router.navigate(['auth/login']);
        }, function (err) {
            _this.loading = false;
        });
    };
    ForgetPasswordComponent.prototype.reSendCode = function () {
        var _this = this;
        this.authSrv.resendCode({ email: this.form.value.email }).subscribe(function (res) {
            _this.msgSrv.showMessage(res.message, res.succeeded);
        });
    };
    ForgetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'forget-password',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, dynamic_input_component_1.DynamicInputComponent, loading_component_1.LoadingComponent],
            templateUrl: './forget-password.component.html',
            styleUrl: './forget-password.component.scss'
        })
    ], ForgetPasswordComponent);
    return ForgetPasswordComponent;
}());
exports.ForgetPasswordComponent = ForgetPasswordComponent;
