"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DistributorDetailComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var dynmaic_form_component_1 = require("../../../../shared/components/dynmaic-form/dynmaic-form.component");
var DistributorDetailComponent = /** @class */ (function () {
    function DistributorDetailComponent(router, route, distributorManagement, msgSrv) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.distributorManagement = distributorManagement;
        this.msgSrv = msgSrv;
        this.resetObjs = {};
        this.type = '';
        this.distributor = null;
        this.isShow = false;
        this.route.params
            .pipe(rxjs_1.switchMap(function (param) {
            _this.type = param['type'];
            _this.isShow = _this.type === 'display';
            return _this.distributorManagement.getOne(param['id']);
        }))
            .subscribe(function (res) {
            _this.distributor = res.data;
            _this.resetObjs = {
                general: [
                    {
                        key: 'name',
                        label: 'الاسم',
                        value: _this.distributor.name,
                        dataType: 'string',
                        required: true,
                        visible: true,
                        options: []
                    },
                    {
                        key: 'email',
                        label: 'الايميل',
                        value: _this.distributor.email,
                        dataType: 'string',
                        required: true,
                        visible: true,
                        options: []
                    },
                ]
            };
        });
    }
    DistributorDetailComponent.prototype.ngOnInit = function () { };
    DistributorDetailComponent.prototype.submit = function (event) {
        var _this = this;
        if (this.distributor && this.distributor.userId) {
            this.distributorManagement.edit(this.distributor.userId, event).subscribe(function (res) {
                if (res.succeeded) {
                    _this.router.navigate(['company/distributor-management/show']);
                }
            });
        }
    };
    DistributorDetailComponent = __decorate([
        core_1.Component({
            selector: 'distributor-management-detail',
            imports: [dynmaic_form_component_1.DynmaicFormComponent],
            templateUrl: './distributor-management-detail.component.html',
            styleUrl: './distributor-management-detail.component.scss'
        })
    ], DistributorDetailComponent);
    return DistributorDetailComponent;
}());
exports.DistributorDetailComponent = DistributorDetailComponent;
