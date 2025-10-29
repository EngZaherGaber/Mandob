"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CollectionManagementShowComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var dynamic_view_component_1 = require("../../../../shared/components/dynamic-view/dynamic-view.component");
var CollectionManagementShowComponent = /** @class */ (function () {
    function CollectionManagementShowComponent(tableSrv, msgSrv, userState, router, confirmationService, collectionManagement) {
        var _this = this;
        this.msgSrv = msgSrv;
        this.userState = userState;
        this.router = router;
        this.confirmationService = confirmationService;
        this.collectionManagement = collectionManagement;
        this.imageField = 'collectionImageUrl';
        this.columns = [
            {
                field: 'isActive',
                header: 'فعال',
                headerType: 'toggle'
            },
            {
                field: 'name',
                header: 'الاسم',
                headerType: 'string'
            },
            {
                field: 'description',
                header: 'الوصف',
                headerType: 'string'
            },
        ];
        this.columnsEvent = [
            {
                field: 'isActive',
                command: function (event, field, rowData) {
                    _this.changeState(rowData);
                }
            },
        ];
        this.addFunc = function () {
            _this.router.navigate(['company/collection-management/add']);
        };
        this.editFunc = function (rowData) {
            _this.router.navigate(['company/collection-management/detail/edit/' + rowData.id]);
        };
        this.displayFunc = function (rowData) {
            _this.router.navigate(['company/collection-management/detail/display/' + rowData.id]);
        };
        this.changeState = function (rowData) {
            _this.confirmationService.confirm({
                message: 'هل تريد تغيير حالة هذا المجموعة؟',
                header: 'تغيير حالة المجموعة',
                icon: 'pi pi-info-circle',
                rejectLabel: 'الغاء',
                rejectButtonProps: {
                    label: 'الغاء',
                    severity: 'secondary',
                    outlined: true
                },
                acceptButtonProps: {
                    label: 'تاكيد',
                    severity: 'danger'
                },
                accept: function () {
                    _this.collectionManagement.changeStatus(rowData.id).subscribe(function (res) {
                        _this.msgSrv.showMessage(res.message, res.succeeded);
                        _this.tableConfig.getSub$.next({});
                    });
                }
            });
        };
        this.deleteFunc = function (rowData) {
            _this.confirmationService.confirm({
                message: 'هل تريد حذف هذه المجموعة؟',
                header: 'حذف المجموعة',
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
                    _this.collectionManagement["delete"](rowData.id).subscribe(function (res) {
                        _this.msgSrv.showMessage(res.message, res.succeeded);
                        _this.tableConfig.getSub$.next({});
                    });
                }
            });
        };
        this.tableConfig = tableSrv.getStandardInfo(this.deleteFunc, this.editFunc, this.displayFunc, this.addFunc);
    }
    CollectionManagementShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tableConfig.get$ = this.tableConfig.getSub$.pipe(rxjs_1.switchMap(function (body) {
            var user = _this.userState.user();
            if (body && user && user.userId) {
                return _this.collectionManagement.getAll(body, user.userId).pipe(rxjs_1.switchMap(function (res) {
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
    CollectionManagementShowComponent = __decorate([
        core_1.Component({
            selector: 'collection-management-show',
            imports: [dynamic_view_component_1.DynamicViewComponent],
            templateUrl: './collection-management-show.component.html',
            styleUrl: './collection-management-show.component.scss'
        })
    ], CollectionManagementShowComponent);
    return CollectionManagementShowComponent;
}());
exports.CollectionManagementShowComponent = CollectionManagementShowComponent;
