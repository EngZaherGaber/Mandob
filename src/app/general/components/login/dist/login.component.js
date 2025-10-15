"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dynamic_input_component_1 = require("../../../shared/components/dynamic-input/dynamic-input.component");
var loading_component_1 = require("../../../shared/components/loading/loading.component");
var primeng_shared_module_1 = require("../../../shared/modules/shared/primeng-shared.module");
var LoginComponent = /** @class */ (function () {
    /**
     *
     */
    function LoginComponent(router, userState, authSrv, msgSrv) {
        this.router = router;
        this.userState = userState;
        this.authSrv = authSrv;
        this.msgSrv = msgSrv;
        this.loginForm = new forms_1.FormGroup({
            input: new forms_1.FormControl(null),
            password: new forms_1.FormControl(null, [forms_1.Validators.min(8)])
        });
        this.loading = false;
        this.objs = [
            {
                key: 'email',
                value: null,
                label: 'الايميل او رقم الهاتف',
                dataType: 'string',
                required: true,
                visible: true,
                options: []
            },
            {
                key: 'password',
                value: null,
                label: 'كلمة السر',
                dataType: 'password',
                required: true,
                visible: true,
                options: []
            },
        ];
        this.user = null;
        this.isBrowser = authSrv.isBrowser;
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.getControl = function (name) {
        return this.loginForm.get(name);
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        var formValue = this.loginForm.value;
        this.authSrv.login(formValue['input'], formValue['password']).subscribe(function (res) {
            var data = res.data;
            if (res.succeeded) {
                localStorage.setItem('role', data.role);
                localStorage.setItem('name', data.name);
                _this.userState.loginForm.set(formValue);
                _this.userState.user.set(null);
                if (data.isVerified === true)
                    _this.router.navigate(['']);
            }
            else {
                _this.loading = false;
                _this.msgSrv.showError(res.message);
                if ((data === null || data === void 0 ? void 0 : data.isVerified) === false)
                    _this.router.navigate(['auth/verfication'], { state: { input: formValue['input'] } });
            }
        }, function (err) {
            _this.loading = false;
        });
    };
    LoginComponent.prototype.goToRegister = function () {
        this.router.navigate(['auth/register']);
    };
    LoginComponent.prototype.forgetPassword = function () {
        this.router.navigate(['auth/forget-password']);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, dynamic_input_component_1.DynamicInputComponent, loading_component_1.LoadingComponent],
            templateUrl: './login.component.html',
            styleUrl: './login.component.scss'
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
