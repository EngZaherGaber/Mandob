import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { catchError, of, switchMap } from 'rxjs';
import { ProductGeneralItemsComponent } from '../../../../general/components/product-general-items/product-general-items.component';
import { UsersGeneralItemsComponent } from '../../../../general/components/users-general-items/users-general-items.component';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { InfoTable } from '../../../../shared/interface/info-table';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { Return } from '../../../interfaces/return';
import { ClientReturnService } from '../../../services/client-return.service';

@Component({
  selector: 'app-client-return-management-show',
  imports: [DynamicTableComponent, PrimeNgSharedModule, ProductGeneralItemsComponent, UsersGeneralItemsComponent],
  templateUrl: './client-return-management-show.component.html',
  styleUrl: './client-return-management-show.component.scss',
})
export class ClientReturnManagementShowComponent {
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
      field: 'distributorName',
      header: 'الموزع',
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
      case 'ملغى':
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
  cancelFunc: (rowData: any) => void = (rowData: any) => {
    this.confirmationService.confirm({
      message: 'هل تريد رفض هذه الطلبية؟',
      header: 'رفض',
      icon: 'pi pi-info-circle',
      rejectLabel: 'الغاء',
      rejectButtonProps: {
        label: 'الغاء',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'تأكييد',
        severity: 'danger',
      },

      accept: () => {
        this.clientReturnSrv.cancel(rowData.returnRequestID).subscribe((res) => {
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
    private clientReturnSrv: ClientReturnService,
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
                return this.clientReturnSrv.getAll(this.requestId, body).pipe(
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
        this.tableConfig.Buttons[this.tableConfig.Buttons.length] = {
          isShow: true,
          tooltip: 'المنتجات',
          icon: 'pi pi-box',
          key: 'show',
          severity: 'contrast',
          command: (rowData: any) => {
            this.showItemsFunc(rowData);
          },
        };
        this.tableConfig.Buttons[this.tableConfig.Buttons.length] = {
          isShow: true,
          tooltip: 'المستخدمين',
          icon: 'pi pi-users',
          key: 'users',
          severity: 'contrast',
          command: (rowData: any) => {
            this.showUsersFunc(rowData);
          },
        };
        this.tableConfig.getSub$.next({});
      });
  }
  clostReturnDialog(event: any) {
    if (!event) this.selectedReturn.set(null);
  }
}
