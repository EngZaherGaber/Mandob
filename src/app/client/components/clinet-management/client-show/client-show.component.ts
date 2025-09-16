import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { UserStateService } from '../../../../general/services/user-state.service';
import { DynamicViewComponent } from '../../../../shared/components/dynamic-view/dynamic-view.component';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InfoTable } from '../../../../shared/interface/info-table';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { ClientManagementService } from '../../../services/client-management.service';

@Component({
  selector: 'client-show',
  imports: [DynamicViewComponent, PrimeNgSharedModule, DynmaicFormComponent],
  templateUrl: './client-show.component.html',
  styleUrl: './client-show.component.scss',
})
export class ClientShowComponent {
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
      field: 'commercialRegistrationNumber',
      header: 'السجل التجاري',
      HeaderType: 'string',
    },
    {
      field: 'address',
      header: 'العنوان',
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
    this.clientManagement.changeStatus(rowData.userId).subscribe((res) => {
      if (res.succeeded) {
        this.msgSrv.showSuccess('تم تغير حالة المستخدم');
        this.tableConfig.getSub$.next({});
      }
    });
  }
  displayFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['owner/client-management/detail/display/' + rowData.userId]);
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
    private tableSrv: DyTableService,
    private msgSrv: MessageToastService,
    private userState: UserStateService,
    private route: ActivatedRoute,
    private router: Router,
    private clientManagement: ClientManagementService
  ) {
    this.tableConfig = tableSrv.getStandardInfo(undefined, undefined, this.displayFunc, undefined);
    this.route.params.subscribe((param) => {
      this.type = param['type'];
      this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
        switchMap((body: any) => {
          if (body) {
            return this.clientManagement.getAll(body).pipe(
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
    });
  }
}
