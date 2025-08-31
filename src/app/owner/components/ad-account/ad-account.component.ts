import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { UserStateService } from '../../../general/services/user-state.service';
import { DynmaicFormComponent } from '../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { CompanyStrategy } from '../../../company/classes/company-strategy';
import { ClientStrategy } from '../../../client/classes/client-strategy';

@Component({
  selector: 'app-ad-account',
  imports: [DynmaicFormComponent, CommonModule],
  templateUrl: './ad-account.component.html',
  styleUrl: './ad-account.component.scss',
})
export class AdAccountComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  stepsList: MenuItem[] = [{ label: 'المعلومات العامة' }, { label: 'المعلومات الخاصة' }];
  constructor(private userState: UserStateService) {
    // const user = userState.strategy()?.user;
    this.resetObjs = {
      // general: [
      //   {
      //     key: 'username',
      //     label: 'اسم المستخدم',
      //     value: user?.userName,
      //     dataType: 'string',
      //     lang: 'ar',
      //     required: true,
      //     visible: true,
      //     options: [],
      //   },
      //   {
      //     key: 'name',
      //     label: 'الاسم الاول',
      //     value: user?.name,
      //     dataType: 'string',
      //     required: true,
      //     visible: true,
      //     options: [],
      //   },
      //   {
      //     key: 'email',
      //     label: 'الايميل',
      //     value: user?.email,
      //     dataType: 'string',
      //     required: true,
      //     visible: true,
      //     options: [],
      //   },
      //   {
      //     key: 'phoneNumber',
      //     label: 'الرقم',
      //     value: user?.phoneNumber,
      //     dataType: 'string',
      //     required: true,
      //     visible: true,
      //     options: [],
      //   },
      // ],
    };
    // const strategy = userState.strategy();
    // if (strategy instanceof CompanyStrategy || strategy instanceof ClientStrategy) {
    //   const user = strategy.user;
    //   this.resetObjs[0].push({
    //     key: 'commercialRegistrationNumber',
    //     label: 'العنوان',
    //     value: user?.commercialRegistrationNumber,
    //     dataType: 'string',
    //     required: true,
    //     visible: true,
    //     options: [],
    //   });
    //   this.resetObjs[0].push({
    //     key: 'address',
    //     label: 'العنوان',
    //     value: user?.address,
    //     dataType: 'string',
    //     required: true,
    //     visible: true,
    //     options: [],
    //   });
    // }
    // TODO
  }
  ngOnInit() {}
  submit(event: any) {
    console.log(event);
  }
}
