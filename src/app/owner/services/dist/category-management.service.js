"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoryManagementService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../environments/environment");
var CategoryManagementService = /** @class */ (function () {
    function CategoryManagementService(http) {
        this.http = http;
        this.url = environment_1.environment.api + 'Category/';
    }
    CategoryManagementService.prototype.getAll = function (body, topFiveByProductCount) {
        if (topFiveByProductCount === void 0) { topFiveByProductCount = false; }
        return this.http.post(this.url + 'GetAll/' + topFiveByProductCount, body);
    };
    CategoryManagementService.prototype.getOne = function (id) {
        return this.http.get(this.url + id);
    };
    CategoryManagementService.prototype.edit = function (id, body) {
        return this.http.put(this.url + id, body);
    };
    CategoryManagementService.prototype.add = function (body) {
        return this.http.post(this.url, body);
    };
    CategoryManagementService.prototype["delete"] = function (id) {
        return this.http["delete"](this.url + id);
    };
    CategoryManagementService.prototype.changeStatus = function (id) {
        return this.http.put(this.url + 'status/' + id, {});
    };
    CategoryManagementService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CategoryManagementService);
    return CategoryManagementService;
}());
exports.CategoryManagementService = CategoryManagementService;
