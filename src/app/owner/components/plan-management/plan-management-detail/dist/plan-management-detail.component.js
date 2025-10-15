"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlanManagementDetailComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var dynmaic_form_component_1 = require("../../../../shared/components/dynmaic-form/dynmaic-form.component");
var PlanManagementDetailComponent = /** @class */ (function () {
    function PlanManagementDetailComponent(router, route, planSrv, msgSrv) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.planSrv = planSrv;
        this.msgSrv = msgSrv;
        this.resetObjs = {};
        this.isShow = false;
        this.route.params
            .pipe(rxjs_1.switchMap(function (param) {
            _this.isShow = param['type'] === 'display';
            _this.planId = +param['id'];
            return planSrv.getOne(_this.planId);
        }))
            .subscribe(function (res) {
            var _a, _b, _c, _d, _e, _f, _g;
            _this.plan = res.data;
            _this.resetObjs = {
                general: [
                    {
                        key: 'planName',
                        label: 'اسم الباقة',
                        value: (_a = _this.plan) === null || _a === void 0 ? void 0 : _a.planName,
                        dataType: 'string',
                        required: true,
                        visible: true,
                        options: []
                    },
                    {
                        key: 'price',
                        label: 'السعر',
                        value: (_b = _this.plan) === null || _b === void 0 ? void 0 : _b.price,
                        dataType: 'int',
                        required: true,
                        visible: true,
                        options: []
                    },
                    {
                        key: 'maxRequestsPerMonth',
                        label: 'اقصى عدد منتجات بالشهر',
                        value: (_c = _this.plan) === null || _c === void 0 ? void 0 : _c.maxRequestsPerMonth,
                        dataType: 'int',
                        required: true,
                        visible: true,
                        options: []
                    },
                    {
                        key: 'maxDistributors',
                        label: 'اقصى عدد موزعين',
                        value: (_d = _this.plan) === null || _d === void 0 ? void 0 : _d.maxDistributors,
                        dataType: 'int',
                        required: true,
                        visible: true,
                        options: []
                    },
                    {
                        key: 'priorityWeight',
                        label: 'الوزن',
                        value: (_e = _this.plan) === null || _e === void 0 ? void 0 : _e.priorityWeight,
                        dataType: 'int',
                        required: true,
                        visible: true,
                        options: []
                    },
                    {
                        key: 'hasAdsFeature',
                        label: 'امكانية الاعلان',
                        value: (_f = _this.plan) === null || _f === void 0 ? void 0 : _f.hasAdsFeature,
                        dataType: 'bool',
                        required: true,
                        visible: true,
                        options: []
                    },
                    {
                        key: 'hasMonthlyNotifications',
                        label: 'امكانية الاشعار الشهري',
                        value: (_g = _this.plan) === null || _g === void 0 ? void 0 : _g.hasMonthlyNotifications,
                        dataType: 'bool',
                        required: true,
                        visible: true,
                        options: []
                    },
                ]
            };
        });
    }
    PlanManagementDetailComponent.prototype.ngOnInit = function () { };
    PlanManagementDetailComponent.prototype.submit = function (event) {
        var _this = this;
        if (this.planId) {
            this.planSrv.edit(this.planId, event).subscribe(function (res) {
                _this.msgSrv.showMessage(res.message, res.succeeded);
                if (res.succeeded) {
                    _this.router.navigate(['owner/plan-management/show']);
                }
            });
        }
    };
    PlanManagementDetailComponent = __decorate([
        core_1.Component({
            selector: 'plan-management-detail',
            imports: [dynmaic_form_component_1.DynmaicFormComponent, common_1.CommonModule],
            templateUrl: './plan-management-detail.component.html',
            styleUrl: './plan-management-detail.component.scss'
        })
    ], PlanManagementDetailComponent);
    return PlanManagementDetailComponent;
}());
exports.PlanManagementDetailComponent = PlanManagementDetailComponent;
