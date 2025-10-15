import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { catchError, of, switchMap } from 'rxjs';
import { UserStateService } from '../../../../general/services/user-state.service';
import { OwnerStrategy } from '../../../../owner/classes/owner-strategy';
import { DynamicInputComponent } from '../../../../shared/components/dynamic-input/dynamic-input.component';
import { DynamicViewComponent } from '../../../../shared/components/dynamic-view/dynamic-view.component';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { columnTable } from '../../../../shared/interface/body-table';
import { EventColumn } from '../../../../shared/interface/event-column';
import { InfoTable } from '../../../../shared/interface/info-table';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { CompanyManagementService } from '../../../services/company-management.service';

@Component({
  selector: 'comp-management-show',
  imports: [DynamicViewComponent, DynmaicFormComponent, DynamicInputComponent, PrimeNgSharedModule],
  templateUrl: './comp-management-show.component.html',
  styleUrl: './comp-management-show.component.scss',
})
export class CompManagementShowComponent {
  tableConfig: InfoTable;
  imageField: string = '';
  type: 'table' | 'list' | string = 'table';
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
      field: 'companyDescription',
      header: 'الوصف',
      headerType: 'string',
    },
    {
      field: 'planName',
      header: 'الاشتراك',
      headerType: 'string',
    },
    {
      field: 'planStartDate',
      header: 'بدأ الاشتراك',
      headerType: 'datetime',
    },
    {
      field: 'planEndDate',
      header: 'نهاية الاشتراك',
      headerType: 'datetime',
    },
    {
      field: 'email',
      header: 'الايميل',
      headerType: 'string',
    },
    {
      field: 'phoneNumber',
      header: 'رقم الهاتف',
      headerType: 'string',
    },
    {
      field: 'address',
      header: 'العنوان',
      headerType: 'string',
    },
    {
      field: 'commercialRegistrationNumber',
      header: 'السجل التجاري',
      headerType: 'string',
    },
    {
      field: 'planStartDate',
      header: 'بداية خطة الاشتراك',
      headerType: 'datetime',
    },
    {
      field: 'planEndDate',
      header: 'نهاية خطة الاشتراك',
      headerType: 'datetime',
    },
    {
      field: 'createdBy',
      header: 'المسؤول',
      headerType: 'string',
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
        this.companyManagement.changeStatus(rowData.userId).subscribe((res) => {
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
        this.companyManagement.delete(rowData.userId).subscribe((res) => {
          this.msgSrv.showMessage(res.message, res.succeeded);
          if (res.succeeded) this.tableConfig.getSub$.next({});
        });
      },
    });
  };
  addFunc: () => void = () => {
    this.router.navigate(['owner/company-management/add']);
  };
  editFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['owner/company-management/detail/edit/' + rowData.userId]);
  };
  displayFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['owner/company-management/detail/display/' + rowData.userId]);
  };

  resetFunc: (rowData: any) => void = (rowData: any) => {
    this.getControl('userId').setValue(rowData.userId);
    this.resetDialogVisible = true;
  };
  changePhoneNumberFunc: (rowData: any) => void = (rowData: any) => {
    const input = this.changePhoneNumberForm['general'].find((x) => x.key === 'userID');
    if (input) {
      input.value = rowData.userId;
      this.changePhoneNumbervisible = true;
    }
  };
  changePhoneNumberForm: { [key: string]: InputDynamic[] } = {};
  changePhoneNumbervisible: boolean = false;
  constructor(
    tableSrv: DyTableService,
    private msgSrv: MessageToastService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private userState: UserStateService,
    private companyManagement: CompanyManagementService,
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
    this.tableConfig.Buttons.push({
      isShow: true,
      tooltip: 'تغيير رقم الموبايل',
      icon: 'pi pi-address-book',
      key: 'Edit',
      severity: 'contrast',
      command: (rowData: any) => {
        this.changePhoneNumberFunc(rowData);
      },
    });
    this.changePhoneNumberForm = {
      general: [
        {
          key: 'userID',
          label: 'كلمة السر',
          value: null,
          dataType: 'string',
          required: true,
          visible: false,
          options: [],
        },
        {
          key: 'adminPassword',
          label: 'كلمة السر الادمن',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'newPhoneNumber',
          label: 'رقم الهاتف الجديد للمستخدم',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
      ],
    };
  }
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.type = param['type'];
      this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
        switchMap((body: any) => {
          if (body) {
            return this.companyManagement.getAll(body).pipe(
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
  closeDialog(event: any, objs: { [key: string]: InputDynamic[] }) {
    Object.keys(objs).forEach((x) => {
      objs[x].map((z) => {
        z.value = null;
        return z;
      });
    });
  }
  changePhoneNumber(event: any) {
    this.userState.authSrv.changePhoneNumberForAdmin(event).subscribe((res) => {
      this.msgSrv.showMessage(res.message, res.succeeded);
      this.changePhoneNumbervisible = !res.succeeded;
      this.closeDialog(null, this.changePhoneNumberForm);
      this.tableConfig.getSub$.next({});
    });
  }
}
