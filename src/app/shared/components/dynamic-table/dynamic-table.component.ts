import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { DyButton } from '../../interface/dy-button';
import { PrimeNgSharedModule } from '../../modules/shared/primeng-shared.module';
import { DyTableService } from '../../service/dy-table.service';

@Component({
  selector: 'dynamic-table',
  imports: [PrimeNgSharedModule, FormsModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
})
export class DynamicTableComponent {
  @ViewChild('dt') table: Table | undefined;
  @ContentChild('rowExpansionContent', { static: true })
  rowExpansionContent: TemplateRef<any> | null = null;
  @Input() load: Observable<any> = new Observable();
  @Input() tablePermission: string = '';
  @Input() buttons: DyButton[] = [];
  @Input() historyPermission: string = '';
  @Input() title: string = '';
  @Input() imageField: string = '';
  @Input() sortColumn: string = '';
  @Input() tableName: string = '';
  @Input() uniqueState: string = '';
  @Input() dataKey: string = 'id';
  @Input() scrollHeight: string = '55vh';
  @Input() expandedTable: boolean = false;
  @Input() changeColor: (rowData: any) => any = () => {};
  @Input() getSeverity: (
    rowData: any
  ) => 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined = () => {
    return 'secondary';
  };
  @Input() captionButton: DyButton[] = [];
  @Input() columnsEvent: {
    field: string;
    command?: (event: any, field: string, rowData: any) => void;
    permission?: string;
    visible?: (rowData: any) => boolean;
    disable?: (field: string, rowData: any) => boolean;
  }[] = [];
  @Input() lazyLoading: boolean = false;
  @Input() showHeader: boolean = false;
  @Input() columnAlignment: {
    column: string;
    alignment: 'right' | 'center';
  }[] = [];
  @Input() currenciesColumn: string[] = [];
  @Output() hitAction: EventEmitter<{ key: string; rowDataId: number }> = new EventEmitter<{
    key: string;
    rowDataId: number;
  }>();
  @Output() RowExpand: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLazy: EventEmitter<any> = new EventEmitter<any>();

  filterdMode: boolean = false;
  tb: Table | undefined;
  body: {
    loading: boolean;
    data: any[];
    columns: any[];
  } = {
    loading: true,
    data: [],
    columns: [],
  };
  first: number = 0;
  rows: number = 5;
  totalRecords: number = 0;
  carsoulPage: number = 1;
  columns: string[] = [];
  selectedColumns: string[] = [];
  havePermission: boolean = false;
  selectedItem: any | null = null;
  items: MenuItem[] = [];
  constructor(private tableSrv: DyTableService) {}

  ngOnInit(): void {}
  ngAfterContentInit(): void {
    this.load.subscribe((body) => {
      if (this.columnsEvent && this.columnsEvent.length > 0) {
        this.columnsEvent.forEach((col) => {
          if (!col.visible) {
            col.visible = (rowData) => true;
          }
          if (!col.disable) {
            col.disable = (rowData) => false;
          }
        });
      }
      this.tableSrv.repeairHeader(body.columns);
      if (body.data) {
        body.data =
          body.data.length > 0
            ? (body.data as any[]).map((row) => {
                const arr = this.buttons.map((button) => ({ ...button }));
                row = { ...row, buttons: arr };
                (body.columns as any[])
                  .filter(
                    (col) => col.HeaderType.toLowerCase() === 'datetime' || col.HeaderType.toLowerCase() === 'datetimeo'
                  )
                  .forEach((col) => {
                    if (row[col.field]) {
                      const date = new Date(row[col.field]);
                      row[col.field] = date;
                    } else {
                      row[col.field] = null;
                    }
                  });
                return row;
              })
            : body.data;
        if (this.sortColumn) {
          body.data = body.data.sort((a: any, b: any) => a[this.sortColumn]?.localeCompare(b[this.sortColumn]));
        }
        (body.columns as any[])
          .filter((x) => x.HeaderType === 'json')
          .forEach((x) => {
            body.data = (body.data as any[]).map((z) => {
              z[x.field] = z[x.field] ? JSON.parse(z[x.field]) : {};
              return z;
            });
          });
      }

      this.columns = (body.columns as any[]).map((x) => x.header);
      this.selectedColumns = this.columns;
      this.totalRecords = this.lazyLoading ? body.count : body.data.length;
      this.body = body;
      this.items = this.buttons.map((btn) => {
        return {
          label: btn.tooltip,
          icon: btn.icon,
          visible: true,
          command: () => {
            if (btn && btn.command) {
              btn.command(this.selectedItem);
              this.hitAction.emit({
                key: btn.key ?? '',
                rowDataId: this.selectedItem,
              });
            }
          },
        };
      });
    });
  }
  ngAfterViewInit() {
    if (this.table && this.table.expandedRowKeys) {
      this.table.expandedRowKeys = {};
      let infoTable;
      if (infoTable && infoTable['expandedRowKeys']) {
        infoTable['expandedRowKeys'] ? delete infoTable['expandedRowKeys'] : '';
      }
    } else {
      this.onLazy.emit(event);
    }
  }
  changeVisible() {
    this.items = this.buttons.map((btn) => {
      return {
        label: btn.tooltip,
        icon: btn.icon,
        visible: this.visibleBtn(btn.isShow ?? true, btn.permission, btn.showCommand),
        command: () => {
          if (btn && btn.command) {
            btn.command(this.selectedItem);
            this.hitAction.emit({
              key: btn.key ?? '',
              rowDataId: this.selectedItem,
            });
          }
        },
      };
    });
  }
  visibleBtn(isShow: boolean, permission?: string, showCommand?: (body: any) => boolean) {
    if (permission) {
      if (showCommand) {
        const y = showCommand(this.selectedItem);
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
  }
  getFullDate(date: string) {
    const originalDate: Date = new Date(date);
    const day = String(originalDate.getDate()).padStart(2, '0');
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const year = originalDate.getFullYear();
    const hours = String(originalDate.getHours()).padStart(2, '0');
    const minutes = String(originalDate.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }
  isSelect(header: string): boolean {
    return this.selectedColumns.includes(header);
  }
  loadCarsLazy(event: any) {
    this.onLazy.emit(event);
  }
  clearFilter() {
    this.table?.reset();
  }
  exportExcel() {
    //   let arr = this.table?.filteredValue ?? this.table?.value;
    //   if (arr && arr.length > 0) {
    //     // Filter and map data
    //     arr = arr.map((x) => {
    //       let z: any = {};
    //       this.body.columns.forEach((col: any) => {
    //         if (this.selectedColumns.includes(col.header)) z[col.header] = x[col.field];
    //       });
    //       return z;
    //     });
    //     // Remove duplicate keys
    //     const filterData = arr.map(({ buttons, ...rest }) => {
    //       const seenKeys = new Set<string>();
    //       return Object.keys(rest).reduce((acc, key) => {
    //         const lowerCaseKey = key.toLowerCase();
    //         if (!seenKeys.has(lowerCaseKey)) {
    //           seenKeys.add(lowerCaseKey);
    //           acc[key] = rest[key];
    //         }
    //         return acc;
    //       }, {} as { [key: string]: any });
    //     });
    //     // Create workbook and worksheet
    //     const workbook = new ExcelJS.Workbook();
    //     const worksheet = workbook.addWorksheet('Sheet1');
    //     // Add header row
    //     worksheet.addRow(Object.keys(filterData[0]));
    //     // Add data rows
    //     filterData.forEach((row) => {
    //       worksheet.addRow(Object.values(row));
    //     });
    //     // Write to a buffer and trigger download (browser)
    //     workbook.xlsx.writeBuffer().then((buffer) => {
    //       const blob = new Blob([buffer], { type: 'application/octet-stream' });
    //       saveAs(blob, `${this.tableName}.xlsx`);
    //     });
    //   }
  }
  getImageValue(obj: any, path: string) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
  resetPaginator() {
    if (this.table) {
      this.table.first = 0;
    }
  }
  resetFilter() {
    if (this.table) {
      this.table.clear();
      this.filterdMode = false;
    }
  }

  handleChange(e: any, field: string, rowData: any) {
    const actionEl = this.columnsEvent.find((x) => x.field.toLowerCase() === field.toLowerCase());
    if (actionEl && actionEl.command) {
      actionEl.command(e, field, rowData);
    }
  }
  getTogglePermission(field: string) {
    return this.columnsEvent.find((x) => x.field.toLowerCase() === field.toLowerCase())?.permission;
  }

  hasToggleShow(field: string, rowData: any) {
    const column = this.columnsEvent.find((x) => x.field.toLowerCase() === field.toLowerCase());
    if (column && typeof column.visible === 'function') {
      return column.visible(rowData);
    }
    return null;
  }
  hasToggledisable(field: string, rowData: any) {
    const column = this.columnsEvent.find((x) => x.field.toLowerCase() === field.toLowerCase());
    if (column && typeof column.disable === 'function') {
      return column.disable(field, rowData);
    }
    return null;
  }
  getCarosulPage() {
    return this.body.data[this.carsoulPage] ? [this.body.data[this.carsoulPage]] : [];
  }
  newPage(operation: number) {
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
  }
  downloadJSON(jsonData: string) {
    this.tableSrv.downloadJSON(jsonData);
  }
  getCorrectDate(date: Date) {
    return date;
  }

  getAlignment(column: string) {
    return this.tableSrv.getAlignment(column, this.columnAlignment, this.body.columns);
  }
}
