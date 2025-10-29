import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { catchError, of, switchMap } from 'rxjs';
import { Request } from '../../../../client/interfaces/request';
import { ProductGeneralItemsComponent } from '../../../../general/components/product-general-items/product-general-items.component';
import { UsersGeneralItemsComponent } from '../../../../general/components/users-general-items/users-general-items.component';
import { UserStateService } from '../../../../general/services/user-state.service';
import { ReviewDetailComponent } from '../../../../review/components/review-detail/review-detail.component';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { InfoTable } from '../../../../shared/interface/info-table';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { DistributorRequestService } from '../../../services/distributor-request.service';

@Component({
  selector: 'app-distributor-req-management-show',
  imports: [
    DynamicTableComponent,
    PrimeNgSharedModule,
    ReviewDetailComponent,
    FormsModule,
    ProductGeneralItemsComponent,
    UsersGeneralItemsComponent,
  ],
  templateUrl: './distributor-req-management-show.component.html',
  styleUrl: './distributor-req-management-show.component.scss',
})
export class DistributorReqManagementShowComponent {
  tableConfig: InfoTable;
  isWaiting: boolean = false;
  selectedRequest = signal<Request | null>(null);
  selectedRequestStatus: number | null = null;
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
      field: 'expectedDeliveryDate',
      header: 'التاريخ المتوقع للوصول',
      headerType: 'datetime',
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
  changeStatusVisible: boolean = false;
  status: { id: number; name: string }[] = [
    { id: 4, name: 'جار تحضير الطلب' },
    { id: 5, name: 'قيد التوصيل' },
    { id: 6, name: 'تم التوصيل' },
  ];
  changeStatusFunc: (rowData: Request) => void = (rowData: Request) => {
    this.selectedRequest.set(rowData);
    this.selectedRequestStatus = this.status.find((x) => x.name === rowData.status)?.id ?? null;
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
