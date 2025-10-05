"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DynamicInputComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var primeng_shared_module_1 = require("../../modules/shared/primeng-shared.module");
var DynamicInputComponent = /** @class */ (function () {
    function DynamicInputComponent() {
        this.object = {
            key: '',
            value: null,
            label: '',
            dataType: '',
            required: false,
            visible: false,
            options: []
        };
        this.FEcontrol = new forms_1.FormControl('');
        this.items = [];
        this.arabicPattern = /^[\u0600-\u06FF\s]+$/;
        this.nonArabicPattern = /^[^\u0600-\u06FF]+$/;
        this.numberPlusPattern = /^[0-9+]+$/;
        this.now = new Date();
        var today = new Date();
        var month = today.getMonth();
        var year = today.getFullYear();
        var prevMonth = month === 0 ? 11 : month - 1;
        var prevYear = prevMonth === 11 ? year - 1 : year;
        var nextMonth = month === 11 ? 0 : month + 1;
        var nextYear = nextMonth === 0 ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);
    }
    DynamicInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a, _b;
        console.log(this.FEcontrol);
        if (this.FEcontrol.value === null && this.FEcontrol.value !== 0) {
            if (this.object.dataType.toLowerCase() === 'autocomplete') {
                this.items;
                var value = (_a = this.object.options) === null || _a === void 0 ? void 0 : _a.find(function (x) { return x.id === _this.FEcontrol.value; });
                value ? (this.autoCompleteValue = value) : '';
            }
            else if (this.object.dataType.toLowerCase() === 'float' || this.object.dataType.toLowerCase() === 'int') {
                this.FEcontrol.setValue(0);
            }
            else if (this.object.dataType.toLowerCase() === 'bool') {
                this.FEcontrol.setValue(false);
            }
            else if (this.object.dataType.toLowerCase() === 'datetime') {
                this.FEcontrol.setValue(new Date());
            }
            else if (this.object.dataType.toLowerCase() === 'year' || this.object.dataType.toLowerCase() === 'month') {
                if (this.object.dataType.toLowerCase() === 'year') {
                    this.autoCompleteValue = new Date();
                    this.FEcontrol.setValue(new Date().getFullYear());
                }
                else {
                    // this.FEcontrol.setValue(this.autoCompleteValue);
                    this.autoCompleteValue = new Date();
                    this.FEcontrol.setValue(new Date().getMonth() + 1);
                }
            }
        }
        else {
            if (this.object.dataType.toLowerCase() === 'list') {
                if (this.FEcontrol.value && this.FEcontrol.value.id === 0) {
                    this.FEcontrol.setValue(this.FEcontrol.value.id);
                }
            }
            else if (this.object.dataType.toLowerCase() === 'autocomplete') {
                this.items;
                this.autoCompleteValue = (_b = this.object.options) === null || _b === void 0 ? void 0 : _b.find(function (x) { return x.id === _this.FEcontrol.value; });
            }
            else if (this.object.dataType.toLowerCase() === 'datetime') {
                var va = new Date(this.FEcontrol.value);
                this.FEcontrol.setValue(va);
            }
            else if (this.object.dataType.toLowerCase() === 'year' || this.object.dataType.toLowerCase() === 'month') {
                var type = this.object.dataType.toLowerCase() === 'year' ? 'yy' : 'mm';
                if (this.object.dataType.toLowerCase() === 'year') {
                    this.autoCompleteValue = new Date();
                }
                else {
                    this.autoCompleteValue = new Date();
                }
                var yy = this.autoCompleteValue.getFullYear();
                var mm = this.autoCompleteValue.getMonth() + 1;
                this.FEcontrol.setValue(type === 'mm' ? mm : yy);
            }
        }
        this.object = this.repeairLabel(this.object);
    };
    DynamicInputComponent.prototype.repeairLabel = function (obj) {
        obj.label = obj.label.replace(/([a-z])([A-Z])/g, '$1 $2');
        if (obj.label.toLowerCase().endsWith(' id')) {
            obj.label = obj.label.slice(0, -3);
        }
        obj.label = obj.label.replace('_', ' ');
        obj.label = obj.label.charAt(0).toUpperCase() + obj.label.slice(1);
        return obj;
    };
    DynamicInputComponent.prototype.getSuggestions = function (event) {
        var _a;
        this.items = (_a = this.object.options) === null || _a === void 0 ? void 0 : _a.filter(function (x) { return x.name.toLowerCase().includes(event.query.toLowerCase()); }).sort(function (a, b) { return a.name.localeCompare(b.name); });
    };
    DynamicInputComponent.prototype.selectValue = function (event) {
        this.autoCompleteValue = event;
        this.FEcontrol.setValue(event.id);
    };
    DynamicInputComponent.prototype.selectDate = function (event) {
        this.FEcontrol.setValue(new Date(new Date(event).setHours(3)));
    };
    DynamicInputComponent.prototype.selectYM = function (event, type) {
        var date = new Date(event);
        var yy = date.getFullYear();
        var mm = date.getMonth() + 1;
        this.FEcontrol.setValue(type === 'mm' ? mm : yy);
    };
    DynamicInputComponent.prototype.disableAutoComplete = function () {
        return this.FEcontrol.disabled;
    };
    DynamicInputComponent.prototype.filterList = function (event, drop) {
        var _a;
        var searchValue = event.filter ? event.filter.toLowerCase().replace(/\s+/g, '') : null;
        if (drop) {
            if (searchValue) {
                drop.options = (_a = this.object.options) === null || _a === void 0 ? void 0 : _a.filter(function (x) {
                    return x.name.toLowerCase().replace(/\s+/g, '').includes(searchValue);
                });
            }
            else {
                drop.options = drop.options;
            }
        }
    };
    DynamicInputComponent.prototype.preventSpace = function (event, controlValue) {
        if (event.code === 'Space' && controlValue === 0) {
            event.preventDefault();
        }
    };
    __decorate([
        core_1.Input()
    ], DynamicInputComponent.prototype, "object");
    __decorate([
        core_1.Input()
    ], DynamicInputComponent.prototype, "FEcontrol");
    DynamicInputComponent = __decorate([
        core_1.Component({
            selector: 'dynamic-input',
            imports: [forms_1.ReactiveFormsModule, primeng_shared_module_1.PrimeNgSharedModule, forms_1.FormsModule],
            templateUrl: './dynamic-input.component.html',
            styleUrl: './dynamic-input.component.scss'
        })
    ], DynamicInputComponent);
    return DynamicInputComponent;
}());
exports.DynamicInputComponent = DynamicInputComponent;
