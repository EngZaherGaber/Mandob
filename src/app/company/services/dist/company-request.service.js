"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanyRequestService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../environments/environment");
var CompanyRequestService = /** @class */ (function () {
    function CompanyRequestService(http) {
        this.http = http;
        this.url = environment_1.environment.api + 'CompanyRequest/';
    }
    CompanyRequestService.prototype.getAll = function (isWaiting, body) {
        return this.http.post(this.url + 'my-requests/' + isWaiting, body);
    };
    CompanyRequestService.prototype.assignDistributor = function (body) {
        return this.http.put(this.url + 'assign-distributor', body);
    };
    CompanyRequestService.prototype.reject = function (requestId) {
        return this.http.put(this.url + 'reject/' + requestId, {});
    };
    CompanyRequestService.prototype.myTask = function () {
        return this.http.post(this.url + 'mytasks', {});
    };
    CompanyRequestService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CompanyRequestService);
    return CompanyRequestService;
}());
exports.CompanyRequestService = CompanyRequestService;
