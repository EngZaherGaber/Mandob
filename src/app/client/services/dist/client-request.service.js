"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientRequestService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../environments/environment");
var ClientRequestService = /** @class */ (function () {
    function ClientRequestService(http) {
        this.http = http;
        this.url = environment_1.environment.api + 'ClientRequest/';
    }
    ClientRequestService.prototype.createFromCart = function (body) {
        return this.http.post(this.url + 'create-from-cart', body);
    };
    ClientRequestService.prototype.getAll = function (isWaiting, body) {
        return this.http.post(this.url + 'my-requests/' + isWaiting, body);
    };
    ClientRequestService.prototype.complete = function (requestId) {
        return this.http.put(this.url + 'complete-request/' + requestId, {});
    };
    ClientRequestService.prototype.cancel = function (requestId) {
        return this.http.put(this.url + 'cancel-request/' + requestId, {});
    };
    ClientRequestService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ClientRequestService);
    return ClientRequestService;
}());
exports.ClientRequestService = ClientRequestService;
