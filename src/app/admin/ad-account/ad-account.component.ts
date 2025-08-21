import { Component } from '@angular/core';
import { DynmaicFormComponent } from '../../shared/components/dynmaic-form/dynmaic-form.component';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { InputDynamic } from '../../shared/interface/input-dynamic';
import { UserStateService } from '../../general/services/user-state.service';

@Component({
  selector: 'app-ad-account',
  imports: [DynmaicFormComponent, CommonModule],
  templateUrl: './ad-account.component.html',
  styleUrl: './ad-account.component.scss',
})
export class AdAccountComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  stepsList: MenuItem[] = [{ label: 'المعلومات العامة' }, { label: 'المعلومات الخاصة' }];
  constructor(private userStateSrv: UserStateService) {
    const user = userStateSrv.getUserState();
    this.resetObjs = {
      general: [
        {
          key: 'username',
          label: 'اسم المستخدم',
          value: user.username,
          dataType: 'string',
          lang: 'ar',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'name',
          label: 'الاسم الاول',
          value: user.name,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'address',
          label: 'العنوان',
          value: user.address,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'commercialRegistrationNumber',
          label: 'العنوان',
          value: user.commercialRegistrationNumber,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'email',
          label: 'الايميل',
          value: user.email,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'phoneNumber',
          label: 'الرقم',
          value: user.phoneNumber,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
      ],
    };
  }
  ngOnInit() {}
  submit(event: any) {
    console.log(event);
  }
}
