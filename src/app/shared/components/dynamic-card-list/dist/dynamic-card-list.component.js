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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.DynamicCardListComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var primeng_shared_module_1 = require("../../modules/shared/primeng-shared.module");
var DynamicCardListComponent = /** @class */ (function () {
    function DynamicCardListComponent(platformId, tableSrv, userState) {
        this.platformId = platformId;
        this.tableSrv = tableSrv;
        this.userState = userState;
        this.rowExpansionContent = null;
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
        this.layout = 'grid';
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
        this.hitAction = new core_1.EventEmitter();
        this.RowExpand = new core_1.EventEmitter();
        this.onLazy = new core_1.EventEmitter();
        this.filterdMode = false;
        this.body = {
            loading: true,
            data: [],
            columns: []
        };
        this.first = 0;
        this.rows = 5;
        this.totalRecords = 0;
        this.screenWidth = window.innerWidth;
        this.carsoulPage = 1;
        this.columns = [];
        this.selectedColumns = [];
        this.havePermission = false;
        this.show = false;
        this.selectedItem = null;
        this.items = [];
        this.options = ['list', 'grid'];
    }
    DynamicCardListComponent.prototype.ngOnInit = function () { };
    DynamicCardListComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.load.subscribe(function (body) {
            if (_this.columnsEvent && _this.columnsEvent.length > 0) {
                _this.columnsEvent.forEach(function (col) {
                    if (!col.visible) {
                        col.visible = function (rowData) { return true; };
                    }
                    if (!col.disable) {
                        col.disable = function (rowData) { return false; };
                    }
                });
            }
            _this.tableSrv.repeairHeader(body.columns);
            if (body.data) {
                body.data =
                    body.data.length > 0
                        ? body.data.map(function (row) {
                            var arr = _this.buttons.map(function (button) { return (__assign({}, button)); });
                            row = __assign(__assign({}, row), { buttons: arr });
                            body.columns
                                .filter(function (col) { return col.headerType === 'datetime'; })
                                .forEach(function (col) {
                                if (row[col.field]) {
                                    var date = new Date(row[col.field]);
                                    row[col.field] = date;
                                }
                                else {
                                    row[col.field] = null;
                                }
                            });
                            return row;
                        })
                        : body.data;
                if (_this.sortColumn) {
                    body.data = body.data.sort(function (a, b) { var _a; return (_a = a[_this.sortColumn]) === null || _a === void 0 ? void 0 : _a.localeCompare(b[_this.sortColumn]); });
                }
                body.columns
                    .filter(function (x) { return x.headerType === 'json'; })
                    .forEach(function (x) {
                    body.data = body.data.map(function (z) {
                        z[x.field] = z[x.field] ? JSON.parse(z[x.field]) : {};
                        return z;
                    });
                });
            }
            _this.columns = body.columns.map(function (x) { return x.header; });
            _this.selectedColumns = _this.columns;
            _this.totalRecords = _this.lazyLoading ? body.count : body.data.length;
            _this.body = body;
            _this.items = _this.buttons.map(function (btn) {
                return {
                    label: btn.tooltip,
                    icon: btn.icon,
                    visible: true,
                    command: function () {
                        var _a;
                        if (btn && btn.command) {
                            btn.command(_this.selectedItem);
                            _this.hitAction.emit({
                                key: (_a = btn.key) !== null && _a !== void 0 ? _a : '',
                                rowDataId: _this.selectedItem
                            });
                        }
                    }
                };
            });
            _this.columnsEvent;
            _this.columns;
        });
    };
    DynamicCardListComponent.prototype.loadCarsLazy = function (event) {
        if (this.userState) {
            this.onLazy.emit(event);
        }
    };
    DynamicCardListComponent.prototype.getAlignment = function (column) {
        return this.tableSrv.getAlignment(column, this.columnAlignment, this.body.columns);
    };
    DynamicCardListComponent.prototype.hasToggleShow = function (field, rowData) {
        var column = this.columnsEvent.find(function (x) { return x.field.toLowerCase() === field.toLowerCase(); });
        if (column && typeof column.visible === 'function') {
            console.log(column.visible(rowData));
            return column.visible(rowData);
        }
        return null;
    };
    DynamicCardListComponent.prototype.hasToggledisable = function (field, rowData) {
        var column = this.columnsEvent.find(function (x) { return x.field.toLowerCase() === field.toLowerCase(); });
        if (column && typeof column.disable === 'function') {
            return column.disable(field, rowData);
        }
        return null;
    };
    DynamicCardListComponent.prototype.handleChange = function (e, field, rowData) {
        var actionEl = this.columnsEvent.find(function (x) { return x.field.toLowerCase() === field.toLowerCase(); });
        if (actionEl && actionEl.command) {
            actionEl.command(e, field, rowData);
        }
    };
    DynamicCardListComponent.prototype.getImageValue = function (obj, path) {
        return path.split('.').reduce(function (acc, part) { return acc && acc[part]; }, obj);
    };
    DynamicCardListComponent.prototype.downloadJSON = function (jsonData) {
        this.tableSrv.downloadJSON(jsonData);
    };
    __decorate([
        core_1.ContentChild('rowExpansionContent', { static: true })
    ], DynamicCardListComponent.prototype, "rowExpansionContent");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "load");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "tablePermission");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "buttons");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "historyPermission");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "title");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "imageField");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "sortColumn");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "tableName");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "uniqueState");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "dataKey");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "scrollHeight");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "expandedTable");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "layout");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "changeColor");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "getSeverity");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "captionButton");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "columnsEvent");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "lazyLoading");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "showHeader");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "columnAlignment");
    __decorate([
        core_1.Input()
    ], DynamicCardListComponent.prototype, "currenciesColumn");
    __decorate([
        core_1.Output()
    ], DynamicCardListComponent.prototype, "hitAction");
    __decorate([
        core_1.Output()
    ], DynamicCardListComponent.prototype, "RowExpand");
    __decorate([
        core_1.Output()
    ], DynamicCardListComponent.prototype, "onLazy");
    DynamicCardListComponent = __decorate([
        core_1.Component({
            selector: 'dynamic-card-list',
            imports: [forms_1.FormsModule, primeng_shared_module_1.PrimeNgSharedModule],
            templateUrl: './dynamic-card-list.component.html',
            styleUrl: './dynamic-card-list.component.scss'
        }),
        __param(0, core_1.Inject(core_1.PLATFORM_ID))
    ], DynamicCardListComponent);
    return DynamicCardListComponent;
}());
exports.DynamicCardListComponent = DynamicCardListComponent;
