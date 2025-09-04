import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DistributorManagementService } from '../../../services/distributor-management.service';
import { switchMap, of, catchError } from 'rxjs';
import { InfoTable } from '../../../../shared/interface/info-table';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { CommonModule } from '@angular/common';
import { DynamicViewComponent } from '../../../../shared/components/dynamic-view/dynamic-view.component';
import { UserStateService } from '../../../../general/services/user-state.service';

@Component({
  selector: 'app-distributor-show',
  imports: [DynamicViewComponent, CommonModule],
  templateUrl: './distributor-show.component.html',
  styleUrl: './distributor-show.component.scss',
})
export class DistributorShowComponent {
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
    this.distributorManagementSrv.changeStatus(rowData.userId).subscribe((res) => {
      if (res.succeeded) {
        this.msgSrv.showSuccess('تم تغير حالة المستخدم');
        this.tableConfig.getSub$.next({});
      }
    });
  }
  addFunc: () => void = () => {
    this.router.navigate(['company/distributor-management/add']);
  };
  editFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['company/distributor-management/detail/edit/' + rowData.userId]);
  };
  displayFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['company/distributor-management/detail/display/' + rowData.userId]);
  };
  constructor(
    private tableSrv: DyTableService,
    private userState: UserStateService,
    private msgSrv: MessageToastService,
    private route: ActivatedRoute,
    private router: Router,
    private distributorManagementSrv: DistributorManagementService
  ) {
    this.tableConfig = tableSrv.getStandardInfo(undefined, this.editFunc, this.displayFunc, this.addFunc);
    this.route.params.subscribe((param) => {
      this.type = param['type'];
      this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
        switchMap((body: any) => {
          if (body && userState.user?.userId) {
            return this.distributorManagementSrv.getAll(body, userState.user.userId).pipe(
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
