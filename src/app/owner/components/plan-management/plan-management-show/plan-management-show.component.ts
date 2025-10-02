import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { catchError, of, switchMap } from 'rxjs';
import { DynamicViewComponent } from '../../../../shared/components/dynamic-view/dynamic-view.component';
import { columnTable } from '../../../../shared/interface/body-table';
import { InfoTable } from '../../../../shared/interface/info-table';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { PlanManagementService } from '../../../services/plan-management.service';

@Component({
  selector: 'plan-management-show',
  imports: [DynamicViewComponent, CommonModule],
  templateUrl: './plan-management-show.component.html',
  styleUrl: './plan-management-show.component.scss',
})
export class PlanManagementShowComponent {
  tableConfig: InfoTable;
  imageField: string = '';
  type: 'table' | 'list' | string = 'table';
  columns: columnTable[] = [
    {
      field: 'planName',
      header: 'اسم الباقة',
      headerType: 'string',
    },
    {
      field: 'price',
      header: 'السعر',
      headerType: 'int',
    },
    {
      field: 'maxRequestsPerMonth',
      header: 'اقصى عدد منتجات بالشهر',
      headerType: 'int',
    },
    {
      field: 'maxDistributors',
      header: 'عدد الموزعين',
      headerType: 'int',
    },
    {
      field: 'priorityWeight',
      header: 'الوزن',
      headerType: 'int',
    },
    {
      field: 'hasAdsFeature',
      header: 'امكانية الاعلان',
      headerType: 'bool',
    },
    {
      field: 'hasMonthlyNotifications',
      header: 'امكانية الاشعار الشهري',
      headerType: 'bool',
    },
  ];
  addFunc: () => void = () => {
    this.router.navigate(['owner/plan-management/add']);
  };
  editFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['owner/plan-management/detail/edit/' + rowData.planID]);
  };
  displayFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['owner/plan-management/detail/display/' + rowData.planID]);
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
        this.planManagement.delete(rowData.planID).subscribe((res) => {
          this.msgSrv.showMessage(res.message, res.succeeded);
          if (res.succeeded) this.tableConfig.getSub$.next({});
        });
      },
    });
  };
  constructor(
    private tableSrv: DyTableService,
    private msgSrv: MessageToastService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private planManagement: PlanManagementService,
  ) {
    this.tableConfig = tableSrv.getStandardInfo(this.deleteFunc, this.editFunc, this.displayFunc, this.addFunc);
  }
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.type = param['type'];
      this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
        switchMap((body: any) => {
          if (body) {
            return this.planManagement.getAll(body).pipe(
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
    });
  }
}
