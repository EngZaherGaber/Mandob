"use strict";
exports.__esModule = true;
exports.redirectGuard = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var user_state_service_1 = require("../../general/services/user-state.service");
exports.redirectGuard = function (route, state) {
    var userState = core_1.inject(user_state_service_1.UserStateService);
    var router = core_1.inject(router_1.Router);
    var platformId = core_1.inject(core_1.PLATFORM_ID);
    if (!common_1.isPlatformBrowser(platformId)) {
        return rxjs_1.of(true);
    }
    debugger;
    return rxjs_1.of(router.createUrlTree([userState.role()]));
};
