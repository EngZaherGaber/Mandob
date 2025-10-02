import { inject } from '@angular/core';
import { DyTableService } from '../service/dy-table.service';
import { columnAlignment } from './columns-alignment';
import { EventColumn } from './event-column';
import { InfoTable } from './info-table';

export class TableConfig {
  tableConfig: InfoTable;
  tablePermission: string = '';
  historyPermission: string = '';
  title: string = '';
  imageField: string = '';
  sortColumn: string = '';
  tableName: string = '';
  uniqueState: string = '';
  dataKey: string = 'id';
  scrollHeight: string = '55vh';
  expandedTable: boolean = false;
  changeColor: (rowData: any) => any = () => {};
  getSeverity: (rowData: any) => 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined = () => {
    return 'secondary';
  };
  columnsEvent: EventColumn[] = [];
  lazyLoading: boolean = false;
  showHeader: boolean = false;
  columnsAlignment: columnAlignment[] = [];
  currenciesColumn: string[] = [];
  constructor(init?: Partial<TableConfig>) {
    const tableSrv = inject(DyTableService);
    this.tableConfig = tableSrv.getStandardInfo(undefined, undefined, undefined, undefined);
    Object.assign(this, init);
  }
}
