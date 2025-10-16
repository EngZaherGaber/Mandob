"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var angular_jwt_1 = require("@auth0/angular-jwt");
var environment_1 = require("../../../environments/environment");
var AuthService = /** @class */ (function () {
    function AuthService(http, platformId, router, msgSrv) {
        var _this = this;
        this.http = http;
        this.platformId = platformId;
        this.router = router;
        this.msgSrv = msgSrv;
        this.url = environment_1.environment.api + 'Auth';
        this.helper = new angular_jwt_1.JwtHelperService();
        this.isBrowser = core_1.computed(function () { return common_1.isPlatformBrowser(_this.platformId); });
    }
    AuthService.prototype.login = function (input, password) {
        return this.http.post(this.url + '/login', // 👈 always start with /api
        { input: input, password: password }, { withCredentials: true });
    };
    AuthService.prototype.forgetPassword = function (body) {
        return this.http.post(this.url + '/forget-password', body);
    };
    AuthService.prototype.verfiyCodeForForgetPassword = function (body) {
        return this.http.post(this.url + '/verify-code-for-forget-password', body);
    };
    AuthService.prototype.resetPassword = function (body) {
        return this.http.post(this.url + '/reset-password', body);
    };
    AuthService.prototype.resetPasswordAdmin = function (body) {
        return this.http.post(this.url + '/reset-password-for-admin', body);
    };
    AuthService.prototype.updateToken = function (refreshToken) {
        return this.http.post(this.url + '/UpdateToken', { refreshToken: refreshToken });
    };
    AuthService.prototype.logout = function () {
        return this.http.post(this.url + '/logout', {});
    };
    AuthService.prototype.changePhoneNumberForAdmin = function (body) {
        return this.http.post(this.url + '/change-phone-number-for-admin', body);
    };
    AuthService.prototype.changePhoneNumber = function (body) {
        return this.http.post(this.url + '/change-phone-number', body);
    };
    AuthService.prototype.VerifyChangePhoneNumber = function (body) {
        return this.http.post(this.url + '/verify-code-for-change-phone-number', body);
    };
    AuthService.prototype.changePassword = function (body) {
        return this.http.put(this.url + '/change-password', body);
    };
    AuthService.prototype.verifyCode = function (body) {
        return this.http.post(this.url + '/verify-code', body);
    };
    AuthService.prototype.resendCode = function (body) {
        return this.http.post(this.url + '/resend-code', body);
    };
    AuthService.prototype.myInfo = function () {
        return this.http.get(this.url + '/me');
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(1, core_1.Inject(core_1.PLATFORM_ID))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
