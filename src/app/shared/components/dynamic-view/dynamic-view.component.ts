import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { DyButton } from '../../interface/dy-button';
import { PrimeNgSharedModule } from '../../modules/shared/primeng-shared.module';
import { DynamicCardListComponent } from '../dynamic-card-list/dynamic-card-list.component';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';

@Component({
  selector: 'dynamic-view',
  imports: [DynamicTableComponent, DynamicCardListComponent, CommonModule, PrimeNgSharedModule, FormsModule],
  templateUrl: './dynamic-view.component.html',
  styleUrl: './dynamic-view.component.scss',
})
export class DynamicViewComponent {
  @Input() withList: boolean = true;
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
    rowData: any,
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
  @Output() onLazy: EventEmitter<any> = new EventEmitter<any>();
  layout: 'grid' | 'list' | 'table' = 'table';
  options = ['list', 'grid', 'table'];
}
