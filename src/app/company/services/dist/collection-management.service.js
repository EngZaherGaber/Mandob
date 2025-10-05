"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CollectionManagementService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("../../../environments/environment");
var CollectionManagementService = /** @class */ (function () {
    function CollectionManagementService(http) {
        this.http = http;
        this.url = environment_1.environment.api + 'Collection/';
    }
    CollectionManagementService.prototype.getAll = function (body, companyId) {
        var params = new http_1.HttpParams().append('companyID', companyId.toString());
        return this.http.post(this.url + 'getall', body, // request body
        { params: params });
    };
    CollectionManagementService.prototype.getOne = function (id) {
        return this.http.get(this.url + id);
    };
    CollectionManagementService.prototype.edit = function (id, body, files) {
        var formData = new FormData();
        files.forEach(function (file, index) {
            formData.append('CollectionImageUrl', file, file.name);
        });
        Object.keys(body).forEach(function (key) {
            formData.append(key, body[key]);
        });
        return this.http.put(this.url + id, formData);
    };
    CollectionManagementService.prototype.add = function (body, files) {
        var formData = new FormData();
        files.forEach(function (file, index) {
            formData.append('CollectionImageUrl', file, file.name);
        });
        Object.keys(body).forEach(function (key) {
            formData.append(key, body[key]);
        });
        return this.http.post(this.url, formData);
    };
    CollectionManagementService.prototype["delete"] = function (id) {
        return this.http["delete"](this.url + id);
    };
    CollectionManagementService.prototype.changeStatus = function (id) {
        return this.http.put(this.url + 'status/' + id, {});
    };
    CollectionManagementService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CollectionManagementService);
    return CollectionManagementService;
}());
exports.CollectionManagementService = CollectionManagementService;
