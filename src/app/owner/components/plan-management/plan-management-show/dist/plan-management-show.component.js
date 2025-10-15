"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlanManagementShowComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var dynamic_view_component_1 = require("../../../../shared/components/dynamic-view/dynamic-view.component");
var PlanManagementShowComponent = /** @class */ (function () {
    function PlanManagementShowComponent(tableSrv, msgSrv, confirmationService, route, router, planManagement) {
        var _this = this;
        this.tableSrv = tableSrv;
        this.msgSrv = msgSrv;
        this.confirmationService = confirmationService;
        this.route = route;
        this.router = router;
        this.planManagement = planManagement;
        this.imageField = '';
        this.type = 'table';
        this.columns = [
            {
                field: 'planName',
                header: 'اسم الباقة',
                headerType: 'string'
            },
            {
                field: 'price',
                header: 'السعر',
                headerType: 'int'
            },
            {
                field: 'maxRequestsPerMonth',
                header: 'اقصى عدد منتجات بالشهر',
                headerType: 'int'
            },
            {
                field: 'maxDistributors',
                header: 'عدد الموزعين',
                headerType: 'int'
            },
            {
                field: 'priorityWeight',
                header: 'الوزن',
                headerType: 'int'
            },
            {
                field: 'hasAdsFeature',
                header: 'امكانية الاعلان',
                headerType: 'bool'
            },
            {
                field: 'hasMonthlyNotifications',
                header: 'امكانية الاشعار الشهري',
                headerType: 'bool'
            },
        ];
        this.addFunc = function () {
            _this.router.navigate(['owner/plan-management/add']);
        };
        this.editFunc = function (rowData) {
            _this.router.navigate(['owner/plan-management/detail/edit/' + rowData.planID]);
        };
        this.displayFunc = function (rowData) {
            _this.router.navigate(['owner/plan-management/detail/display/' + rowData.planID]);
        };
        this.deleteFunc = function (rowData) {
            _this.confirmationService.confirm({
                message: 'هل تريد حذف هذه الخطة؟',
                header: 'حذف الخطة',
                icon: 'pi pi-info-circle',
                rejectLabel: 'الغاء',
                rejectButtonProps: {
                    label: 'الغاء',
                    severity: 'secondary',
                    outlined: true
                },
                acceptButtonProps: {
                    label: 'تأكييد',
                    severity: 'danger'
                },
                accept: function () {
                    _this.planManagement["delete"](rowData.planID).subscribe(function (res) {
                        _this.msgSrv.showMessage(res.message, res.succeeded);
                        if (res.succeeded)
                            _this.tableConfig.getSub$.next({});
                    });
                }
            });
        };
        this.tableConfig = tableSrv.getStandardInfo(this.deleteFunc, this.editFunc, this.displayFunc, this.addFunc);
    }
    PlanManagementShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (param) {
            _this.type = param['type'];
            _this.tableConfig.get$ = _this.tableConfig.getSub$.pipe(rxjs_1.switchMap(function (body) {
                if (body) {
                    return _this.planManagement.getAll(body).pipe(rxjs_1.switchMap(function (res) {
                        return rxjs_1.of({
                            data: res.data,
                            columns: _this.columns,
                            loading: false,
                            count: res.count
                        });
                    }), rxjs_1.catchError(function () { return rxjs_1.of({ loading: false, data: [], columns: _this.columns }); }));
                }
                return rxjs_1.of({ loading: false, data: [], columns: _this.columns });
            }));
        });
    };
    PlanManagementShowComponent = __decorate([
        core_1.Component({
            selector: 'plan-management-show',
            imports: [dynamic_view_component_1.DynamicViewComponent, common_1.CommonModule],
            templateUrl: './plan-management-show.component.html',
            styleUrl: './plan-management-show.component.scss'
        })
    ], PlanManagementShowComponent);
    return PlanManagementShowComponent;
}());
exports.PlanManagementShowComponent = PlanManagementShowComponent;
