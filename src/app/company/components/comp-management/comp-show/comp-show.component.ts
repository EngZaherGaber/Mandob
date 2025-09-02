import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoTable } from '../../../../shared/interface/info-table';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { switchMap, of, catchError } from 'rxjs';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { CompanyManagementService } from '../../../services/company-management.service';
import { DynamicViewComponent } from '../../../../shared/components/dynamic-view/dynamic-view.component';

@Component({
  selector: 'comp-show',
  imports: [DynamicViewComponent, CommonModule],
  templateUrl: './comp-show.component.html',
  styleUrl: './comp-show.component.scss',
})
export class CompShowComponent {
  tableConfig: InfoTable;
  imageField: string = '';
  type: 'table' | 'list' | string = 'table';
  columns = [
    {
      field: 'companyName',
      header: 'الاسم',
      HeaderType: 'string',
    },
    {
      field: 'companyDescription',
      header: 'الوصف',
      HeaderType: 'string',
    },
    {
      field: 'planName',
      header: 'الاشتراك',
      HeaderType: 'string',
    },
    {
      field: 'planStartDate',
      header: 'بدأ الاشتراك',
      HeaderType: 'DateTime',
    },
    {
      field: 'planEndDate',
      header: 'نهاية الاشتراك',
      HeaderType: 'DateTime',
    },
    {
      field: 'email',
      header: 'الايميل',
      HeaderType: 'string',
    },
    {
      field: 'phoneNumber',
      header: 'رقم الهاتف',
      HeaderType: 'string',
    },
    {
      field: 'address',
      header: 'العنوان',
      HeaderType: 'string',
    },
    {
      field: 'commercialRegistrationNumber',
      header: 'السجل التجاري',
      HeaderType: 'string',
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
  changeState(rowData: any) {
    this.companyManagementSrv.changeStatus(rowData.userId).subscribe((res) => {
      if (res.succeeded) {
        this.msgSrv.showSuccess('تم تغير حالة المستخدم');
        this.tableConfig.getSub$.next({});
      }
    });
  }
  addFunc: () => void = () => {
    this.router.navigate(['owner/company-management/add']);
  };
  editFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['owner/company-management/detail/edit/' + rowData.userId]);
  };
  displayFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['owner/company-management/detail/display/' + rowData.userId]);
  };
  deleteFunc: (rowData: any) => void = (rowData: any) => {
    this.companyManagementSrv.delete(rowData.userId).subscribe((res) => {
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
    private companyManagementSrv: CompanyManagementService
  ) {
    this.tableConfig = tableSrv.getStandardInfo(this.deleteFunc, this.editFunc, this.displayFunc, this.addFunc);
  }
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.type = param['type'];
      this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
        switchMap((body: any) => {
          if (body) {
            return this.companyManagementSrv.getAll(body).pipe(
              switchMap((res) =>
                of({
                  data: res.data,
                  columns: this.columns,
                  loading: false,
                  count: res.data.length,
                })
              ),
              catchError(() => of({ loading: false, data: [], columns: [] }))
            );
          }
          return of({ loading: false, data: [], columns: [] });
        })
      );
      this.tableConfig.getSub$.next({});
    });
  }
}
