import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { catchError, of, switchMap } from 'rxjs';
import { Return } from '../../../../client/interfaces/return';
import { ProductGeneralItemsComponent } from '../../../../general/components/product-general-items/product-general-items.component';
import { UsersGeneralItemsComponent } from '../../../../general/components/users-general-items/users-general-items.component';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { InfoTable } from '../../../../shared/interface/info-table';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { DistributorReturnService } from '../../../services/distributor-return.service';

@Component({
  selector: 'app-distributor-return-management-show',
  imports: [DynamicTableComponent, PrimeNgSharedModule, ProductGeneralItemsComponent, UsersGeneralItemsComponent],
  templateUrl: './distributor-return-management-show.component.html',
  styleUrl: './distributor-return-management-show.component.scss',
})
export class DistributorReturnManagementShowComponent {
  tableConfig: InfoTable;
  requestId: number | null = null;
  selectedReturn = signal<Return | null>(null);
  items = computed(() => {
    const source = this.selectedReturn();
    if (source) {
      return source.items.map((x) => {
        return {
          variantName: x.variantName,
          quantity: x.quantity,
          reason: x.reason ?? ' ',
          originalPrice: x.refundPricePerUnit,
          totalFinalPrice: x.totalItemRefundAmount,
          finalPrice: x.totalItemRefundAmount,
        };
      });
    }
    return [];
  });
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
  usersVisible: boolean = false;
  showUsersFunc: (rowData: any) => void = (rowData: Return) => {
    this.selectedReturn.set(rowData);
    this.usersVisible = true;
  };
  recieveFunc: (rowData: any) => void = (rowData: any) => {
    this.confirmationService.confirm({
      message: 'هل تم استلام المنتجات؟',
      header: 'استلام',
      icon: 'pi pi-info-circle',
      rejectLabel: 'الغاء',
      rejectButtonProps: {
        label: 'الغاء',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'تأكييد',
        severity: 'success',
      },

      accept: () => {
        this.distributorReturnSrv.reciveItem(rowData.returnRequestID).subscribe((res) => {
          this.msgSrv.showMessage(res.message, res.succeeded);
          if (res.succeeded) this.tableConfig.getSub$.next({});
        });
      },
    });
  };
  rejectVisible: boolean = false;
  rejectFunc: (rowData: any) => void = (rowData: Return) => {
    this.selectedReturn.set(rowData);
    this.rejectVisible = true;
  };
  completeFunc: (rowData: any) => void = (rowData: any) => {
    this.confirmationService.confirm({
      message: 'هل تم الانتهاء من العملية؟',
      header: 'اكتمال',
      icon: 'pi pi-info-circle',
      rejectLabel: 'الغاء',
      rejectButtonProps: {
        label: 'الغاء',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'تأكييد',
        severity: 'success',
      },

      accept: () => {
        this.distributorReturnSrv.complete(rowData.returnRequestID).subscribe((res) => {
          this.msgSrv.showMessage(res.message, res.succeeded);
          if (res.succeeded) this.tableConfig.getSub$.next({});
        });
      },
    });
  };
  constructor(
    tableSrv: DyTableService,
    private route: ActivatedRoute,
    private msgSrv: MessageToastService,
    private confirmationService: ConfirmationService,
    private distributorReturnSrv: DistributorReturnService,
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
                return this.distributorReturnSrv.getAll(this.requestId, body).pipe(
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
          return of(null);
        }),
      )
      .subscribe((res) => {
        this.tableConfig.Buttons = [
          {
            isShow: false,
            showCommand: (rowData: any) => {
              return rowData.returnStatusName === 'تم استلام العنصر';
            },
            tooltip: 'اكتمال',
            icon: 'pi pi-check',
            key: 'show',
            severity: 'contrast',
            command: (rowData: any) => {
              this.completeFunc(rowData);
            },
          },
          {
            isShow: false,
            showCommand: (rowData: any) => {
              return rowData.returnStatusName === 'تمت الموافقة';
            },
            tooltip: 'استلام المنتجات',
            icon: 'pi pi-warehouse',
            key: 'show',
            severity: 'contrast',
            command: (rowData: any) => {
              this.recieveFunc(rowData);
            },
          },
          {
            isShow: false,
            showCommand: (rowData: any) => {
              return rowData.returnStatusName === 'تمت الموافقة';
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
        this.tableConfig.getSub$.next({});
      });
  }
  rejectReason(value: string) {
    const req = this.selectedReturn();
    if (req && value) {
      this.distributorReturnSrv
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
