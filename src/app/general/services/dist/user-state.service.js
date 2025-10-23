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
exports.UserStateService = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var fingerprintjs_1 = require("@fingerprintjs/fingerprintjs");
var rxjs_1 = require("rxjs");
var UserStateService = /** @class */ (function () {
    function UserStateService(company, client, distributor, owner, authSrv, platformId) {
        var _this = this;
        this.company = company;
        this.client = client;
        this.distributor = distributor;
        this.owner = owner;
        this.authSrv = authSrv;
        this.platformId = platformId;
        this.isBrowser = core_1.computed(function () { return common_1.isPlatformBrowser(_this.platformId); });
        this.role = core_1.computed(function () { var _a; return (_this.user() ? (_a = _this.user()) === null || _a === void 0 ? void 0 : _a.role : null); });
        this.fingerPrint = core_1.computed(function () { return _this.getFingerPrint(); });
        this.user = core_1.signal(null);
        this.loginForm = core_1.signal(null);
        this.strategy = core_1.computed(function () {
            var role = _this.role();
            if (_this.isBrowser() && role && _this.isValidRole(role)) {
                return _this.getStrategy(role);
            }
            return null;
        });
        this.strategies = {
            client: this.client,
            company: this.company,
            distributor: this.distributor,
            owner: this.owner
        };
    }
    UserStateService.prototype.isValidRole = function (role) {
        return ['client', 'company', 'distributor', 'owner'].includes(role);
    };
    UserStateService.prototype.getStrategy = function (role) {
        return this.strategies[role];
    };
    UserStateService.prototype.getFingerPrint = function () {
        return __awaiter(this, void 0, Promise, function () {
            var fp, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isBrowser()) return [3 /*break*/, 3];
                        return [4 /*yield*/, fingerprintjs_1["default"].load()];
                    case 1:
                        fp = _a.sent();
                        return [4 /*yield*/, fp.get()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.visitorId];
                    case 3: return [2 /*return*/, ''];
                }
            });
        });
    };
    UserStateService.prototype.checkUser = function () {
        var _this = this;
        if (this.user()) {
            return rxjs_1.of(true); // user already exists locally
        }
        return this.authSrv.myInfo().pipe(rxjs_1.switchMap(function (res) {
            if (res.succeeded) {
                _this.user.set(res.data);
                return rxjs_1.of(true);
            }
            else {
                return rxjs_1.of(false);
            }
        }), rxjs_1.catchError(function () { return rxjs_1.of(false); }));
    };
    UserStateService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(5, core_1.Inject(core_1.PLATFORM_ID))
    ], UserStateService);
    return UserStateService;
}());
exports.UserStateService = UserStateService;
