import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { OwnerManagementService } from '../../../services/owner-management.service';

@Component({
  selector: 'owner-add',
  imports: [DynmaicFormComponent, CommonModule],
  templateUrl: './owner-add.component.html',
  styleUrl: './owner-add.component.scss',
})
export class OwnerAddComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  stepsList: MenuItem[] = [{ label: 'المعلومات العامة' }, { label: 'المعلومات الخاصة' }];
  constructor(
    private router: Router,
    private ownerManagementSrv: OwnerManagementService,
    private msgSrv: MessageToastService
  ) {
    this.resetObjs = {
      generalInfo: [
        {
          key: 'name',
          label: 'الاسم',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'email',
          label: 'الايميل',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'phoneNumber',
          label: 'رقم الهاتف',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
      ],
      security: [
        {
          key: 'password',
          label: 'كلمة السر',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'confirmPassword',
          label: 'تاكيد كلمة السر',
          value: null,
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
    if (event.security.password !== event.security.confirmPassword) {
      this.msgSrv.showError('تاكيد كلمة السر غير مطابق');
    } else {
      const value = {
        ...event.generalInfo,
        password: event.security.password,
      };
      this.ownerManagementSrv.add(value).subscribe((res) => {
        if (res.succeeded) {
          this.router.navigate(['owner/owner-management/show/table']);
        }
      });
    }
  }
}
