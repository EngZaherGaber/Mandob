"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DynamicViewComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var primeng_shared_module_1 = require("../../modules/shared/primeng-shared.module");
var dynamic_card_list_component_1 = require("../dynamic-card-list/dynamic-card-list.component");
var dynamic_table_component_1 = require("../dynamic-table/dynamic-table.component");
var DynamicViewComponent = /** @class */ (function () {
    function DynamicViewComponent() {
        this.load = new rxjs_1.Observable();
        this.tablePermission = '';
        this.buttons = [];
        this.historyPermission = '';
        this.title = '';
        this.imageField = '';
        this.sortColumn = '';
        this.tableName = '';
        this.uniqueState = '';
        this.dataKey = 'id';
        this.scrollHeight = '55vh';
        this.expandedTable = false;
        this.changeColor = function () { };
        this.getSeverity = function () {
            return 'secondary';
        };
        this.captionButton = [];
        this.columnsEvent = [];
        this.lazyLoading = false;
        this.showHeader = false;
        this.columnAlignment = [];
        this.currenciesColumn = [];
        this.onLazy = new core_1.EventEmitter();
        this.layout = 'table';
        this.options = ['list', 'grid', 'table'];
    }
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "load");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "tablePermission");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "buttons");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "historyPermission");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "title");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "imageField");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "sortColumn");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "tableName");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "uniqueState");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "dataKey");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "scrollHeight");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "expandedTable");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "changeColor");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "getSeverity");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "captionButton");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "columnsEvent");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "lazyLoading");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "showHeader");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "columnAlignment");
    __decorate([
        core_1.Input()
    ], DynamicViewComponent.prototype, "currenciesColumn");
    __decorate([
        core_1.Output()
    ], DynamicViewComponent.prototype, "onLazy");
    DynamicViewComponent = __decorate([
        core_1.Component({
            selector: 'dynamic-view',
            imports: [dynamic_table_component_1.DynamicTableComponent, dynamic_card_list_component_1.DynamicCardListComponent, common_1.CommonModule, primeng_shared_module_1.PrimeNgSharedModule, forms_1.FormsModule],
            templateUrl: './dynamic-view.component.html',
            styleUrl: './dynamic-view.component.scss'
        })
    ], DynamicViewComponent);
    return DynamicViewComponent;
}());
exports.DynamicViewComponent = DynamicViewComponent;
