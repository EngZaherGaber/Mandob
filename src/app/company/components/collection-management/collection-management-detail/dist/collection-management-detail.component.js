"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CollectionManagementDetailComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var dynmaic_form_component_1 = require("../../../../shared/components/dynmaic-form/dynmaic-form.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var CollectionManagementDetailComponent = /** @class */ (function () {
    function CollectionManagementDetailComponent(collectionManagement, fileSrv, router, route, msgSrv) {
        this.collectionManagement = collectionManagement;
        this.fileSrv = fileSrv;
        this.router = router;
        this.route = route;
        this.msgSrv = msgSrv;
        this.resetObjs = {};
        this.collectionId = 0;
        this.uploadedFiles = [];
        this.activeIndex = 0;
        this.isShow = false;
        this.stepsList = [{ label: 'المعلومات العامة' }, { label: 'الصورة' }];
        this.showForm = false;
    }
    CollectionManagementDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .pipe(operators_1.switchMap(function (param) {
            _this.collectionId = param['id'];
            _this.isShow = param['type'] === 'display';
            return _this.collectionManagement.getOne(_this.collectionId);
        }), operators_1.switchMap(function (res) {
            if (res && res.succeeded) {
                _this.resetObjs = {
                    generalInfo: [
                        {
                            key: 'collectionName',
                            label: 'اسم المجموعة',
                            value: res.data.collectionName,
                            dataType: 'string',
                            required: true,
                            visible: true,
                            options: []
                        },
                        {
                            key: 'description',
                            label: 'وصف المجموعة',
                            value: res.data.description,
                            dataType: 'string',
                            required: true,
                            visible: true,
                            options: []
                        },
                    ],
                    image: []
                };
                return _this.fileSrv.getImages([res.data.collectionImageUrl]);
            }
            return rxjs_1.of(false);
        }))
            .subscribe(function (res) {
            if (res && typeof res !== 'boolean') {
                _this.uploadedFiles = res;
                _this.showForm = true;
            }
        });
    };
    CollectionManagementDetailComponent.prototype.onSelect = function (event) {
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var file = _a[_i];
            this.uploadedFiles.push(file);
        }
    };
    CollectionManagementDetailComponent.prototype.onRemove = function (event) {
        if (!this.isShow) {
            var index = this.uploadedFiles.findIndex(function (x) { return x.name === event.file.name; });
            if (index > -1) {
                this.uploadedFiles.splice(index, 1);
            }
        }
    };
    CollectionManagementDetailComponent.prototype.submit = function (event) {
        var _this = this;
        var body = event.generalInfo;
        this.collectionManagement.edit(this.collectionId, body, this.uploadedFiles).subscribe(function (res) {
            if (res.succeeded) {
                _this.router.navigate(['company/collection-management/show']);
            }
        });
    };
    CollectionManagementDetailComponent = __decorate([
        core_1.Component({
            selector: 'collection-management-detail',
            imports: [dynmaic_form_component_1.DynmaicFormComponent, primeng_shared_module_1.PrimeNgSharedModule],
            templateUrl: './collection-management-detail.component.html',
            styleUrl: './collection-management-detail.component.scss'
        })
    ], CollectionManagementDetailComponent);
    return CollectionManagementDetailComponent;
}());
exports.CollectionManagementDetailComponent = CollectionManagementDetailComponent;
