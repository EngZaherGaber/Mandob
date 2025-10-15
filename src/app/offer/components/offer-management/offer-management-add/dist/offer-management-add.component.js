"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OfferManagementAddComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dynamic_input_component_1 = require("../../../../shared/components/dynamic-input/dynamic-input.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var OfferManagementAddComponent = /** @class */ (function () {
    function OfferManagementAddComponent(offerManagement, msgSrv, http, offerConditionSrv, router) {
        var _this = this;
        this.offerManagement = offerManagement;
        this.msgSrv = msgSrv;
        this.http = http;
        this.offerConditionSrv = offerConditionSrv;
        this.router = router;
        this.metadata = null;
        this.form = new forms_1.FormGroup({});
        this.objs = {};
        this.keys = [];
        this.disableMap = {};
        this.groupFirstInput = {};
        this.options = [];
        this.variants = [];
        this.uploadedFiles = [];
        this.showForm = false;
        this.nextInputCommand = function (value, step, index, elemnt, control) {
            var _a;
            if (elemnt) {
                var nextInput_1 = (_a = elemnt.options.find(function (x) { return x.id === value; })) === null || _a === void 0 ? void 0 : _a.nextInput;
                if (nextInput_1) {
                    if (elemnt === null || elemnt === void 0 ? void 0 : elemnt.addType) {
                        elemnt.addType.forEach(function (addType, index) {
                            var _a, _b, _c, _d;
                            if ((elemnt === null || elemnt === void 0 ? void 0 : elemnt.dataType) === 'list') {
                                _this.keys.push({ key: addType.key, stepName: addType.stepName });
                                _this.disableMap = __assign(__assign({}, _this.disableMap), (_a = {}, _a[addType.key] = true, _a));
                                _this.objs = __assign(__assign({}, _this.objs), (_b = {}, _b[addType.key] = [[nextInput_1[index]]], _b));
                                var newControl_1 = new forms_1.FormControl(null);
                                newControl_1.valueChanges.subscribe(function (value) {
                                    if (elemnt === null || elemnt === void 0 ? void 0 : elemnt.addType)
                                        _this.nextInputCommand(value, addType.key, 0, nextInput_1[index], newControl_1);
                                });
                                var group = new forms_1.FormGroup((_c = {}, _c[nextInput_1[index].key] = newControl_1, _c));
                                var arr = new forms_1.FormArray([group]);
                                _this.form.addControl(addType.key, arr);
                                _this.groupFirstInput = __assign(__assign({}, _this.groupFirstInput), (_d = {}, _d[addType.key] = nextInput_1[index], _d));
                            }
                        });
                    }
                    else {
                        if ((elemnt === null || elemnt === void 0 ? void 0 : elemnt.options.length) > 0) {
                            nextInput_1.forEach(function (inpt) {
                                if (inpt.source) {
                                    _this.http.post(inpt.source, {}).subscribe(function (res) {
                                        inpt.options = res.data;
                                        _this.objs[step][index].push(inpt);
                                        var newControl = new forms_1.FormControl(null);
                                        newControl.valueChanges.subscribe(function (value) {
                                            _this.nextInputCommand(value, step, index, inpt, newControl);
                                        });
                                        var stepControl = _this.form.get(step);
                                        if (stepControl instanceof forms_1.FormArray) {
                                            var orginalGroup = stepControl.controls[index];
                                            orginalGroup.addControl(inpt.key, newControl);
                                        }
                                    });
                                }
                                else {
                                    _this.objs[step][index].push(inpt);
                                    var newControl_2 = new forms_1.FormControl(null);
                                    newControl_2.valueChanges.subscribe(function (value) {
                                        _this.nextInputCommand(value, step, index, inpt, newControl_2);
                                    });
                                    var stepControl = _this.form.get(step);
                                    if (stepControl instanceof forms_1.FormArray) {
                                        var orginalGroup = stepControl.controls[index];
                                        orginalGroup.addControl(inpt.key, newControl_2);
                                    }
                                }
                            });
                        }
                    }
                }
                if (elemnt.options.length === 0 || !nextInput_1) {
                    _this.disableMap[step] = false;
                }
                if (elemnt.dataType === 'list') {
                    control === null || control === void 0 ? void 0 : control.disable({ emitEvent: false });
                }
            }
        };
        this.metadata = this.offerConditionSrv.offerConditionsobjs;
        this.objs = { generalInfo: [this.metadata] };
        var newControl = new forms_1.FormControl();
        newControl.valueChanges.subscribe(function (value) {
            _this.nextInputCommand(value, 'generalInfo', 0, _this.metadata, newControl);
        });
        this.form.addControl('generalInfo', new forms_1.FormGroup({}));
        this.form.controls['generalInfo'].addControl(this.metadata.key, newControl);
        this.keys.push({ stepName: 'معلومات عامة', key: 'generalInfo' });
        this.showForm = true;
    }
    OfferManagementAddComponent.prototype.getControl = function (step, name, index) {
        var stepControl = this.form.get(step);
        var isArray = stepControl instanceof forms_1.FormArray;
        if (!isArray) {
            return stepControl === null || stepControl === void 0 ? void 0 : stepControl.get(name);
        }
        return stepControl.controls[index].get(name);
    };
    OfferManagementAddComponent.prototype.isArray = function (step) {
        var stepControl = this.form.get(step);
        return stepControl instanceof forms_1.FormArray;
    };
    OfferManagementAddComponent.prototype.addnewGroup = function (key) {
        var _a;
        var _this = this;
        var index = this.objs[key].length;
        this.disableMap[key] = true;
        this.objs[key].push([this.groupFirstInput[key]]);
        var newControl = new forms_1.FormControl(null);
        newControl.valueChanges.subscribe(function (value) {
            _this.nextInputCommand(value, key, index, _this.groupFirstInput[key], newControl);
        });
        var group = new forms_1.FormGroup((_a = {}, _a[this.groupFirstInput[key].key] = newControl, _a));
        this.form.get(key).push(group);
    };
    OfferManagementAddComponent.prototype.removeGroup = function (key, index) {
        this.objs[key].splice(index, 1);
        this.form.get(key).removeAt(index);
    };
    OfferManagementAddComponent.prototype.onSelect = function (event) {
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var file = _a[_i];
            this.uploadedFiles.push(file);
        }
    };
    OfferManagementAddComponent.prototype.onRemove = function (event) {
        var index = this.uploadedFiles.findIndex(function (x) { return x.name === event.file.name; });
        if (index > -1) {
            this.uploadedFiles.splice(index, 1);
        }
    };
    OfferManagementAddComponent.prototype.submit = function () {
        console.log(this.form.getRawValue());
    };
    OfferManagementAddComponent = __decorate([
        core_1.Component({
            selector: 'app-offer-management-add',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, dynamic_input_component_1.DynamicInputComponent, forms_1.FormsModule],
            templateUrl: './offer-management-add.component.html',
            styleUrl: './offer-management-add.component.scss'
        })
    ], OfferManagementAddComponent);
    return OfferManagementAddComponent;
}());
exports.OfferManagementAddComponent = OfferManagementAddComponent;
