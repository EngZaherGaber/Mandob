import { Component, ContentChild, EventEmitter, Inject, Input, Output, PLATFORM_ID, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { UserStateService } from '../../../general/services/user-state.service';
import { BodyTable } from '../../interface/body-table';
import { columnAlignment } from '../../interface/columns-alignment';
import { DyButton } from '../../interface/dy-button';
import { EventColumn } from '../../interface/event-column';
import { PrimeNgSharedModule } from '../../modules/shared/primeng-shared.module';
import { DyTableService } from '../../service/dy-table.service';

@Component({
  selector: 'dynamic-card-list',
  imports: [FormsModule, PrimeNgSharedModule],
  templateUrl: './dynamic-card-list.component.html',
  styleUrl: './dynamic-card-list.component.scss',
})
export class DynamicCardListComponent {
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
  @Input() layout: 'grid' | 'list' = 'grid';
  @Input() changeColor: (rowData: any) => any = () => {};
  @Input() getSeverity: (
    rowData: any,
  ) => 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined = () => {
    return 'secondary';
  };
  @Input() captionButton: DyButton[] = [];
  @Input() columnsEvent: EventColumn[] = [];
  @Input() lazyLoading: boolean = false;
  @Input() showHeader: boolean = false;
  @Input() columnAlignment: columnAlignment[] = [];
  @Input() currenciesColumn: string[] = [];
  @Output() hitAction: EventEmitter<{ key: string; rowDataId: number }> = new EventEmitter<{
    key: string;
    rowDataId: number;
  }>();
  @Output() RowExpand: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLazy: EventEmitter<any> = new EventEmitter<any>();

  filterdMode: boolean = false;
  tb: Table | undefined;
  body: BodyTable = {
    loading: true,
    data: [],
    columns: [],
  };
  first: number = 0;
  rows: number = 5;
  totalRecords: number = 0;
  screenWidth = window.innerWidth;
  carsoulPage: number = 1;
  columns: string[] = [];
  selectedColumns: string[] = [];
  havePermission: boolean = false;
  show: boolean = false;
  selectedItem: any | null = null;
  items: MenuItem[] = [];

  options = ['list', 'grid'];
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private tableSrv: DyTableService,
    private userState: UserStateService,
  ) {}
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
                  .filter((col) => col.headerType === 'datetime')
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
          .filter((x) => x.headerType === 'json')
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
      this.columnsEvent;
      this.columns;
    });
  }
  loadCarsLazy(event: any) {
    if (this.userState) {
      this.onLazy.emit(event);
    }
  }
  getAlignment(column: string) {
    return this.tableSrv.getAlignment(column, this.columnAlignment, this.body.columns);
  }
  hasToggleShow(field: string, rowData: any) {
    const column = this.columnsEvent.find((x) => x.field.toLowerCase() === field.toLowerCase());
    if (column && typeof column.visible === 'function') {
      console.log(column.visible(rowData));
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
  handleChange(e: any, field: string, rowData: any) {
    const actionEl = this.columnsEvent.find((x) => x.field.toLowerCase() === field.toLowerCase());
    if (actionEl && actionEl.command) {
      actionEl.command(e, field, rowData);
    }
  }
  getImageValue(obj: any, path: string) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
  downloadJSON(jsonData: string) {
    this.tableSrv.downloadJSON(jsonData);
  }
}
