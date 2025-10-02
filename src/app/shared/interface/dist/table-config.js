"use strict";
exports.__esModule = true;
exports.TableConfig = void 0;
var core_1 = require("@angular/core");
var dy_table_service_1 = require("../service/dy-table.service");
var TableConfig = /** @class */ (function () {
    function TableConfig(init) {
        this.tablePermission = '';
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
        this.columnsEvent = [];
        this.lazyLoading = false;
        this.showHeader = false;
        this.columnsAlignment = [];
        this.currenciesColumn = [];
        var tableSrv = core_1.inject(dy_table_service_1.DyTableService);
        this.tableConfig = tableSrv.getStandardInfo(undefined, undefined, undefined, undefined);
        Object.assign(this, init);
    }
    return TableConfig;
}());
exports.TableConfig = TableConfig;
