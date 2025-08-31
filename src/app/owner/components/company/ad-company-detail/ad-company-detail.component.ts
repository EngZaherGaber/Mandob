import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CompanyStrategy } from '../../../../company/classes/company-strategy';
import { Company } from '../../../../company/interfaces/company';
import { PlanService } from '../../../../company/services/plan.service';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { AdCompanyManagementService } from '../../../services/ad-company-management.service';

@Component({
  selector: 'ad-company-detail',
  imports: [
    // DynmaicFormComponent,
    CommonModule,
  ],
  templateUrl: './ad-company-detail.component.html',
  styleUrl: './ad-company-detail.component.scss',
})
export class AdCompanyDetailComponent {
  // resetObjs: { [key: string]: InputDynamic[] } = {};
  // stepsList: MenuItem[] = [{ label: 'المعلومات العامة' }];
  // finsih: boolean = false;
  // isShow: boolean = false;
  // companyId: number | undefined;
  // company: Company | undefined;
  // constructor(
  //   private companyStrategy: CompanyStrategy,
  //   private companyManagementSrv: AdCompanyManagementService,
  //   private router: Router,
  //   private route: ActivatedRoute,
  //   private msgSrv: MessageToastService,
  //   private planSrv: PlanService
  // ) {
  //   this.planSrv.getAll({}).subscribe((res) => {});
  // }
  // ngOnInit() {
  //   this.route.params
  //     .pipe(
  //       switchMap((param) => {
  //         this.isShow = param['type'] === 'display';
  //         this.companyId = +param['id'];
  //         return this.companyStrategy.getById(this.companyId);
  //       })
  //     )
  //     .subscribe((res) => {
  //       if (res.succeeded) {
  //         this.company = res.data;
  //         this.resetObjs = {
  //           general: [
  //             {
  //               key: 'userName',
  //               label: 'اسم المستخدم',
  //               value: this.company?.userName,
  //               dataType: 'string',
  //               required: true,
  //               visible: true,
  //               options: [],
  //             },
  //             {
  //               key: 'companyName',
  //               label: 'اسم الشركة',
  //               value: this.company?.name,
  //               dataType: 'string',
  //               required: true,
  //               visible: true,
  //               options: [],
  //             },
  //             {
  //               key: 'companyDescription',
  //               label: 'وصف الشركة',
  //               value: this.company?.companyDescription,
  //               dataType: 'string',
  //               required: true,
  //               visible: true,
  //               options: [],
  //             },
  //             {
  //               key: 'address',
  //               label: 'العنوان',
  //               value: this.company?.address,
  //               dataType: 'string',
  //               required: true,
  //               visible: true,
  //               options: [],
  //             },
  //             {
  //               key: 'commercialRegistrationNumber',
  //               label: 'السجل التجاري',
  //               value: this.company?.commercialRegistrationNumber,
  //               dataType: 'string',
  //               required: true,
  //               visible: true,
  //               options: [],
  //             },
  //             {
  //               key: 'email',
  //               label: 'الايميل',
  //               value: this.company?.email,
  //               dataType: 'string',
  //               required: true,
  //               visible: true,
  //               options: [],
  //             },
  //             {
  //               key: 'phoneNumber',
  //               label: 'رقم الهاتف',
  //               value: this.company?.phoneNumber,
  //               dataType: 'string',
  //               required: true,
  //               visible: true,
  //               options: [],
  //             },
  //           ],
  //         };
  //         this.finsih = res.succeeded;
  //       }
  //     });
  // }
  // submit(event: any) {
  //   if (this.companyId) {
  //     this.companyManagementSrv.edit(event, this.companyId).subscribe((res) => {
  //       if (res.succeeded) {
  //         this.router.navigate(['owner/company/show/table']);
  //       }
  //     });
  //   }
  // }
}
