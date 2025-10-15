import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { catchError, of, switchMap } from 'rxjs';
import { Request } from '../../../../client/interfaces/request';
import { UserStateService } from '../../../../general/services/user-state.service';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { InfoTable } from '../../../../shared/interface/info-table';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { DistributorRequestService } from '../../../services/distributor-request.service';

@Component({
  selector: 'app-distributor-req-management-show',
  imports: [DynamicTableComponent, PrimeNgSharedModule],
  templateUrl: './distributor-req-management-show.component.html',
  styleUrl: './distributor-req-management-show.component.scss',
})
export class DistributorReqManagementShowComponent {
  tableConfig: InfoTable;
  isWaiting: boolean = false;
  selectedRequest = signal<Request | null>(null);
  columns = [
    {
      field: 'requestDate',
      header: 'تاريخ الطلبية',
      headerType: 'datetime',
    },
    {
      field: 'clientName',
      header: 'الزبون',
      headerType: 'string',
    },
    {
      field: 'companyName',
      header: 'الشركة',
      headerType: 'string',
    },
    {
      field: 'status',
      header: 'الحالة',
      headerType: 'tag',
    },
  ];

  getSeverity: (rowData: any) => 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined = (
    rowData,
  ) => {
    switch (rowData.status) {
      case 'قيد المراجعة':
        return 'contrast';
      case 'جار تحضير الطلب':
      case 'قيد التوصيل':
      case 'تم التاكيد':
        return 'info';
      case 'مرفوض':
      case 'ملغى':
        return 'danger';

      default:
        return 'success';
    }
  };
  changeStatusVisible: boolean = false;
  status: { id: number; name: string }[] = [
    { id: 4, name: 'جار تحضير الطلب' },
    { id: 5, name: 'قيد التوصيل' },
    { id: 6, name: 'تم التوصيل' },
  ];
  changeStatusFunc: (rowData: any) => void = (rowData: any) => {
    this.selectedRequest.set(rowData);
    this.changeStatusVisible = true;
  };
  itemsVisible: boolean = false;
  showItemsFunc: (rowData: any) => void = (rowData: Request) => {
    this.selectedRequest.set(rowData);
    this.itemsVisible = true;
  };
  usersVisible: boolean = false;
  showUsersFunc: (rowData: any) => void = (rowData: Request) => {
    this.selectedRequest.set(rowData);
    this.usersVisible = true;
  };
  constructor(
    tableSrv: DyTableService,
    private route: ActivatedRoute,
    private msgSrv: MessageToastService,
    private confirmationService: ConfirmationService,
    private userState: UserStateService,
    private distributorRequestSrv: DistributorRequestService,
  ) {
    this.tableConfig = tableSrv.getStandardInfo(undefined, undefined, undefined, undefined);
    this.route.paramMap
      .pipe(
        switchMap((paramMap) => {
          this.isWaiting = paramMap.get('type') === 'waiting';
          this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
            switchMap((body: any) => {
              if (body) {
                return this.distributorRequestSrv.getAll(this.isWaiting, body).pipe(
                  switchMap((res) =>
                    of({
                      data: res.data,
                      columns: this.columns,
                      loading: false,
                      count: res.count,
                    }),
                  ),
                  catchError(() => of({ loading: false, data: [], columns: this.columns })),
                );
              }
              return of({ loading: false, data: [], columns: this.columns });
            }),
          );
          if (this.isWaiting) return of(this.status);
          else return of(null);
        }),
      )
      .subscribe((res) => {
        if (res) {
          this.status = res;
          this.tableConfig.Buttons = [
            {
              isShow: true,
              tooltip: 'المنتجات',
              icon: 'pi pi-box',
              key: 'show',
              severity: 'contrast',
              command: (rowData: any) => {
                this.showItemsFunc(rowData);
              },
            },
            {
              isShow: true,
              tooltip: 'المستخدمين',
              icon: 'pi pi-users',
              key: 'users',
              severity: 'contrast',
              command: (rowData: any) => {
                this.showUsersFunc(rowData);
              },
            },
            {
              isShow: false,
              showCommand: (rowData: Request) => {
                return this.isWaiting && rowData.status !== 'تم التوصيل';
              },
              tooltip: 'تغيير حالة',
              icon: 'pi pi-pencil',
              key: 'Edit',
              severity: 'contrast',
              command: (rowData: any) => {
                this.changeStatusFunc(rowData);
              },
            },
          ];
        }

        this.tableConfig.getSub$.next({});
      });
  }
  changeStatus(value: number) {
    const req = this.selectedRequest();
    if (value && req) {
      this.distributorRequestSrv.changeStatus(req.requestID, value).subscribe((res) => {
        this.msgSrv.showMessage(res.message, res.succeeded);
        this.changeStatusVisible = false;
        this.tableConfig.getSub$.next({});
      });
    }
  }
  clostReturnDialog(event: any) {
    if (!event) this.selectedRequest.set(null);
  }
}
