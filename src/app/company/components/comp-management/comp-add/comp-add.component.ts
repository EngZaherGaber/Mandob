import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { CompanyManagementService } from '../../../services/company-management.service';
import { PlanService } from '../../../services/plan.service';

@Component({
  selector: 'comp-add',
  imports: [DynmaicFormComponent, CommonModule],
  templateUrl: './comp-add.component.html',
  styleUrl: './comp-add.component.scss',
})
export class CompAddComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  stepsList: MenuItem[] = [{ label: 'المعلومات العامة' }, { label: 'كلمة السر' }];

  finsih: boolean = false;
  constructor(
    private companyManagementSrv: CompanyManagementService,
    private router: Router,
    private msgSrv: MessageToastService,
    private planSrv: PlanService
  ) {
    this.planSrv.getAll({}).subscribe((res) => {
      if (res.succeeded) {
        this.resetObjs = {
          companyInfo: [
            {
              key: 'companyName',
              label: 'اسم الشركة',
              value: null,
              dataType: 'string',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'companyDescription',
              label: 'وصف الشركة',
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
            {
              key: 'address',
              label: 'العنوان',
              value: null,
              dataType: 'string',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'commercialRegistrationNumber',
              label: 'السجل التجاري',
              value: null,
              dataType: 'string',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'planID',
              label: 'خطة الاشتراك',
              value: null,
              dataType: 'list',
              required: true,
              visible: true,
              options: res.data.map((plan) => ({ name: plan.planName, id: plan.planID })),
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
        this.finsih = res.succeeded;
      }
    });
  }
  ngOnInit() {}
  submit(event: any) {
    if (event.security.password !== event.security.confirmPassword) {
      this.msgSrv.showError('تاكيد كلمة السر غير مطابق');
    } else {
      const value = {
        ...event.companyInfo,
        password: event.security.password,
      };
      this.companyManagementSrv.add(value).subscribe((res) => {
        if (res.succeeded) {
          this.router.navigate(['owner/company-management/show']);
        }
      });
    }
  }
}
