"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var client_tool_search_menu_component_1 = require("../../../client/components/tools/client-tool-search-menu/client-tool-search-menu.component");
var click_outside_directive_1 = require("../../directives/click-outside.directive");
var primeng_shared_module_1 = require("../../modules/shared/primeng-shared.module");
var dynmaic_form_component_1 = require("../dynmaic-form/dynmaic-form.component");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(stateSrv, userState, router, authSrv, msgSrv, productStore) {
        var _this = this;
        this.stateSrv = stateSrv;
        this.userState = userState;
        this.router = router;
        this.authSrv = authSrv;
        this.msgSrv = msgSrv;
        this.productStore = productStore;
        this.currentState = core_1.signal('');
        this.displayText = core_1.signal('');
        this.isChanging = core_1.signal(false);
        this.isTyping = core_1.signal(false); // New signal to track typing state
        this.platformId = core_1.inject(core_1.PLATFORM_ID);
        this.isBrowser = common_1.isPlatformBrowser(this.platformId);
        this.items = [];
        this.changePasswordForm = {
            general: [
                {
                    key: 'oldPassword',
                    label: 'كلمة السر القديمة',
                    value: null,
                    dataType: 'string',
                    required: true,
                    visible: true,
                    options: []
                },
                {
                    key: 'newPassword',
                    label: 'كلمة السر الجديدة',
                    value: null,
                    dataType: 'string',
                    required: true,
                    visible: true,
                    options: []
                },
            ]
        };
        this.changePasswordvisible = false;
        this.changePhoneNumberForm = {
            newPhoneNumber: [
                {
                    key: 'password',
                    label: 'كلمة السر',
                    value: null,
                    dataType: 'string',
                    required: true,
                    visible: true,
                    options: []
                },
                {
                    key: 'newPhoneNumber',
                    label: 'رقم الهاتف الجديد',
                    value: null,
                    dataType: 'string',
                    required: true,
                    visible: true,
                    options: []
                },
            ],
            code: [
                {
                    key: 'code',
                    label: 'الكود',
                    value: null,
                    dataType: 'string',
                    required: true,
                    visible: true,
                    options: []
                },
            ]
        };
        this.changePhoneNumbervisible = false;
        this.stepsPhoneNumberList = [{ label: 'رقم الهاتف الجديد' }, { label: 'التحقق' }];
        this.activeIndexPhoneNumber = 0;
        this.searchLoading = false;
        this.searchResult = null;
        this.messages = [];
        this.user = null;
        this.items = [
            {
                separator: true
            },
            {
                label: 'الحساب',
                icon: 'pi pi-cog',
                command: function (event) {
                    _this.openAccount();
                }
            },
            {
                label: 'معرض الصور',
                icon: 'pi pi-images',
                command: function (event) {
                    _this.openGallery();
                }
            },
            {
                label: 'تغيير كلمة السر',
                icon: 'pi pi-lock',
                command: function () {
                    _this.changePasswordvisible = true;
                }
            },
            {
                label: 'تغيير رقم الهاتف',
                icon: 'pi pi-address-book',
                command: function () {
                    _this.changePhoneNumbervisible = true;
                }
            },
            {
                label: 'تسجيل الخروج',
                icon: 'pi pi-sign-out',
                command: function () {
                    _this.logout();
                }
            },
        ];
        this.stateSrv.searchInput$
            .pipe(rxjs_1.debounceTime(2000), rxjs_1.distinctUntilChanged(), rxjs_1.switchMap(function (value) {
            if (value) {
                _this.searchLoading = true;
                return productStore.globalSearch(value);
            }
            else {
                return rxjs_1.of(null);
            }
        }))
            .pipe(rxjs_1.catchError(function (err) {
            _this.searchLoading = false;
            return rxjs_1.of(null);
        }))
            .subscribe(function (res) {
            if (res) {
                _this.stateSrv.changeOpenSearchMenu(true);
                _this.searchLoading = false;
                _this.searchResult = res.data;
            }
        });
        // Only run effects on browser
        if (this.isBrowser) {
            core_1.effect(function () {
                var newValue = _this.stateSrv.page();
                if (newValue !== _this.currentState()) {
                    _this.changeStateWithAnimation(newValue);
                }
            });
            core_1.effect(function () {
                _this.user = userState.user();
            });
        }
        else {
            // SSR fallback - show full text immediately
            core_1.effect(function () {
                _this.currentState.set(_this.stateSrv.page());
                _this.displayText.set(_this.stateSrv.page());
            });
        }
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userState.wsSrv.message$.subscribe(function (msg) { return _this.messages.push(msg); });
    };
    HeaderComponent.prototype.changeSearchInput = function (event) {
        this.stateSrv.changeSearchInput(event);
    };
    HeaderComponent.prototype.onClickOutside = function (event) {
        if (this.stateSrv.isOpenSearchMenu()) {
            this.stateSrv.changeOpenSearchMenu(false);
            this.searchResult = null;
            this.searchLoading = false;
        }
    };
    HeaderComponent.prototype.seeMoreNavigation = function () {
        this.router.navigate(['client/product/group/search/' + this.stateSrv.searchInput() + '/0']);
    };
    HeaderComponent.prototype.changeStateWithAnimation = function (newValue) {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isChanging.set(true);
                        // Wait for fade out animation to complete
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 300); })];
                    case 1:
                        // Wait for fade out animation to complete
                        _a.sent();
                        this.currentState.set(newValue);
                        this.isChanging.set(false);
                        // Typewriter effect
                        this.isTyping.set(true);
                        // Typewriter effect
                        this.displayText.set('');
                        _loop_1 = function (i) {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 50); })];
                                    case 1:
                                        _a.sent(); // Typing speed
                                        this_1.displayText.update(function (text) { return text + newValue[i]; });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < newValue.length)) return [3 /*break*/, 5];
                        return [5 /*yield**/, _loop_1(i)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.isTyping.set(false); // Hide cursor after typing completes
                        return [2 /*return*/];
                }
            });
        });
    };
    HeaderComponent.prototype.changePassword = function (body) {
        var _this = this;
        this.authSrv.changePassword(body).subscribe(function (res) {
            if (res.succeeded) {
                _this.router.navigate(['auth/login']);
            }
        });
    };
    HeaderComponent.prototype.openAccount = function () {
        this.router.navigate(['/account']);
    };
    HeaderComponent.prototype.openGallery = function () {
        this.router.navigate(['/gallery']);
    };
    HeaderComponent.prototype.logout = function () {
        var _this = this;
        var _a;
        (_a = this.userState
            .strategy()) === null || _a === void 0 ? void 0 : _a.logout().subscribe(function (res) {
            if (res) {
                _this.userState.user.set(null);
            }
        });
    };
    HeaderComponent.prototype.closeDialog = function (event, objs) {
        Object.keys(objs).forEach(function (x) {
            objs[x].map(function (z) {
                z.value = null;
                return z;
            });
        });
    };
    HeaderComponent.prototype.changePhoneNumber = function (event) {
        var _this = this;
        var strategy = this.userState.strategy();
        if (event.index === 1 && strategy) {
            strategy.changePhoneNumber(event.form.value['newPhoneNumber']).subscribe(function (res) {
                _this.msgSrv.showMessage(res.message, res.succeeded);
                _this.activeIndexPhoneNumber = res.succeeded ? 1 : 0;
            });
        }
    };
    HeaderComponent.prototype.verifyChangePhoneNumber = function (event) {
        var _this = this;
        var strategy = this.userState.strategy();
        if (strategy) {
            strategy
                .VerifyChangePhoneNumber({
                code: event['code']['code'],
                newPhoneNumber: event['newPhoneNumber']['newPhoneNumber']
            })
                .subscribe(function (res) {
                _this.msgSrv.showMessage(res.message, res.succeeded);
                _this.changePhoneNumbervisible = !res.succeeded;
            });
        }
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        var _a;
        (_a = this.sub) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this.userState.wsSrv.stopConnection();
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header',
            imports: [
                primeng_shared_module_1.PrimeNgSharedModule,
                dynmaic_form_component_1.DynmaicFormComponent,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                click_outside_directive_1.ClickOutsideDirective,
                client_tool_search_menu_component_1.ClientToolSearchMenuComponent,
            ],
            templateUrl: './header.component.html',
            styleUrl: './header.component.scss',
            animations: [
                animations_1.trigger('fade', [
                    animations_1.transition(':enter', [animations_1.style({ opacity: 0 }), animations_1.animate('300ms ease-out', animations_1.style({ opacity: 1 }))]),
                    animations_1.transition(':leave', [animations_1.animate('300ms ease-in', animations_1.style({ opacity: 0 }))]),
                ]),
                animations_1.trigger('typewriter', [
                    animations_1.transition('* => *', [
                        animations_1.style({ width: '0', opacity: 0 }),
                        animations_1.animate('500ms ease-out', animations_1.style({ opacity: 1, width: '*' })),
                    ]),
                ]),
            ]
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
