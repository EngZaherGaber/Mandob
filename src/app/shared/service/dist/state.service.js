"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.StateService = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var StateService = /** @class */ (function () {
    function StateService(wsSrv, router, breakpointObserver, platformId) {
        var _this = this;
        this.wsSrv = wsSrv;
        this.router = router;
        this.breakpointObserver = breakpointObserver;
        this.platformId = platformId;
        this.state = core_1.signal({
            page: '',
            width: 0,
            isDark: false,
            isOpenedSideNav: true,
            isOpenedCart: false,
            isOpenedNotficiation: false,
            notficiations: [],
            searchInput: '',
            openSearchMenu: false
        });
        this.searchInput$ = new rxjs_1.Subject();
        this.searchInput = core_1.computed(function () { return _this.state().searchInput; });
        this.isOpenSearchMenu = core_1.computed(function () { return _this.state().openSearchMenu; });
        this.page = core_1.computed(function () { return _this.state().page; });
        this.isBrowser = core_1.computed(function () { return common_1.isPlatformBrowser(_this.platformId); });
        this.isOpenedSideNav = core_1.computed(function () { return _this.state().isOpenedSideNav; });
        this.isOpenedNotficiation = core_1.computed(function () { return _this.state().isOpenedNotficiation; });
        this.notficiations = core_1.computed(function () { return _this.state().notficiations; });
        this.isOpenedCart = core_1.computed(function () { return _this.state().isOpenedCart; });
        this.screenType = core_1.computed(function () {
            var w = _this.state().width;
            if (w <= 768)
                return 'mobile';
            if (w <= 992)
                return 'tablet';
            return 'desktop';
        });
        this.isDark = core_1.computed(function () { return _this.state().isDark; });
        this.router.events.pipe(rxjs_1.filter(function (event) { return event instanceof router_1.NavigationEnd; })).subscribe(function (event) {
            _this.updateTitleFromRoute();
            _this.changeSearchInput('');
            _this.changeOpenSearchMenu(false);
        });
        this.breakpointObserver
            .observe([
            '(max-width: 768px)',
            '(max-width: 992px)',
        ])
            .subscribe(function (result) {
            if (_this.isBrowser()) {
                _this.setWidth(window.innerWidth);
            }
        });
        this.getIsDark();
        this.setIsDark(this.isDark());
        this.wsSrv.message$.subscribe(function (msg) {
            console.log('📩 Notification:', msg);
            var type = msg.type;
            var value = msg.value;
            switch (type) {
                case 'old_notifications':
                    msg.value.forEach(function (noti) { return _this.addNotification(noti); });
                    break;
                case 'review':
                    _this.addNotification(value);
                    break;
                default:
                    break;
            }
        });
    }
    StateService.prototype.updateTitleFromRoute = function () {
        var _this = this;
        var route = this.router.routerState.root;
        // Traverse the router state tree to find the deepest child with data
        while (route.firstChild) {
            route = route.firstChild;
        }
        // Get the title from route data
        route.title.subscribe(function (x) {
            var title = x || 'صفحة غير موجودة';
            _this.setPage(title);
        });
    };
    StateService.prototype.getIsDark = function () {
        var isDark = 'false';
        if (this.isBrowser()) {
            isDark = localStorage.getItem('isDark');
            if (isDark === 'true') {
                this.state.update(function (prev) { return (__assign(__assign({}, prev), { isDark: true })); });
            }
            else {
                this.state.update(function (prev) { return (__assign(__assign({}, prev), { isDark: false })); });
            }
        }
    };
    StateService.prototype.setIsDark = function (isDark) {
        if (this.isBrowser()) {
            localStorage.setItem('isDark', String(isDark));
            var element = document.querySelector('html');
            element === null || element === void 0 ? void 0 : element.classList.toggle('dark', isDark);
            this.getIsDark();
        }
    };
    StateService.prototype.setPage = function (page) {
        this.state.update(function (prev) { return (__assign(__assign({}, prev), { page: page })); });
    };
    StateService.prototype.setWidth = function (width) {
        this.state.update(function (prev) { return (__assign(__assign({}, prev), { width: width })); });
    };
    StateService.prototype.collapseSideNav = function () {
        var _this = this;
        this.state.update(function (prev) { return (__assign(__assign({}, prev), { isOpenedSideNav: !_this.isOpenedSideNav() })); });
    };
    StateService.prototype.collapseNotficiation = function () {
        var _this = this;
        this.state.update(function (prev) { return (__assign(__assign({}, prev), { isOpenedNotficiation: !_this.isOpenedNotficiation() })); });
    };
    StateService.prototype.addNotification = function (notification) {
        var _this = this;
        this.state.update(function (prev) { return (__assign(__assign({}, prev), { notficiations: __spreadArrays(_this.notficiations(), [notification]) })); });
    };
    StateService.prototype.markNotificationAsRead = function (id) {
        var _this = this;
        this.state.update(function (prev) { return (__assign(__assign({}, prev), { notficiations: __spreadArrays(_this.notficiations().filter(function (x) { return x.id !== id; })) })); });
        this.wsSrv.sendMessageToServer('OnNotification', { type: 'mark_read', recordId: id });
    };
    StateService.prototype.collapseCart = function () {
        var _this = this;
        this.state.update(function (prev) { return (__assign(__assign({}, prev), { isOpenedCart: !_this.isOpenedCart() })); });
    };
    StateService.prototype.changeSearchInput = function (searchInput) {
        this.state.update(function (prev) { return (__assign(__assign({}, prev), { searchInput: searchInput })); });
        this.searchInput$.next(this.searchInput());
    };
    StateService.prototype.changeOpenSearchMenu = function (openSearchMenu) {
        this.state.update(function (prev) { return (__assign(__assign({}, prev), { openSearchMenu: openSearchMenu })); });
    };
    StateService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(3, core_1.Inject(core_1.PLATFORM_ID))
    ], StateService);
    return StateService;
}());
exports.StateService = StateService;
