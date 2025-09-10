import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { UserStateService } from '../../../../general/services/user-state.service';
import { OwnerStrategy } from '../../../../owner/classes/owner-strategy';
import { DynamicInputComponent } from '../../../../shared/components/dynamic-input/dynamic-input.component';
import { DynamicViewComponent } from '../../../../shared/components/dynamic-view/dynamic-view.component';
import { InfoTable } from '../../../../shared/interface/info-table';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { CompanyManagementService } from '../../../services/company-management.service';

@Component({
  selector: 'comp-show',
  imports: [DynamicViewComponent, DynamicInputComponent, PrimeNgSharedModule],
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
  step: number = 1;
  resetDialogVisible: boolean = false;
  form: FormGroup = new FormGroup({
    userId: new FormControl(null),
    adminPassword: new FormControl(null),
    newPassword: new FormControl(null),
  });
  objs: InputDynamic[] = [
    {
      key: 'newPassword',
      value: null,
      label: 'كلمة السر الجديدة',
      dataType: 'string',
      required: true,
      visible: true,
      options: [],
    },
    {
      key: 'adminPassword',
      value: null,
      label: 'كلمة سر المدير',
      dataType: 'string',
      required: true,
      visible: true,
      options: [],
    },
  ];
  changeState(rowData: any) {
    this.companyManagementSrv.changeStatus(rowData.userId).subscribe((res) => {
      this.msgSrv.showMessage(res.message, res.succeeded);
      if (res.succeeded) this.tableConfig.getSub$.next({});
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
      this.msgSrv.showMessage(res.message, res.succeeded);
      if (res.succeeded) this.tableConfig.getSub$.next({});
    });
  };
  resetFunc: (rowData: any) => void = (rowData: any) => {
    this.getControl('userId').setValue(rowData.userId);
    this.resetDialogVisible = true;
  };
  constructor(
    tableSrv: DyTableService,
    private msgSrv: MessageToastService,
    private route: ActivatedRoute,
    private router: Router,
    private userState: UserStateService,
    private companyManagementSrv: CompanyManagementService
  ) {
    this.tableConfig = tableSrv.getStandardInfo(this.deleteFunc, this.editFunc, this.displayFunc, this.addFunc);
    this.tableConfig.Buttons.push({
      isShow: true,
      tooltip: 'تغيير كلمة السر',
      icon: 'pi pi-key',
      key: 'Delete',
      severity: 'contrast',
      command: (rowData: any) => {
        this.resetFunc(rowData);
      },
    });
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
  getControl(name: string) {
    return this.form.get(name) as FormControl;
  }
  resetPassword() {
    const strategy = this.userState.strategy();
    if (strategy instanceof OwnerStrategy) {
      strategy.resetPasswordAdmin(this.form.getRawValue()).subscribe((res) => {
        this.msgSrv.showMessage(res.message, res.succeeded);
        if (res.succeeded) this.resetDialogVisible = false;
      });
    }
  }
}
