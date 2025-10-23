"use strict";
exports.__esModule = true;
exports.authInterceptor = void 0;
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var message_toast_service_1 = require("../../shared/service/message-toast.service");
var user_state_service_1 = require("../services/user-state.service");
exports.authInterceptor = function (req, next) {
    var newReq;
    var platformId = core_1.inject(core_1.PLATFORM_ID);
    var injector = core_1.inject(core_1.Injector); // 👈 add this
    var msgSrv = core_1.inject(message_toast_service_1.MessageToastService);
    newReq = req.clone({ withCredentials: true });
    return next(newReq).pipe(rxjs_1.catchError(function (error) {
        var _a, _b, _c, _d;
        if (error instanceof http_1.HttpErrorResponse && common_1.isPlatformBrowser(platformId)) {
            var userState = injector.get(user_state_service_1.UserStateService);
            if (error.error) {
                var msg = (_a = error.error) === null || _a === void 0 ? void 0 : _a.message;
                switch (error.status) {
                    case 0:
                        msg = msg !== null && msg !== void 0 ? msg : 'CORS ERROR';
                        msgSrv.showError(msg);
                        break;
                    case 401:
                        msg = (_b = JSON.stringify(error)) !== null && _b !== void 0 ? _b : 'Your Credential is Invalid';
                        msgSrv.showError(msg);
                        (_c = userState.strategy()) === null || _c === void 0 ? void 0 : _c.logout();
                        break;
                    case 404:
                        msg = msg !== null && msg !== void 0 ? msg : 'Your API not found';
                        msgSrv.showError(msg);
                        break;
                    case 405:
                        msg = msg !== null && msg !== void 0 ? msg : 'Method Not Allowed';
                        msgSrv.showError(msg);
                        break;
                    case 400:
                        msg = (_d = error.error.message) !== null && _d !== void 0 ? _d : 'Bad Request!';
                        msgSrv.showError(msg);
                        break;
                    case 500:
                    default:
                        msgSrv.showError('An unexpected error occurred');
                        break;
                }
            }
        }
        return rxjs_1.throwError(function () { return error; });
    }));
};
