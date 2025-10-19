"use strict";
exports.__esModule = true;
exports.authGuard = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var user_state_service_1 = require("../../general/services/user-state.service");
var state_service_1 = require("../service/state.service");
exports.authGuard = function (childRoute, state) {
    var userState = core_1.inject(user_state_service_1.UserStateService);
    var stateSrv = core_1.inject(state_service_1.StateService);
    var router = core_1.inject(router_1.Router);
    var platformId = core_1.inject(core_1.PLATFORM_ID);
    if (!common_1.isPlatformBrowser(platformId)) {
        // On server: don’t block rendering, just allow navigation
        return rxjs_1.of(true);
    }
    return userState.checkUser().pipe(rxjs_1.switchMap(function (isLoggedIn) {
        var _a, _b;
        if (isLoggedIn) {
            stateSrv.wsSrv.startConnection((_b = (_a = userState.user()) === null || _a === void 0 ? void 0 : _a.userId) !== null && _b !== void 0 ? _b : 0);
            var role = userState.role();
            var targetUrl = "/" + role;
            // ✅ Prevent infinite loop: only redirect if not already on the correct role route
            if (!state.url.startsWith(targetUrl)) {
                return rxjs_1.of(router.createUrlTree([targetUrl]));
            }
            return rxjs_1.of(true); // allow navigation
        }
        else {
            return rxjs_1.of(router.createUrlTree(['/auth/login']));
        }
    }));
};
