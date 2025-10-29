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
exports.OfferManagementDetailComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var dynamic_input_component_1 = require("../../../../shared/components/dynamic-input/dynamic-input.component");
var primeng_shared_module_1 = require("../../../../shared/modules/shared/primeng-shared.module");
var OfferManagementDetailComponent = /** @class */ (function () {
    function OfferManagementDetailComponent(offerManagement, msgSrv, http, offerConditionSrv, router, route) {
        var _this = this;
        this.offerManagement = offerManagement;
        this.msgSrv = msgSrv;
        this.http = http;
        this.offerConditionSrv = offerConditionSrv;
        this.router = router;
        this.route = route;
        this.offerId = 0;
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
        /**
         * Dynamically handles form input changes and builds dependent fields.
         * When a user selects a value, this method:
         *  1. Finds and initializes the corresponding next input(s).
         *  2. Dynamically updates the form structure (FormControl, FormArray, FormGroup).
         *  3. Optionally fetches options from an API if defined.
         *  4. Supports recursive chaining of dependent inputs.
         */
        this.nextInputCommand = function (value, // Selected value from the current form input
        stepKey, // Current step or form section key
        groupIndex, // Index of the group inside FormArray
        element, // Metadata definition for the current input
        control) {
            var _a;
            var addNewControl = function (value, stepKey, groupIndex, element) {
                if (element) {
                    _this.objs[stepKey][groupIndex].push(element);
                    // Create a new reactive FormControl
                    var newControl_1 = new forms_1.FormControl(null);
                    // Subscribe recursively to handle nested dependencies
                    newControl_1.valueChanges.subscribe(function (newValue) {
                        _this.nextInputCommand(newValue, stepKey, groupIndex, element, newControl_1);
                    });
                    // Add control to the corresponding FormGroup inside FormArray
                    var stepControl = _this.form.get(stepKey);
                    if (stepControl instanceof forms_1.FormArray) {
                        var group = stepControl.at(groupIndex);
                        group.addControl(element.key, newControl_1);
                    }
                    newControl_1.setValue(value);
                }
            };
            // Exit early if the element definition is missing
            if (!element)
                return;
            // Find the "nextInput" configuration based on the selected option
            var nextInputs = (_a = element.options.find(function (opt) { return opt.id === value; })) === null || _a === void 0 ? void 0 : _a.nextInput;
            // Only proceed if we have next inputs defined
            if (nextInputs && nextInputs.length > 0) {
                /**
                 * CASE 1: Handle elements that define "addType"
                 * (used for dynamically adding new form arrays or grouped inputs)
                 */
                if (element.addType) {
                    element.addType.forEach(function (addType, addIndex) {
                        var _a, _b, _c, _d;
                        // --- Clean up any existing controls with the same key ---
                        var existingKeyIndex = _this.keys.findIndex(function (k) { return k.key === addType.key; });
                        if (existingKeyIndex > -1) {
                            _this.form.removeControl(addType.key);
                            delete _this.objs[addType.key];
                            delete _this.disableMap[addType.key];
                            delete _this.groupFirstInput[addType.key];
                            _this.keys.splice(existingKeyIndex, 1);
                        }
                        // --- Add new controls only if dataType is "list" ---
                        if (element.dataType === 'list') {
                            // Track metadata key for the newly added field
                            _this.keys.push({ key: addType.key, stepName: addType.stepName });
                            // Disable new section initially
                            _this.disableMap = __assign(__assign({}, _this.disableMap), (_a = {}, _a[addType.key] = true, _a));
                            // Store the structure for the newly added section
                            _this.objs = __assign(__assign({}, _this.objs), (_b = {}, _b[addType.key] = [[nextInputs[addIndex]]], _b));
                            // Create reactive control for the next input
                            var newControl_2 = new forms_1.FormControl(null);
                            // Subscribe to changes → recursively process deeper inputs
                            newControl_2.valueChanges.subscribe(function (newValue) {
                                if (element.addType) {
                                    _this.nextInputCommand(newValue, addType.key, 0, nextInputs[addIndex], newControl_2);
                                }
                            });
                            // Wrap control inside a FormGroup and then into a FormArray
                            var group = new forms_1.FormGroup((_c = {}, _c[nextInputs[addIndex].key] = newControl_2, _c));
                            var array = new forms_1.FormArray([group]);
                            // Add this dynamic array to the root form
                            _this.form.addControl(addType.key, array);
                            var newValue = _this.res[addType.key][groupIndex][nextInputs[addIndex].key];
                            newControl_2.setValue(value);
                            // Keep track of the first input metadata for this group
                            _this.groupFirstInput = __assign(__assign({}, _this.groupFirstInput), (_d = {}, _d[addType.key] = nextInputs[addIndex], _d));
                        }
                    });
                }
                else if (element.options.length > 0) {
                    /**
                     * CASE 2: Handle elements without "addType"
                     * These are standard dependent inputs (may load data from API or local options)
                     */
                    nextInputs.forEach(function (inputMeta) {
                        // --- If this input has an API source, fetch its options ---
                        if (inputMeta.source) {
                            _this.http.post(inputMeta.source, {}).subscribe(function (res) {
                                // Populate options from server response
                                inputMeta.options = res.data;
                                //get its own value
                                // Store metadata structure
                                addNewControl(_this.res[stepKey][groupIndex][inputMeta.key], stepKey, groupIndex, inputMeta);
                            });
                        }
                        // --- Otherwise, add static options directly ---
                        else {
                            addNewControl(_this.res[stepKey][groupIndex][inputMeta.key], stepKey, groupIndex, inputMeta);
                        }
                    });
                }
            }
            /**
             * CASE 3: No next input exists → enable current step again
             */
            if (!nextInputs || element.options.length === 0) {
                _this.disableMap[stepKey] = false;
            }
            /**
             * CASE 4: Disable the control if it's a list without addType
             * (prevents multiple triggers)
             */
            if (element.dataType === 'list' && !element.addType) {
                control === null || control === void 0 ? void 0 : control.disable({ emitEvent: false });
            }
        };
        this.route.params
            .pipe(rxjs_1.switchMap(function (param) {
            var _a;
            _this.offerId = param['id'];
            return offerManagement.getOne((_a = _this.offerId) !== null && _a !== void 0 ? _a : 0);
        }))
            .subscribe(function (res) {
            _this.res = res.data.rule;
            _this.metadata = _this.offerConditionSrv.offerConditionsobjs;
            _this.objs = { generalInfo: _this.metadata };
            _this.metadata.forEach(function (item) {
                var newControl = new forms_1.FormControl();
                newControl.valueChanges.subscribe(function (value) {
                    _this.nextInputCommand(value, 'generalInfo', 0, item, newControl);
                });
                _this.form.addControl('generalInfo', new forms_1.FormGroup({}));
                _this.form.controls['generalInfo'].addControl(item.key, newControl);
            });
            _this.keys.push({ stepName: 'معلومات عامة', key: 'generalInfo' });
            _this.startFill(_this.res['generalInfo']);
        });
        this.showForm = true;
    }
    OfferManagementDetailComponent.prototype.startFill = function (generalInfo) {
        var _this = this;
        Object.keys(generalInfo).forEach(function (key) {
            var control = _this.form.get('generalInfo.' + _this.lowerFirstChar(key));
            if (control)
                control.setValue(generalInfo[key]);
        });
    };
    OfferManagementDetailComponent.prototype.lowerFirstChar = function (text) {
        if (!text)
            return '';
        return text.charAt(0).toLocaleLowerCase() + text.slice(1);
    };
    OfferManagementDetailComponent.prototype.getControl = function (step, name, index) {
        var stepControl = this.form.get(step);
        var isArray = stepControl instanceof forms_1.FormArray;
        if (!isArray) {
            return stepControl === null || stepControl === void 0 ? void 0 : stepControl.get(name);
        }
        return stepControl.controls[index].get(name);
    };
    OfferManagementDetailComponent.prototype.isArray = function (step) {
        var stepControl = this.form.get(step);
        return stepControl instanceof forms_1.FormArray;
    };
    OfferManagementDetailComponent.prototype.addnewGroup = function (key) {
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
    OfferManagementDetailComponent.prototype.removeGroup = function (key, index) {
        this.objs[key].splice(index, 1);
        this.form.get(key).removeAt(index);
        if (this.objs[key].length === 0) {
            this.disableMap[key] = false;
        }
    };
    OfferManagementDetailComponent.prototype.onSelect = function (event) {
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var file = _a[_i];
            this.uploadedFiles.push(file);
        }
    };
    OfferManagementDetailComponent.prototype.onRemove = function (event) {
        var index = this.uploadedFiles.findIndex(function (x) { return x.name === event.file.name; });
        if (index > -1) {
            this.uploadedFiles.splice(index, 1);
        }
    };
    OfferManagementDetailComponent.prototype.submit = function () {
        var _this = this;
        this.offerManagement.add(this.form.getRawValue(), this.uploadedFiles).subscribe(function (res) {
            _this.msgSrv.showMessage(res.message, res.succeeded);
            if (res.succeeded)
                _this.router.navigate(['company/offer-management/show']);
        });
    };
    OfferManagementDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-offer-management-detail',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, dynamic_input_component_1.DynamicInputComponent, forms_1.FormsModule],
            templateUrl: './offer-management-detail.component.html',
            styleUrl: './offer-management-detail.component.scss'
        })
    ], OfferManagementDetailComponent);
    return OfferManagementDetailComponent;
}());
exports.OfferManagementDetailComponent = OfferManagementDetailComponent;
