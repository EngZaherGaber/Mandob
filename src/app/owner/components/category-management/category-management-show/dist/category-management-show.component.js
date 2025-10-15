"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoryManagementShowComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var dynamic_view_component_1 = require("../../../../shared/components/dynamic-view/dynamic-view.component");
var CategoryManagementShowComponent = /** @class */ (function () {
    function CategoryManagementShowComponent(tableSrv, msgSrv, router, confirmationService, categoryManagement) {
        var _this = this;
        this.tableSrv = tableSrv;
        this.msgSrv = msgSrv;
        this.router = router;
        this.confirmationService = confirmationService;
        this.categoryManagement = categoryManagement;
        this.imageField = '';
        this.type = 'table';
        this.columns = [
            {
                field: 'name',
                header: 'اسم التصنيف',
                headerType: 'string'
            },
        ];
        this.addFunc = function () {
            _this.router.navigate(['owner/category-management/add']);
        };
        this.editFunc = function (rowData) {
            _this.router.navigate(['owner/category-management/detail/edit/' + rowData.id]);
        };
        this.displayFunc = function (rowData) {
            _this.router.navigate(['owner/category-management/detail/display/' + rowData.id]);
        };
        this.deleteFunc = function (rowData) {
            _this.confirmationService.confirm({
                message: 'هل تريد حذف هذه الحساب؟',
                header: 'حذف الحساب',
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
                    _this.categoryManagement["delete"](rowData.id).subscribe(function (res) {
                        _this.msgSrv.showMessage(res.message, res.succeeded);
                        if (res.succeeded)
                            _this.tableConfig.getSub$.next({});
                    });
                }
            });
        };
        this.tableConfig = tableSrv.getStandardInfo(this.deleteFunc, this.editFunc, this.displayFunc, this.addFunc);
    }
    CategoryManagementShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tableConfig.get$ = this.tableConfig.getSub$.pipe(rxjs_1.switchMap(function (body) {
            if (body) {
                return _this.categoryManagement.getAll(body).pipe(rxjs_1.switchMap(function (res) {
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
    };
    CategoryManagementShowComponent = __decorate([
        core_1.Component({
            selector: 'category-management-show',
            imports: [dynamic_view_component_1.DynamicViewComponent, common_1.CommonModule],
            templateUrl: './category-management-show.component.html',
            styleUrl: './category-management-show.component.scss'
        })
    ], CategoryManagementShowComponent);
    return CategoryManagementShowComponent;
}());
exports.CategoryManagementShowComponent = CategoryManagementShowComponent;
