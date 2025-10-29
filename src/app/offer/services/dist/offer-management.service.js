"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OfferManagementService = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var environment_1 = require("../../../environments/environment");
var OfferManagementService = /** @class */ (function () {
    function OfferManagementService(http) {
        this.http = http;
        this.url = environment_1.environment.api + 'Offer/';
    }
    OfferManagementService.prototype.getAll = function (body) {
        return this.http.post(this.url + 'GetAll', body);
    };
    OfferManagementService.prototype.getOne = function (id) {
        return this.http.get(this.url + id);
    };
    OfferManagementService.prototype.edit = function (id, body) {
        return this.http.put(this.url + id, body);
    };
    OfferManagementService.prototype.add = function (body, files) {
        var _a, _b;
        var formData = new FormData();
        // Append image files
        files.forEach(function (file) {
            formData.append('ImageFiles', file, file.name);
        });
        var datePipe = new common_1.DatePipe('en-US');
        var generalInfo = body.generalInfo, conditions = body.conditions, benfints = body.benfints; // typo fixed (Benfints → benefits)
        // Append general info fields
        formData.append('GeneralInfo.Name', generalInfo.title);
        formData.append('GeneralInfo.Description', generalInfo.description);
        formData.append('GeneralInfo.OfferType', generalInfo.offerType);
        formData.append('GeneralInfo.StartDate', datePipe.transform(generalInfo.startDate, 'dd-MM-yyyy') || '');
        formData.append('GeneralInfo.EndDate', datePipe.transform(generalInfo.endDate, 'dd-MM-yyyy') || '');
        formData.append('GeneralInfo.Priority', (_b = (_a = generalInfo.priority) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '');
        // Append objects as JSON strings
        formData.append('Conditions', JSON.stringify(conditions || {}));
        formData.append('Benefits', JSON.stringify(benfints || {}));
        // Send form data
        return this.http.post(this.url, formData);
    };
    OfferManagementService.prototype["delete"] = function (id) {
        return this.http["delete"](this.url + id);
    };
    OfferManagementService.prototype.changeStatus = function (id) {
        return this.http.put(this.url + 'status/' + id, {});
    };
    OfferManagementService.prototype.getOfferMetadata = function () {
        return this.http.get(this.url + 'GetOfferMetadata/');
    };
    OfferManagementService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OfferManagementService);
    return OfferManagementService;
}());
exports.OfferManagementService = OfferManagementService;
