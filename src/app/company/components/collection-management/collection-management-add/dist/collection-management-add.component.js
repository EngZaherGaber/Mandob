"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CollectionManagementAddComponent = void 0;
var core_1 = require("@angular/core");
var dynmaic_form_component_1 = require("../../../../shared/components/dynmaic-form/dynmaic-form.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var CollectionManagementAddComponent = /** @class */ (function () {
    function CollectionManagementAddComponent(collectionManagement, router, msgSrv) {
        this.collectionManagement = collectionManagement;
        this.router = router;
        this.msgSrv = msgSrv;
        this.resetObjs = {};
        this.uploadedFiles = [];
        this.activeIndex = 0;
        this.stepsList = [{ label: 'المعلومات العامة' }, { label: 'الصورة' }];
        this.resetObjs = {
            generalInfo: [
                {
                    key: 'collectionName',
                    label: 'اسم المجموعة',
                    value: null,
                    dataType: 'string',
                    required: true,
                    visible: true,
                    options: []
                },
                {
                    key: 'description',
                    label: 'وصف المجموعة',
                    value: null,
                    dataType: 'string',
                    required: true,
                    visible: true,
                    options: []
                },
            ],
            image: []
        };
    }
    CollectionManagementAddComponent.prototype.ngOnInit = function () { };
    CollectionManagementAddComponent.prototype.onSelect = function (event) {
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var file = _a[_i];
            this.uploadedFiles.push(file);
        }
    };
    CollectionManagementAddComponent.prototype.onRemove = function (event) {
        var index = this.uploadedFiles.findIndex(function (x) { return x.name === event.file.name; });
        if (index > -1) {
            this.uploadedFiles.splice(index, 1);
        }
    };
    CollectionManagementAddComponent.prototype.submit = function (event) {
        var _this = this;
        var body = event.generalInfo;
        this.collectionManagement.add(body, this.uploadedFiles).subscribe(function (res) {
            if (res.succeeded) {
                _this.router.navigate(['company/collection-management/show']);
            }
        });
    };
    CollectionManagementAddComponent = __decorate([
        core_1.Component({
            selector: 'collection-management-add',
            imports: [dynmaic_form_component_1.DynmaicFormComponent, primeng_shared_module_1.PrimeNgSharedModule],
            templateUrl: './collection-management-add.component.html',
            styleUrl: './collection-management-add.component.scss'
        })
    ], CollectionManagementAddComponent);
    return CollectionManagementAddComponent;
}());
exports.CollectionManagementAddComponent = CollectionManagementAddComponent;
