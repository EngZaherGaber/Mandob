import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { catchError, of, switchMap } from 'rxjs';
import { DynamicViewComponent } from '../../../../shared/components/dynamic-view/dynamic-view.component';
import { columnTable } from '../../../../shared/interface/body-table';
import { EventColumn } from '../../../../shared/interface/event-column';
import { InfoTable } from '../../../../shared/interface/info-table';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { ProductManagementService } from '../../../services/product-management.service';

@Component({
  selector: 'prod-management-show',
  imports: [DynamicViewComponent],
  templateUrl: './prod-management-show.component.html',
  styleUrl: './prod-management-show.component.scss',
})
export class ProdManagementShowComponent {
  tableConfig: InfoTable;
  imageField: string = '';
  columns: columnTable[] = [
    {
      field: 'isActive',
      header: 'فعال',
      headerType: 'toggle',
    },
    {
      field: 'name',
      header: 'الاسم',
      headerType: 'string',
    },
    {
      field: 'productDescription',
      header: 'الوصف',
      headerType: 'html',
    },
  ];
  columnsEvent: EventColumn[] = [
    {
      field: 'isActive',
      command: (event: any, field: string, rowData: any) => {
        this.changeState(rowData);
      },
    },
  ];
  addFunc: () => void = () => {
    this.router.navigate(['company/product-management/add']);
  };
  editFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['company/product-management/detail/edit/' + rowData.id]);
  };
  displayFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['company/product-management/detail/display/' + rowData.id]);
  };
  changeState: (rowData: any) => void = (rowData: any) => {
    this.confirmationService.confirm({
      message: 'هل تريد تغيير حالة هذا المنتج؟',
      header: 'تغيير حالة المنتج',
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
        this.productManagement.changeStatus(rowData.id).subscribe((res) => {
          this.msgSrv.showMessage(res.message, res.succeeded);
          if (res.succeeded) this.tableConfig.getSub$.next({});
        });
      },
    });
  };
  deleteFunc: (rowData: any) => void = (rowData: any) => {
    this.confirmationService.confirm({
      message: 'هل تريد حذف هذه المنتج؟',
      header: 'حذف المنتج',
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
        this.productManagement.delete(rowData.id).subscribe((res) => {
          this.msgSrv.showMessage(res.message, res.succeeded);
          if (res.succeeded) this.tableConfig.getSub$.next({});
        });
      },
    });
  };

  constructor(
    tableSrv: DyTableService,
    private msgSrv: MessageToastService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private productManagement: ProductManagementService,
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
          return this.productManagement.getAll(body).pipe(
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
