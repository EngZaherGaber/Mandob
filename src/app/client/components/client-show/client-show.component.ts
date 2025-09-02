import { Component } from '@angular/core';
import { ClientManagementService } from '../../services/client-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap, of, catchError } from 'rxjs';
import { DynamicCardListComponent } from '../../../shared/components/dynamic-card-list/dynamic-card-list.component';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { InfoTable } from '../../../shared/interface/info-table';
import { DyTableService } from '../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../shared/service/message-toast.service';

@Component({
  selector: 'app-client-show',
  imports: [DynamicTableComponent, DynamicCardListComponent, CommonModule],
  templateUrl: './client-show.component.html',
  styleUrl: './client-show.component.scss',
})
export class ClientShowComponent {
  tableConfig: InfoTable;
  type: 'table' | 'list' | string = '';
  columns = [
    {
      field: 'name',
      header: 'الاسم',
      HeaderType: 'string',
    },
    {
      field: 'email',
      header: 'الايميل',
      HeaderType: 'string',
    },
    {
      field: 'phoneNumber',
      header: 'رقم الهاتف',
      HeaderType: 'string',
    },
    {
      field: 'commercialRegistrationNumber',
      header: 'السجل التجاري',
      HeaderType: 'string',
    },
    {
      field: 'address',
      header: 'العنوان',
      HeaderType: 'string',
    },
    {
      field: 'isActive',
      header: 'فعال',
      HeaderType: 'Toggle',
    },
  ];
  columnsEvent = [
    {
      field: 'isActive',
      command: (event: any, field: string, rowData: any) => {
        this.changeState(rowData);
      },
    },
  ];
  changeState(rowData: any) {
    this.clientManagementSrv.changeStatus(rowData.userId).subscribe((res) => {
      if (res.succeeded) {
        this.msgSrv.showSuccess('تم تغير حالة المستخدم');
        this.tableConfig.getSub$.next({});
      }
    });
  }
  addFunc: () => void = () => {
    this.router.navigate(['owner/client-management/add']);
  };
  displayFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['owner/client-management/detail/display/' + rowData.userId]);
  };
  constructor(
    private tableSrv: DyTableService,
    private msgSrv: MessageToastService,
    private route: ActivatedRoute,
    private router: Router,
    private clientManagementSrv: ClientManagementService
  ) {
    this.tableConfig = tableSrv.getStandardInfo(undefined, undefined, this.displayFunc, this.addFunc);
    this.route.params.subscribe((param) => {
      this.type = param['type'];
      this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
        switchMap((body: any) => {
          if (body) {
            return this.clientManagementSrv.getAll(body).pipe(
              switchMap((res) =>
                of({
                  data: res.data,
                  columns: this.columns,
                  loading: false,
                  count: res.data.length,
                })
              ),
              catchError(() => of({ loading: false, data: [], columns: [] }))
            );
          }
          return of({ loading: false, data: [], columns: [] });
        })
      );
      this.tableConfig.getSub$.next({});
    });
  }
  ngOnInit() {}
}
