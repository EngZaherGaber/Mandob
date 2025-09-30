import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { catchError, of, switchMap } from 'rxjs';
import { DynamicViewComponent } from '../../../../shared/components/dynamic-view/dynamic-view.component';
import { InfoTable } from '../../../../shared/interface/info-table';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { Offer } from '../../../interfaces/offer';
import { OfferManagementService } from '../../../services/offer-management.service';

@Component({
  selector: 'app-offer-management-show',
  imports: [DynamicViewComponent],
  templateUrl: './offer-management-show.component.html',
  styleUrl: './offer-management-show.component.scss',
})
export class OfferManagementShowComponent {
  tableConfig: InfoTable;
  imageField: string = '';
  columns = [
    {
      field: 'name',
      header: 'الاسم',
      HeaderType: 'string',
    },
    {
      field: 'description',
      header: 'الوصف',
      HeaderType: 'string',
    },
    {
      field: 'startDate',
      header: 'تاريخ البدء',
      HeaderType: 'DateTime',
    },
    {
      field: 'endDate',
      header: 'تاريخ الانتهاء',
      HeaderType: 'DateTime',
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

  addFunc: () => void = () => {
    this.router.navigate(['company/offer-management/add']);
  };
  editFunc: (rowData: Offer) => void = (rowData: Offer) => {
    this.router.navigate(['company/offer-management/detail/edit/' + rowData.id]);
  };
  displayFunc: (rowData: Offer) => void = (rowData: Offer) => {
    this.router.navigate(['company/offer-management/detail/display/' + rowData.id]);
  };

  changeState: (rowData: any) => void = (rowData: any) => {
    this.confirmationService.confirm({
      message: 'هل تريد تغيير حالة هذا المستخدم؟',
      header: 'تغيير حالة المستخدم',
      icon: 'pi pi-info-circle',
      rejectLabel: 'الغاء',
      rejectButtonProps: {
        label: 'الغاء',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'تاكيد',
        severity: 'danger',
      },

      accept: () => {
        this.offerManagement.changeStatus(rowData.id).subscribe((res) => {
          this.msgSrv.showMessage(res.message, res.succeeded);
          if (res.succeeded) this.tableConfig.getSub$.next({});
        });
      },
    });
  };
  deleteFunc: (rowData: any) => void = (rowData: any) => {
    this.confirmationService.confirm({
      message: 'هل تريد حذف هذه الحساب؟',
      header: 'حذف الحساب',
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
        this.offerManagement.delete(rowData.id).subscribe((res) => {
          this.msgSrv.showMessage(res.message, res.succeeded);
          if (res.succeeded) this.tableConfig.getSub$.next({});
        });
      },
    });
  };
  constructor(
    tableSrv: DyTableService,
    private msgSrv: MessageToastService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private offerManagement: OfferManagementService,
  ) {
    this.tableConfig = tableSrv.getStandardInfo(this.deleteFunc, this.editFunc, this.displayFunc, this.addFunc);
  }
  ngOnInit() {
    this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
      catchError((err) => {
        return of({
          data: [],
          columns: this.columns,
          loading: false,
          count: 0,
        });
      }),
      switchMap((body: any) => {
        if (body) {
          return this.offerManagement.getAll(body).pipe(
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
  }
}
