"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VerficationComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dynamic_input_component_1 = require("../../../shared/components/dynamic-input/dynamic-input.component");
var loading_component_1 = require("../../../shared/components/loading/loading.component");
var primeng_shared_module_1 = require("../../../shared/modules/shared/primeng-shared.module");
var VerficationComponent = /** @class */ (function () {
    // role: Signal<string | null>;
    /**
     *
     */
    function VerficationComponent(router, userState, msgSrv, authSrv) {
        var _a;
        this.router = router;
        this.userState = userState;
        this.msgSrv = msgSrv;
        this.authSrv = authSrv;
        this.codeControl = new forms_1.FormControl(null);
        this.input = '';
        this.loading = false;
        // this.role = userState.role;
        var nav = this.router.getCurrentNavigation();
        if (nav === null || nav === void 0 ? void 0 : nav.extras.state) {
            this.input = (_a = nav.extras.state['input']) !== null && _a !== void 0 ? _a : '';
        }
        this.codeInput = {
            key: 'code',
            value: null,
            label: 'كود التاكيد',
            dataType: 'string',
            required: true,
            visible: true,
            options: []
        };
    }
    VerficationComponent.prototype.reSendCode = function () {
        var _this = this;
        this.authSrv.resendCode({ email: this.input }).subscribe(function (res) {
            _this.msgSrv.showMessage(res.message, res.succeeded);
        });
    };
    VerficationComponent.prototype.verfication = function () {
        var _this = this;
        this.authSrv.verifyCode({ code: this.codeControl.value, email: this.input }).subscribe(function (res) {
            if (res.succeeded)
                _this.router.navigate(['']);
        });
    };
    VerficationComponent = __decorate([
        core_1.Component({
            selector: 'verfication',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, dynamic_input_component_1.DynamicInputComponent, loading_component_1.LoadingComponent],
            templateUrl: './verfication.component.html',
            styleUrl: './verfication.component.scss'
        })
    ], VerficationComponent);
    return VerficationComponent;
}());
exports.VerficationComponent = VerficationComponent;
