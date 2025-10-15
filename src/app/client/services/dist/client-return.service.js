"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientReturnService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../environments/environment");
var ClientReturnService = /** @class */ (function () {
    function ClientReturnService(http) {
        this.http = http;
        this.url = environment_1.environment.api + 'ClientReturns/';
    }
    ClientReturnService.prototype.create = function (body) {
        return this.http.post(this.url, body);
    };
    ClientReturnService.prototype.cancel = function (returnRequestId) {
        return this.http.put(this.url + '/cancel/' + returnRequestId, {});
    };
    ClientReturnService.prototype.getAll = function (requestId, body) {
        return this.http.post(this.url + 'getall/' + (requestId !== null && requestId !== void 0 ? requestId : ''), body);
    };
    ClientReturnService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ClientReturnService);
    return ClientReturnService;
}());
exports.ClientReturnService = ClientReturnService;
