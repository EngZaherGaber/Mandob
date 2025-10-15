import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { Return } from '../../../../client/interfaces/return';
import { Distributor } from '../../../../distributor/interfaces/distributor';
import { DistributorManagementService } from '../../../../distributor/services/distributor-management.service';
import { UserStateService } from '../../../../general/services/user-state.service';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { InfoTable } from '../../../../shared/interface/info-table';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { CompanyReturnService } from '../../../services/company-return.service';

@Component({
  selector: 'app-comp-return-management-show',
  imports: [DynamicTableComponent, PrimeNgSharedModule],
  templateUrl: './comp-return-management-show.component.html',
  styleUrl: './comp-return-management-show.component.scss',
})
export class CompReturnManagementShowComponent {
  tableConfig: InfoTable;
  requestId: number | null = null;
  selectedReturn = signal<Return | null>(null);
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
      field: 'distributorName',
      header: 'الموزع',
      headerType: 'string',
    },
    {
      field: 'returnStatusName',
      header: 'الحالة',
      headerType: 'tag',
    },
    {
      field: 'requestDate',
      header: 'تاريخ',
      headerType: 'datetime',
    },
    {
      field: 'totalRefundAmount',
      header: 'مبلغ الارجاع',
      headerType: 'float',
    },
    {
      field: 'notes',
      header: 'ملاحظة',
      headerType: 'string',
    },
  ];
  getSeverity: (rowData: any) => 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined = (
    rowData,
  ) => {
    switch (rowData.returnStatusName) {
      case 'قيد المراجعة':
        return 'secondary';
      case 'تمت الموافقة':
        return 'info';
      case 'مرفوض':
        return 'danger';

      default:
        return 'success';
    }
  };
  itemsVisible: boolean = false;
  showItemsFunc: (rowData: any) => void = (rowData: Return) => {
    this.selectedReturn.set(rowData);
    this.itemsVisible = true;
  };
  rejectVisible: boolean = false;
  rejectFunc: (rowData: any) => void = (rowData: Return) => {
    this.selectedReturn.set(rowData);
    this.rejectVisible = true;
  };
  usersVisible: boolean = false;
  showUsersFunc: (rowData: any) => void = (rowData: Return) => {
    this.selectedReturn.set(rowData);
    this.usersVisible = true;
  };
  distributors: Distributor[] = [];
  assignDistributorVisible: boolean = false;
  assignDistributorFunc: (rowData: any) => void = (rowData: any) => {
    this.selectedReturn.set(rowData);
    this.assignDistributorVisible = true;
  };

  constructor(
    tableSrv: DyTableService,
    private route: ActivatedRoute,
    private msgSrv: MessageToastService,
    private userState: UserStateService,
    private distributorManagement: DistributorManagementService,
    private companyReturnSrv: CompanyReturnService,
  ) {
    this.tableConfig = tableSrv.getStandardInfo(undefined, undefined, undefined, undefined);
    this.route.paramMap
      .pipe(
        switchMap((paramMap) => {
          const requestIdString = paramMap.get('requestId');
          this.requestId = requestIdString ? +requestIdString : null;
          this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
            switchMap((body: any) => {
              if (body) {
                return this.companyReturnSrv.getAll(this.requestId, body).pipe(
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
          return this.distributorManagement.getAll({ rows: 5000, first: 0 }, this.userState.user()?.userId ?? 0);
        }),
      )
      .subscribe((res) => {
        this.tableConfig.Buttons = [
          {
            isShow: false,
            showCommand: (rowData: any) => {
              return rowData.returnStatusName === 'قيد المراجعة';
            },
            tooltip: 'موافقة',
            icon: 'pi pi-check',
            key: 'show',
            severity: 'contrast',
            command: (rowData: any) => {
              this.assignDistributorFunc(rowData);
            },
          },
          {
            isShow: false,
            showCommand: (rowData: any) => {
              return rowData.returnStatusName === 'قيد المراجعة';
            },
            tooltip: 'رفض',
            icon: 'pi pi-times',
            key: 'show',
            severity: 'contrast',
            command: (rowData: any) => {
              this.rejectFunc(rowData);
            },
          },
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
        ];
        this.distributors = res.data;
        this.tableConfig.getSub$.next({});
      });
  }
  assignDistributor(value: number) {
    const req = this.selectedReturn();
    if (req && value) {
      this.companyReturnSrv.approve({ returnRequestId: req.returnRequestID, distributorId: value }).subscribe((res) => {
        this.msgSrv.showMessage(res.message, res.succeeded);
        this.assignDistributorVisible = false;
        this.tableConfig.getSub$.next({});
      });
    }
  }
  rejectReason(value: string) {
    debugger;
    const req = this.selectedReturn();
    if (req && value) {
      this.companyReturnSrv
        .reject({ returnRequestId: req.returnRequestID, rejectionReason: value })
        .subscribe((res) => {
          this.msgSrv.showMessage(res.message, res.succeeded);
          this.rejectVisible = false;
          this.tableConfig.getSub$.next({});
        });
    }
  }
  clostReturnDialog(event: any) {
    if (!event) this.selectedReturn.set(null);
  }
}
