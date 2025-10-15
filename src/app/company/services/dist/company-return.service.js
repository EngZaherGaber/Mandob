"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanyReturnService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../environments/environment");
var CompanyReturnService = /** @class */ (function () {
    function CompanyReturnService(http) {
        this.http = http;
        this.url = environment_1.environment.api + 'CompanyReturns/';
    }
    CompanyReturnService.prototype.getAll = function (requestId, body) {
        return this.http.post(this.url + 'getall/' + (requestId !== null && requestId !== void 0 ? requestId : ''), body);
    };
    CompanyReturnService.prototype.approve = function (body) {
        return this.http.put(this.url + 'approve', body);
    };
    CompanyReturnService.prototype.reject = function (body) {
        return this.http.put(this.url + 'reject', body);
    };
    CompanyReturnService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CompanyReturnService);
    return CompanyReturnService;
}());
exports.CompanyReturnService = CompanyReturnService;
