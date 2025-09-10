import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { CompanyStrategy } from '../../../../company/classes/company-strategy';
import { UserStateService } from '../../../../general/services/user-state.service';
import { DynamicInputComponent } from '../../../../shared/components/dynamic-input/dynamic-input.component';
import { DynamicViewComponent } from '../../../../shared/components/dynamic-view/dynamic-view.component';
import { InfoTable } from '../../../../shared/interface/info-table';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { DistributorManagementService } from '../../../services/distributor-management.service';

@Component({
  selector: 'app-distributor-show',
  imports: [DynamicViewComponent, PrimeNgSharedModule, DynamicInputComponent],
  templateUrl: './distributor-show.component.html',
  styleUrl: './distributor-show.component.scss',
})
export class DistributorShowComponent {
  tableConfig: InfoTable;
  type: 'table' | 'list' | string = '';
  columns = [
    {
      field: 'name',
      header: 'الاسم',
      HeaderType: 'string',
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
    this.distributorManagementSrv.changeStatus(rowData.userId).subscribe((res) => {
      if (res.succeeded) {
        this.msgSrv.showSuccess('تم تغير حالة المستخدم');
        this.tableConfig.getSub$.next({});
      }
    });
  }
  addFunc: () => void = () => {
    this.router.navigate(['company/distributor-management/add']);
  };
  editFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['company/distributor-management/detail/edit/' + rowData.userId]);
  };
  displayFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['company/distributor-management/detail/display/' + rowData.userId]);
  };
  resetFunc: (rowData: any) => void = (rowData: any) => {
    this.getControl('userId').setValue(rowData.userId);
    this.resetDialogVisible = true;
  };
  constructor(
    private tableSrv: DyTableService,
    private userState: UserStateService,
    private msgSrv: MessageToastService,
    private route: ActivatedRoute,
    private router: Router,
    private distributorManagementSrv: DistributorManagementService
  ) {
    this.tableConfig = tableSrv.getStandardInfo(undefined, this.editFunc, this.displayFunc, this.addFunc);
    this.route.params.subscribe((param) => {
      this.type = param['type'];
      this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
        switchMap((body: any) => {
          const user = userState.user();
          if (body && user?.userId) {
            return this.distributorManagementSrv.getAll(body, user.userId).pipe(
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
    if (strategy instanceof CompanyStrategy) {
      strategy.resetPasswordAdmin(this.form.getRawValue()).subscribe((res) => {
        this.msgSrv.showSuccess(res.message);
        if (res.succeeded) this.resetDialogVisible = false;
      });
    }
  }
}
