import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { CompanyStrategy } from '../../../../company/classes/company-strategy';
import { PlanService } from '../../../../company/services/plan.service';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../../shared/service/message-toast.service';

@Component({
  selector: 'app-ad-company-add',
  imports: [
    // DynmaicFormComponent,
    CommonModule,
  ],
  templateUrl: './ad-company-add.component.html',
  styleUrl: './ad-company-add.component.scss',
})
export class AdCompanyAddComponent {
  // resetObjs: { [key: string]: InputDynamic[] } = {};
  // stepsList: MenuItem[] = [{ label: 'المعلومات العامة' }, { label: 'كلمة السر' }];
  // finsih: boolean = false;
  // constructor(
  //   private companyStrategy: CompanyStrategy,
  //   private router: Router,
  //   private msgSrv: MessageToastService,
  //   private planSrv: PlanService
  // ) {
  //   this.planSrv.getAll({}).subscribe((res) => {
  //     if (res.succeeded) {
  //       this.resetObjs = {
  //         companyInfo: [
  //           {
  //             key: 'companyName',
  //             label: 'اسم الشركة',
  //             value: null,
  //             dataType: 'string',
  //             required: true,
  //             visible: true,
  //             options: [],
  //           },
  //           {
  //             key: 'companyDescription',
  //             label: 'وصف الشركة',
  //             value: null,
  //             dataType: 'string',
  //             required: true,
  //             visible: true,
  //             options: [],
  //           },
  //           {
  //             key: 'address',
  //             label: 'العنوان',
  //             value: null,
  //             dataType: 'string',
  //             required: true,
  //             visible: true,
  //             options: [],
  //           },
  //           {
  //             key: 'commercialRegistrationNumber',
  //             label: 'السجل التجاري',
  //             value: null,
  //             dataType: 'string',
  //             required: true,
  //             visible: true,
  //             options: [],
  //           },
  //           {
  //             key: 'planId',
  //             label: 'خطة الاشتراك',
  //             value: null,
  //             dataType: 'list',
  //             required: true,
  //             visible: true,
  //             options: res.data.map((plan) => ({ name: plan.planName, id: plan.planID })),
  //           },
  //         ],
  //         security: [
  //           {
  //             key: 'password',
  //             label: 'كلمة السر',
  //             value: null,
  //             dataType: 'string',
  //             required: true,
  //             visible: true,
  //             options: [],
  //           },
  //           {
  //             key: 'confirmPassword',
  //             label: 'تاكيد كلمة السر',
  //             value: null,
  //             dataType: 'string',
  //             required: true,
  //             visible: true,
  //             options: [],
  //           },
  //         ],
  //       };
  //       this.finsih = res.succeeded;
  //     }
  //   });
  // }
  // ngOnInit() {}
  // submit(event: any) {
  //   if (event.security.password !== event.security.confirmPassword) {
  //     this.msgSrv.showError('تاكيد كلمة السر غير مطابق');
  //   } else {
  //     const value = {
  //       ...event.companyInfo,
  //       password: event.security.password,
  //     };
  //     this.companyStrategy.add(value).subscribe((res) => {
  //       if (res.succeeded) {
  //         this.router.navigate(['owner/company/show/table']);
  //       }
  //     });
  //   }
  // }
}
