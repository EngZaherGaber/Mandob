import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { DynamicViewComponent } from '../../../../shared/components/dynamic-view/dynamic-view.component';
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
  columns = [
    {
      field: 'planName',
      header: 'اسم الباقة',
      HeaderType: 'string',
    },
    {
      field: 'price',
      header: 'السعر',
      HeaderType: 'int',
    },
    {
      field: 'maxRequestsPerMonth',
      header: 'اقصى عدد منتجات بالشهر',
      HeaderType: 'int',
    },
    {
      field: 'maxDistributors',
      header: 'عدد الموزعين',
      HeaderType: 'int',
    },
    {
      field: 'priorityWeight',
      header: 'الوزن',
      HeaderType: 'int',
    },
    {
      field: 'hasAdsFeature',
      header: 'امكانية الاعلان',
      HeaderType: 'bool',
    },
    {
      field: 'hasMonthlyNotifications',
      header: 'امكانية الاشعار الشهري',
      HeaderType: 'bool',
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
    this.planSrv.delete(rowData.planID).subscribe((res) => {
      if (res.succeeded) {
        this.tableConfig.getSub$.next({});
        this.msgSrv.showSuccess('تم حذف الشركة');
      } else {
        this.msgSrv.showError(res.message);
      }
    });
  };
  constructor(
    private tableSrv: DyTableService,
    private msgSrv: MessageToastService,
    private route: ActivatedRoute,
    private router: Router,
    private planSrv: PlanManagementService
  ) {
    this.tableConfig = tableSrv.getStandardInfo(this.deleteFunc, this.editFunc, this.displayFunc, this.addFunc);
  }
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.type = param['type'];
      this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
        switchMap((body: any) => {
          if (body) {
            return this.planSrv.getAll(body).pipe(
              switchMap((res) =>
                of({
                  data: res.data,
                  columns: this.columns,
                  loading: false,
                  count: res.count,
                })
              ),
              catchError(() => of({ loading: false, data: [], columns: this.columns }))
            );
          }
          return of({ loading: false, data: [], columns: this.columns });
        })
      );
    });
  }
}
