import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { UserStateService } from '../../services/user-state.service';
import { DynmaicFormComponent } from '../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { Company } from '../../../company/interfaces/company';
import { Router } from '@angular/router';
import { MessageToastService } from '../../../shared/service/message-toast.service';

@Component({
  selector: 'account',
  imports: [DynmaicFormComponent, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  stepsList: MenuItem[] = [{ label: 'المعلومات العامة' }, { label: 'المعلومات الخاصة' }];
  constructor(private userState: UserStateService, private router: Router, private msgSrv: MessageToastService) {
    this.userState
      .strategy()
      ?.getById()
      .subscribe((res) => {
        if (res.succeeded) {
          this.resetObjs = {
            general: [
              {
                key: 'name',
                label: 'اسم',
                value: res.data.name,
                dataType: 'string',
                lang: 'ar',
                required: true,
                visible: true,
                options: [],
              },

              {
                key: 'email',
                label: 'الايميل',
                value: res.data.email,
                dataType: 'string',
                required: true,
                visible: true,
                options: [],
              },
              {
                key: 'phoneNumber',
                label: 'الرقم',
                value: res.data.phoneNumber,
                dataType: 'string',
                required: true,
                visible: true,
                options: [],
              },
            ],
          };
          if ('commercialRegistrationNumber' in res.data) {
            // TypeScript now treats res.data as Company
            this.resetObjs[0].push(
              {
                key: 'commercialRegistrationNumber',
                label: 'السجل التجاري',
                value: res.data.commercialRegistrationNumber,
                dataType: 'string',
                required: true,
                visible: true,
                options: [],
              },
              {
                key: 'address',
                label: 'العنوان',
                value: res.data.address,
                dataType: 'string',
                required: true,
                visible: true,
                options: [],
              }
            );
          }
        }
      });
  }
  submit(event: any) {
    this.userState
      .strategy()
      ?.edit(event)
      .subscribe((res) => {
        if (res.succeeded) {
          this.msgSrv.showSuccess('تم تعديل الحساب');
          this.router.navigate(['']);
        }
      });
  }
}
