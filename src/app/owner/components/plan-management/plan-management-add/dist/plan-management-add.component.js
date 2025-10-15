"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlanManagementAddComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var dynmaic_form_component_1 = require("../../../../shared/components/dynmaic-form/dynmaic-form.component");
var PlanManagementAddComponent = /** @class */ (function () {
    function PlanManagementAddComponent(router, planSrv, msgSrv) {
        this.router = router;
        this.planSrv = planSrv;
        this.msgSrv = msgSrv;
        this.resetObjs = {};
        this.resetObjs = {
            general: [
                {
                    key: 'planName',
                    label: 'اسم الباقة',
                    value: null,
                    dataType: 'string',
                    required: true,
                    visible: true,
                    options: []
                },
                {
                    key: 'price',
                    label: 'السعر',
                    value: null,
                    dataType: 'int',
                    required: true,
                    visible: true,
                    options: []
                },
                {
                    key: 'maxRequestsPerMonth',
                    label: 'اقصى عدد منتجات بالشهر',
                    value: null,
                    dataType: 'int',
                    required: true,
                    visible: true,
                    options: []
                },
                {
                    key: 'maxDistributors',
                    label: 'اقصى عدد موزعين',
                    value: null,
                    dataType: 'int',
                    required: true,
                    visible: true,
                    options: []
                },
                {
                    key: 'priorityWeight',
                    label: 'الوزن',
                    value: null,
                    dataType: 'int',
                    required: true,
                    visible: true,
                    options: []
                },
                {
                    key: 'hasAdsFeature',
                    label: 'امكانية الاعلان',
                    value: null,
                    dataType: 'bool',
                    required: true,
                    visible: true,
                    options: []
                },
                {
                    key: 'hasMonthlyNotifications',
                    label: 'امكانية الاشعار الشهري',
                    value: null,
                    dataType: 'bool',
                    required: true,
                    visible: true,
                    options: []
                },
            ]
        };
    }
    PlanManagementAddComponent.prototype.ngOnInit = function () { };
    PlanManagementAddComponent.prototype.submit = function (event) {
        var _this = this;
        this.planSrv.add(event).subscribe(function (res) {
            _this.msgSrv.showMessage(res.message, res.succeeded);
            if (res.succeeded) {
                _this.router.navigate(['owner/plan-management/show']);
            }
        });
    };
    PlanManagementAddComponent = __decorate([
        core_1.Component({
            selector: 'plan-management-add',
            imports: [dynmaic_form_component_1.DynmaicFormComponent, common_1.CommonModule],
            templateUrl: './plan-management-add.component.html',
            styleUrl: './plan-management-add.component.scss'
        })
    ], PlanManagementAddComponent);
    return PlanManagementAddComponent;
}());
exports.PlanManagementAddComponent = PlanManagementAddComponent;
