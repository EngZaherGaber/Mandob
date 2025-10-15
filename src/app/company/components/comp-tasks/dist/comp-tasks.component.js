"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompTasksComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var primeng_shared_module_1 = require("../../../shared/modules/shared/primeng-shared.module");
var CompTasksComponent = /** @class */ (function () {
    function CompTasksComponent(stateSrv, router, msgSrv, companyRequestSrv) {
        var _this = this;
        this.stateSrv = stateSrv;
        this.router = router;
        this.msgSrv = msgSrv;
        this.companyRequestSrv = companyRequestSrv;
        this.result = [];
        this.get$ = new rxjs_1.Subject();
        this.getSub$ = new rxjs_1.Observable();
        this.getSub$ = this.get$.pipe(rxjs_1.switchMap(function (res) {
            return _this.companyRequestSrv.myTask().pipe(rxjs_1.switchMap(function (res) {
                if (res.succeeded) {
                    _this.result = res.data;
                }
                return rxjs_1.of(null);
            }));
        }));
        this.getSub$.subscribe(function (res) { });
        this.get$.next(true);
    }
    CompTasksComponent.prototype.goToTask = function (taskId, relatedEntityId) {
        switch (taskId) {
            case 1:
                this.router.navigate(['company/request-management/waiting/show']);
                break;
            default:
                this.router.navigate(['company/return-management/show']);
                break;
        }
    };
    CompTasksComponent = __decorate([
        core_1.Component({
            selector: 'comp-tasks',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, forms_1.FormsModule],
            templateUrl: './comp-tasks.component.html',
            styleUrl: './comp-tasks.component.scss'
        })
    ], CompTasksComponent);
    return CompTasksComponent;
}());
exports.CompTasksComponent = CompTasksComponent;
