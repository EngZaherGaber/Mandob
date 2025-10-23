import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { catchError, of, switchMap } from 'rxjs';
import { Request } from '../../../../client/interfaces/request';
import { Distributor } from '../../../../distributor/interfaces/distributor';
import { DistributorManagementService } from '../../../../distributor/services/distributor-management.service';
import { ProductGeneralItemsComponent } from '../../../../general/components/product-general-items/product-general-items.component';
import { UsersGeneralItemsComponent } from '../../../../general/components/users-general-items/users-general-items.component';
import { UserStateService } from '../../../../general/services/user-state.service';
import { ReviewDetailComponent } from '../../../../review/components/review-detail/review-detail.component';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { InfoTable } from '../../../../shared/interface/info-table';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { CompanyRequestService } from '../../../services/company-request.service';

@Component({
  selector: 'app-company-req-management-show',
  imports: [
    DynamicTableComponent,
    PrimeNgSharedModule,
    ReviewDetailComponent,
    ProductGeneralItemsComponent,
    UsersGeneralItemsComponent,
  ],
  templateUrl: './company-req-management-show.component.html',
  styleUrl: './company-req-management-show.component.scss',
})
export class CompanyReqManagementShowComponent {
  tableConfig: InfoTable;
  isWaiting: boolean = false;
  selectedRequest = signal<Request | null>(null);
  items = computed(() => {
    const source = this.selectedRequest();
    if (source) {
      return source.requestItems.map((x) => {
        return {
          variantName: x.variantName,
          quantity: x.quantity,
          originalPrice: x.originalPrice,
          totalFinalPrice: x.totalFinalPrice,
          finalPrice: x.finalPrice,
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
      field: 'distributorName',
      header: 'الموزع',
      headerType: 'string',
    },
    {
      field: 'status',
      header: 'الحالة',
      headerType: 'tag',
    },
    {
      field: 'isReviewed',
      header: 'تم تقييمه',
      headerType: 'bool',
    },
  ];
  distributors: Distributor[] = [];
  getSeverity: (rowData: any) => 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined = (
    rowData,
  ) => {
    switch (rowData.status) {
      case 'قيد المراجعة':
        return 'warn';
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
  assignDistributorVisible: boolean = false;
  assignDistributorFunc: (rowData: any) => void = (rowData: any) => {
    this.selectedRequest.set(rowData);
    this.assignDistributorVisible = true;
  };
  rejectFunc: (rowData: any) => void = (rowData: any) => {
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
        this.companyRequestSrv.reject(rowData.requestID).subscribe((res) => {
          this.msgSrv.showMessage(res.message, res.succeeded);
          if (res.succeeded) this.tableConfig.getSub$.next({});
        });
      },
    });
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
  reviewVisible: boolean = false;
  showReviewFunc: (rowData: any) => void = (rowData: Request) => {
    this.selectedRequest.set(rowData);
    this.reviewVisible = true;
  };
  constructor(
    tableSrv: DyTableService,
    private route: ActivatedRoute,
    private msgSrv: MessageToastService,
    private confirmationService: ConfirmationService,
    private distributorManagement: DistributorManagementService,
    private userState: UserStateService,
    private companyRequestSrv: CompanyRequestService,
  ) {
    this.tableConfig = tableSrv.getStandardInfo(undefined, undefined, undefined, undefined);
    this.route.paramMap
      .pipe(
        switchMap((paramMap) => {
          this.isWaiting = paramMap.get('type') === 'waiting';
          this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
            switchMap((body: any) => {
              if (body) {
                return this.companyRequestSrv.getAll(this.isWaiting, body).pipe(
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
          if (this.isWaiting)
            return this.distributorManagement.getAll({ rows: 5000, first: 0 }, this.userState.user()?.userId ?? 0);
          else return of(null);
        }),
      )
      .subscribe((res) => {
        this.tableConfig.Buttons = [
          {
            isShow: false,
            tooltip: 'اسناد موزع',
            showCommand: (rowData: any) => {
              return rowData.status === 'قيد المراجعة' || rowData.status === 'تم التأكيد';
            },
            icon: 'pi pi-truck',
            key: 'Edit',
            severity: 'contrast',
            command: (rowData: any) => {
              this.assignDistributorFunc(rowData);
            },
          },
          {
            isShow: false,
            showCommand: (rowData: Request) => {
              return rowData.status !== 'تم التوصيل' && this.isWaiting;
            },
            tooltip: 'رفض',
            icon: 'pi pi-times',
            key: 'reject',
            severity: 'contrast',
            command: (rowData: any) => {
              this.rejectFunc(rowData);
            },
          },
          {
            isShow: false,
            showCommand: (rowData: Request) => {
              return rowData.status === 'مكتمل' && !this.isWaiting && !!rowData.reviews;
            },
            tooltip: 'تقييم الزبون',
            icon: 'pi pi-comment',
            key: 'review',
            severity: 'contrast',
            command: (rowData: any) => {
              this.showReviewFunc(rowData);
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
        if (res) {
          this.distributors = res.data;
        }
        this.tableConfig.getSub$.next({});
      });
  }
  onRowExapnd(event: any) {
    console.log(event.requestItems);
  }
  assignDistributor(value: number, dexpectedDeliveryDate: number) {
    const req = this.selectedRequest();
    if (req && value) {
      this.companyRequestSrv
        .assignDistributor({
          requestId: req.requestID,
          distributorId: value,
          expectedDeliveryDate: dexpectedDeliveryDate,
        })
        .subscribe((res) => {
          this.msgSrv.showMessage(res.message, res.succeeded);
          this.assignDistributorVisible = false;
          this.tableConfig.getSub$.next({});
        });
    }
  }
  clostReturnDialog(event: any) {
    if (!event) this.selectedRequest.set(null);
  }
}
