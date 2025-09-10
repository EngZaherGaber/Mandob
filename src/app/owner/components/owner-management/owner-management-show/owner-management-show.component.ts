import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { DynamicViewComponent } from '../../../../shared/components/dynamic-view/dynamic-view.component';
import { InfoTable } from '../../../../shared/interface/info-table';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { OwnerManagementService } from '../../../services/owner-management.service';

@Component({
  selector: 'owner-management-show',
  imports: [DynamicViewComponent, CommonModule],
  templateUrl: './owner-management-show.component.html',
  styleUrl: './owner-management-show.component.scss',
})
export class OwnerManagementShowComponent {
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
    this.ownerManagement.changeStatus(rowData.userId).subscribe((res) => {
      if (res.succeeded) {
        this.msgSrv.showSuccess('تم تغير حالة المستخدم');
        this.tableConfig.getSub$.next({});
      }
    });
  }
  addFunc: () => void = () => {
    this.router.navigate(['owner/owner-management/add']);
  };
  editFunc: (rowData: any) => void = (rowData: any) => {
    rowData['image.imageUrl'];
    debugger;
    this.router.navigate(['owner/owner-management/detail/edit/' + rowData.userId]);
  };
  displayFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['owner/owner-management/detail/display/' + rowData.userId]);
  };
  constructor(
    private tableSrv: DyTableService,
    private msgSrv: MessageToastService,
    private route: ActivatedRoute,
    private router: Router,
    private ownerManagement: OwnerManagementService
  ) {
    this.tableConfig = tableSrv.getStandardInfo(undefined, this.editFunc, this.displayFunc, this.addFunc);
    this.route.params.subscribe((param) => {
      this.type = param['type'];
      this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
        switchMap((body: any) => {
          if (body) {
            return this.ownerManagement.getAll(body).pipe(
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
