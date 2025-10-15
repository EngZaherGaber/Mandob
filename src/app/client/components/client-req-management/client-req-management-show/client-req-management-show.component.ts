import { Component, computed, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { catchError, of, switchMap } from 'rxjs';
import { DynamicInputComponent } from '../../../../shared/components/dynamic-input/dynamic-input.component';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { InfoTable } from '../../../../shared/interface/info-table';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { Request } from '../../../interfaces/request';
import { ClientRequestService } from '../../../services/client-request.service';
import { ClientReturnService } from '../../../services/client-return.service';

@Component({
  selector: 'app-client-req-management-show',
  imports: [DynamicTableComponent, PrimeNgSharedModule, DynamicInputComponent],
  templateUrl: './client-req-management-show.component.html',
  styleUrl: './client-req-management-show.component.scss',
})
export class ClientReqManagementShowComponent {
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
      field: 'status',
      header: 'الحالة',
      headerType: 'tag',
    },
  ];
  objs: InputDynamic[] = [
    {
      key: 'requestItemID',
      label: 'الاسم',
      value: null,
      dataType: 'list',
      required: true,
      visible: false,
      options: this.selectedRequest()?.requestItems.map((x) => ({ id: x.requestItemID, name: x.variantName })) ?? [],
    },
    {
      key: 'variantName',
      label: 'المنتج',
      value: null,
      dataType: 'string',
      required: true,
      visible: true,
      options: [],
    },
    {
      key: 'quantityToReturn',
      label: 'كمية المرتجع',
      value: null,
      dataType: 'int',
      required: true,
      visible: true,
      options: [],
    },
    {
      key: 'reason',
      label: 'السبب',
      value: null,
      dataType: 'string',
      required: true,
      visible: true,
      options: [],
    },
  ];
  controlArray = computed(() => {
    const arr = this.selectedRequest()?.requestItems.map((x) => {
      const requestItemIDControl = new FormControl<number>(x.requestItemID);
      const variantNameControl = new FormControl<string>(x.variantName);
      variantNameControl.disable();
      const quantityToReturnControl = new FormControl<number>(0);
      const reasonControl = new FormControl<string>('');
      const group = new FormGroup({
        requestItemID: requestItemIDControl,
        variantName: variantNameControl,
        quantityToReturn: quantityToReturnControl,
        reason: reasonControl,
      });
      return group;
    });
    if (arr) {
      return new FormArray(arr);
    }
    return new FormArray([]);
  });
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
  returnVisible: boolean = false;
  returnFunc: (rowData: any) => void = (rowData: Request) => {
    this.selectedRequest.set(rowData);
    this.returnVisible = true;
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
        this.clientRequestSrv.complete(rowData.requestID).subscribe((res) => {
          this.msgSrv.showMessage(res.message, res.succeeded);
          if (res.succeeded) {
          }
        });
      },
    });
  };
  cancelFunc: (rowData: any) => void = (rowData: any) => {
    this.confirmationService.confirm({
      message: 'هل تريد الغاء الطلبية؟',
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
        severity: 'danger',
      },

      accept: () => {
        this.clientRequestSrv.cancel(rowData.requestID).subscribe((res) => {
          this.msgSrv.showMessage(res.message, res.succeeded);
          if (res.succeeded) this.tableConfig.getSub$.next({});
        });
      },
    });
  };
  constructor(
    tableSrv: DyTableService,
    private route: ActivatedRoute,
    private clientRequestSrv: ClientRequestService,
    private msgSrv: MessageToastService,
    private confirmationService: ConfirmationService,
    private clientReturnSrv: ClientReturnService,
  ) {
    this.tableConfig = tableSrv.getStandardInfo(undefined, undefined, undefined, undefined);
    this.route.paramMap
      .pipe(
        switchMap((paramMap) => {
          this.isWaiting = paramMap.get('type') === 'waiting';
          this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
            switchMap((body: any) => {
              if (body) {
                return this.clientRequestSrv.getAll(this.isWaiting, body).pipe(
                  switchMap((res) => {
                    return of({
                      data: res.data,
                      columns: this.columns,
                      loading: false,
                      count: res.count,
                    });
                  }),
                  catchError(() => of({ loading: false, data: [], columns: this.columns })),
                );
              }
              return of({ loading: false, data: [], columns: this.columns });
            }),
          );
          return of(null);
        }),
        switchMap((res) => {
          this.tableConfig.Buttons = [
            {
              isShow: false,
              showCommand: (rowData: Request) => {
                return rowData.status === 'مكتمل' && !this.isWaiting;
              },
              tooltip: 'ارجاع',
              icon: 'pi pi-arrow-circle-left',
              key: 'Edit',
              severity: 'contrast',
              command: (rowData: any) => {
                this.returnFunc(rowData);
              },
            },
            {
              isShow: false,
              showCommand: (rowData: Request) => {
                return rowData.status === 'قيد المراجعة' && this.isWaiting;
              },
              tooltip: 'الغاء الطلب',
              icon: 'pi pi-times',
              key: 'cancel',
              severity: 'contrast',
              command: (rowData: any) => {
                this.cancelFunc(rowData);
              },
            },
            {
              isShow: false,
              showCommand: (rowData: Request) => {
                return rowData.status === 'تم التوصيل' && this.isWaiting;
              },
              tooltip: 'اكتمال',
              icon: 'pi pi-check',
              key: 'Edit',
              severity: 'contrast',
              command: (rowData: any) => {
                this.completeFunc(rowData);
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
          return of(null);
        }),
      )
      .subscribe((res) => {});
  }
  getControl(index: number, key: string) {
    return (this.controlArray().controls[index] as FormGroup).controls[key] as FormControl;
  }
  return() {
    if (this.selectedRequest()) {
      const arr = this.controlArray()
        .getRawValue()
        .map((x) => ({ requestItemID: x.requestItemID, quantityToReturn: x.quantityToReturn, reason: x.reason }));

      const newArr = arr.flat().filter((x) => x.quantityToReturn !== 0);
      const body = { requestID: this.selectedRequest()?.requestID ?? 0, itemsToReturn: arr };
      this.clientReturnSrv.create(body).subscribe((res) => {
        this.msgSrv.showMessage(res.message, res.succeeded);
        this.returnVisible = false;
        this.tableConfig.getSub$.next({});
      });
    }
  }
  clostReturnDialog(event: any) {
    if (!event) this.selectedRequest.set(null);
  }
}
