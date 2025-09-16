import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DynmaicFormComponent } from '../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { UserStateService } from '../../services/user-state.service';

@Component({
  selector: 'account',
  imports: [DynmaicFormComponent, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  stepsList: MenuItem[] = [{ label: 'المعلومات العامة' }, { label: 'المعلومات الخاصة' }];
  disableAtt: { [key: string]: string[] } = {
    general: ['phoneNumber'],
  };
  final: boolean = false;
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
            this.resetObjs['general'].push(
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
          this.final = true;
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
