"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

exports.__esModule = true;
exports.DynamicTableComponent = void 0;

var common_1 = require("@angular/common");

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var ExcelJS = require("exceljs");

var file_saver_1 = require("file-saver");

var rxjs_1 = require("rxjs");

var primeng_shared_module_1 = require("../../modules/shared/primeng-shared.module");

var DynamicTableComponent =
/** @class */
function () {
  function DynamicTableComponent(tableSrv) {
    this.tableSrv = tableSrv;
    this.rowExpansionContent = null;
    this.load = new rxjs_1.Observable();
    this.tablePermission = "";
    this.buttons = [];
    this.historyPermission = "";
    this.title = "";
    this.imageField = "";
    this.sortColumn = "";
    this.tableName = "";
    this.uniqueState = "";
    this.dataKey = "id";
    this.scrollHeight = "55vh";
    this.expandedTable = false;

    this.changeColor = function () {};

    this.getSeverity = function () {
      return "secondary";
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
    this.carsoulPage = 1;
    this.columns = [];
    this.selectedColumns = [];
    this.havePermission = false;
    this.selectedItem = null;
    this.items = [];
  }

  DynamicTableComponent.prototype.ngOnInit = function () {};

  DynamicTableComponent.prototype.ngAfterContentInit = function () {
    var _this = this;

    this.load.subscribe(function (body) {
      if (_this.columnsEvent && _this.columnsEvent.length > 0) {
        _this.columnsEvent.forEach(function (col) {
          if (!col.visible) {
            col.visible = function (rowData) {
              return true;
            };
          }

          if (!col.disable) {
            col.disable = function (rowData) {
              return false;
            };
          }
        });
      }

      _this.tableSrv.repeairHeader(body.columns);

      if (body.data) {
        body.data = body.data.length > 0 ? body.data.map(function (row) {
          var arr = _this.buttons.map(function (button) {
            return __assign({}, button);
          });

          row = __assign(__assign({}, row), {
            buttons: arr
          });
          body.columns.filter(function (col) {
            return col.headerType.toLowerCase() === "datetime" || col.headerType.toLowerCase() === "datetimeo";
          }).forEach(function (col) {
            if (row[col.field]) {
              var date = new Date(row[col.field]);
              row[col.field] = date;
            } else {
              row[col.field] = null;
            }
          });
          return row;
        }) : body.data;

        if (_this.sortColumn) {
          body.data = body.data.sort(function (a, b) {
            var _a;

            return (_a = a[_this.sortColumn]) === null || _a === void 0 ? void 0 : _a.localeCompare(b[_this.sortColumn]);
          });
        }

        body.columns.filter(function (x) {
          return x.headerType === "json";
        }).forEach(function (x) {
          body.data = body.data.map(function (z) {
            z[x.field] = z[x.field] ? JSON.parse(z[x.field]) : {};
            return z;
          });
        });
      }

      _this.columns = body.columns.map(function (x) {
        return x.header;
      });
      _this.selectedColumns = _this.columns;
      _this.totalRecords = _this.lazyLoading ? body.count : body.data.length;
      _this.body = body;
      _this.items = _this.buttons.map(function (btn) {
        return {
          label: btn.tooltip,
          icon: btn.icon,
          visible: true,
          command: function command() {
            var _a;

            if (btn && btn.command) {
              btn.command(_this.selectedItem);

              _this.hitAction.emit({
                key: (_a = btn.key) !== null && _a !== void 0 ? _a : "",
                rowDataId: _this.selectedItem
              });
            }
          }
        };
      });
    });
  };

  DynamicTableComponent.prototype.ngAfterViewInit = function () {
    if (this.table && this.table.expandedRowKeys) {
      this.table.expandedRowKeys = {};
      var infoTable = void 0;

      if (infoTable && infoTable["expandedRowKeys"]) {
        infoTable["expandedRowKeys"] ? delete infoTable["expandedRowKeys"] : "";
      }
    } else {
      this.onLazy.emit(event);
    }
  };

  DynamicTableComponent.prototype.changeVisible = function () {
    var _this = this;

    this.items = this.buttons.map(function (btn) {
      var _a;

      return {
        label: btn.tooltip,
        icon: btn.icon,
        visible: _this.visibleBtn((_a = btn.isShow) !== null && _a !== void 0 ? _a : true, btn.permission, btn.showCommand),
        command: function command() {
          var _a;

          if (btn && btn.command) {
            btn.command(_this.selectedItem);

            _this.hitAction.emit({
              key: (_a = btn.key) !== null && _a !== void 0 ? _a : "",
              rowDataId: _this.selectedItem
            });
          }
        }
      };
    });
  };

  DynamicTableComponent.prototype.visibleBtn = function (isShow, permission, showCommand) {
    if (permission) {
      if (showCommand) {
        var y = showCommand(this.selectedItem);
        return y;
      } else {
        return isShow;
      }
    } else {
      if (showCommand) {
        return showCommand(this.selectedItem);
      } else {
        return isShow;
      }
    }
  };

  DynamicTableComponent.prototype.getFullDate = function (date) {
    var originalDate = new Date(date);
    var day = String(originalDate.getDate()).padStart(2, "0");
    var month = String(originalDate.getMonth() + 1).padStart(2, "0");
    var year = originalDate.getFullYear();
    var hours = String(originalDate.getHours()).padStart(2, "0");
    var minutes = String(originalDate.getMinutes()).padStart(2, "0");
    return year + "/" + month + "/" + day + " " + hours + ":" + minutes;
  };

  DynamicTableComponent.prototype.isSelect = function (header) {
    return this.selectedColumns.includes(header);
  };

  DynamicTableComponent.prototype.loadCarsLazy = function (event) {
    this.body.loading = true;
    this.body.columns.forEach(function (x) {
      if (x.headerType.toLowerCase().startsWith("datetime") && event.filters) {
        var filter = event.filters[x.field];
        if (filter && filter.value instanceof Date) event.filters[x.field].value = common_1.formatDate(filter.value, "yyyy-MM-dd", "en-US");
      }
    });
    this.onLazy.emit(event);
  };

  DynamicTableComponent.prototype.clearFilter = function () {
    var _a;

    (_a = this.table) === null || _a === void 0 ? void 0 : _a.reset();
  };

  DynamicTableComponent.prototype.exportExcel = function () {
    var _this = this;

    var _a, _b, _c;

    var arr = (_b = (_a = this.table) === null || _a === void 0 ? void 0 : _a.filteredValue) !== null && _b !== void 0 ? _b : (_c = this.table) === null || _c === void 0 ? void 0 : _c.value;

    if (arr && arr.length > 0) {
      // Filter and map data
      arr = arr.map(function (x) {
        var z = {};

        _this.body.columns.forEach(function (col) {
          if (_this.selectedColumns.includes(col.header)) z[col.header] = x[col.field];
        });

        return z;
      }); // Remove duplicate keys

      var filterData = arr.map(function (_a) {
        var buttons = _a.buttons,
            rest = __rest(_a, ["buttons"]);

        var seenKeys = new Set();
        return Object.keys(rest).reduce(function (acc, key) {
          var lowerCaseKey = key.toLowerCase();

          if (!seenKeys.has(lowerCaseKey)) {
            seenKeys.add(lowerCaseKey);
            acc[key] = rest[key];
          }

          return acc;
        }, {});
      }); // Create workbook and worksheet

      var workbook = new ExcelJS.Workbook();
      var worksheet_1 = workbook.addWorksheet("Sheet1"); // Add header row

      worksheet_1.addRow(Object.keys(filterData[0])); // Add data rows

      filterData.forEach(function (row) {
        worksheet_1.addRow(Object.values(row));
      }); // Write to a buffer and trigger download (browser)

      workbook.xlsx.writeBuffer().then(function (buffer) {
        var blob = new Blob([buffer], {
          type: "application/octet-stream"
        });
        file_saver_1.saveAs(blob, new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDay() + ".xlsx");
      });
    }
  };

  DynamicTableComponent.prototype.getImageValue = function (obj, path) {
    return path.split(".").reduce(function (acc, part) {
      return acc && acc[part];
    }, obj);
  };

  DynamicTableComponent.prototype.resetPaginator = function () {
    if (this.table) {
      this.table.first = 0;
    }
  };

  DynamicTableComponent.prototype.resetFilter = function () {
    if (this.table) {
      this.table.clear();
      this.filterdMode = false;
    }
  };

  DynamicTableComponent.prototype.handleChange = function (e, field, rowData) {
    var actionEl = this.columnsEvent.find(function (x) {
      return x.field.toLowerCase() === field.toLowerCase();
    });

    if (actionEl && actionEl.command) {
      actionEl.command(e, field, rowData);
    }
  };

  DynamicTableComponent.prototype.getTogglePermission = function (field) {
    var _a;

    return (_a = this.columnsEvent.find(function (x) {
      return x.field.toLowerCase() === field.toLowerCase();
    })) === null || _a === void 0 ? void 0 : _a.permission;
  };

  DynamicTableComponent.prototype.hasToggleShow = function (field, rowData) {
    var column = this.columnsEvent.find(function (x) {
      return x.field.toLowerCase() === field.toLowerCase();
    });

    if (column && typeof column.visible === "function") {
      return column.visible(rowData);
    }

    return null;
  };

  DynamicTableComponent.prototype.hasToggledisable = function (field, rowData) {
    var column = this.columnsEvent.find(function (x) {
      return x.field.toLowerCase() === field.toLowerCase();
    });

    if (column && typeof column.disable === "function") {
      return column.disable(field, rowData);
    }

    return null;
  };

  DynamicTableComponent.prototype.getCarosulPage = function () {
    return this.body.data[this.carsoulPage] ? [this.body.data[this.carsoulPage]] : [];
  };

  DynamicTableComponent.prototype.newPage = function (operation) {
    switch (operation) {
      case 1:
        if (this.carsoulPage + 1 >= this.body.data.length - 1) {
          this.carsoulPage = 1;
        } else {
          this.carsoulPage = this.carsoulPage + 1;
        }

        break;

      default:
        if (this.carsoulPage - 1 === 0) {
          this.carsoulPage = this.body.data.length - 1;
        } else {
          this.carsoulPage = this.carsoulPage - 1;
        }

        break;
    }
  };

  DynamicTableComponent.prototype.downloadJSON = function (jsonData) {
    this.tableSrv.downloadJSON(jsonData);
  };

  DynamicTableComponent.prototype.getCorrectDate = function (date) {
    return date;
  };

  DynamicTableComponent.prototype.getAlignment = function (column) {
    return this.tableSrv.getAlignment(column, this.columnAlignment, this.body.columns);
  };

  __decorate([core_1.ViewChild("dt")], DynamicTableComponent.prototype, "table");

  __decorate([core_1.ContentChild("rowExpansionContent", {
    "static": true
  })], DynamicTableComponent.prototype, "rowExpansionContent");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "load");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "tablePermission");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "buttons");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "historyPermission");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "title");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "imageField");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "sortColumn");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "tableName");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "uniqueState");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "dataKey");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "scrollHeight");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "expandedTable");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "changeColor");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "getSeverity");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "captionButton");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "columnsEvent");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "lazyLoading");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "showHeader");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "columnAlignment");

  __decorate([core_1.Input()], DynamicTableComponent.prototype, "currenciesColumn");

  __decorate([core_1.Output()], DynamicTableComponent.prototype, "hitAction");

  __decorate([core_1.Output()], DynamicTableComponent.prototype, "RowExpand");

  __decorate([core_1.Output()], DynamicTableComponent.prototype, "onLazy");

  DynamicTableComponent = __decorate([core_1.Component({
    selector: "dynamic-table",
    imports: [primeng_shared_module_1.PrimeNgSharedModule, forms_1.FormsModule],
    templateUrl: "./dynamic-table.component.html",
    styleUrl: "./dynamic-table.component.scss"
  })], DynamicTableComponent);
  return DynamicTableComponent;
}();

exports.DynamicTableComponent = DynamicTableComponent;