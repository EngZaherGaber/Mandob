import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { forkJoin, switchMap } from 'rxjs';
import { PlanManagementService } from '../../../../owner/services/plan-management.service';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { Company } from '../../../interfaces/company';
import { CompanyManagementService } from '../../../services/company-management.service';

@Component({
  selector: 'ad-company-detail',
  imports: [DynmaicFormComponent, CommonModule],
  templateUrl: './comp-management-detail.component.html',
  styleUrl: './comp-management-detail.component.scss',
})
export class CompManagementDetailComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  stepsList: MenuItem[] = [{ label: 'المعلومات العامة' }];
  finsih: boolean = false;
  isShow: boolean = false;
  companyId: number | undefined;
  company: Company | undefined;
  constructor(
    private companyManagement: CompanyManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private msgSrv: MessageToastService,
    private planSrv: PlanManagementService
  ) {
    this.planSrv.getAll({}).subscribe((res) => {});
  }
  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((param) => {
          this.isShow = param['type'] === 'display';
          this.companyId = +param['id'];
          return forkJoin({ company: this.companyManagement.getOne(this.companyId), plan: this.planSrv.getAll({}) });
        })
      )
      .subscribe((res) => {
        if (res.company.succeeded) {
          this.company = res.company.data;
          this.resetObjs = {
            general: [
              {
                key: 'companyName',
                label: 'اسم الشركة',
                value: this.company.name,
                dataType: 'string',
                required: true,
                visible: true,
                options: [],
              },
              {
                key: 'companyDescription',
                label: 'وصف الشركة',
                value: this.company.companyDescription,
                dataType: 'string',
                required: true,
                visible: true,
                options: [],
              },
              {
                key: 'address',
                label: 'العنوان',
                value: this.company.address,
                dataType: 'string',
                required: true,
                visible: true,
                options: [],
              },
              {
                key: 'commercialRegistrationNumber',
                label: 'السجل التجاري',
                value: this.company.commercialRegistrationNumber,
                dataType: 'string',
                required: true,
                visible: true,
                options: [],
              },
              {
                key: 'planID',
                label: 'خطة الاشتراك',
                value: this.company.planId,
                dataType: 'list',
                required: true,
                visible: true,
                options: res.plan.data.map((plan) => ({ name: plan.planName, id: plan.planID })),
              },
              {
                key: 'planStartDate',
                label: 'خطة الاشتراك',
                value: this.company.planStartDate,
                dataType: 'DateTime',
                required: true,
                visible: true,
                options: [],
              },
              {
                key: 'planEndDate',
                label: 'خطة الاشتراك',
                value: this.company.planEndDate,
                dataType: 'DateTime',
                required: true,
                visible: true,
                options: [],
              },
            ],
          };
          this.finsih = res.company.succeeded && res.plan.succeeded;
        }
      });
  }
  submit(event: any) {
    if (this.companyId) {
      this.companyManagement.edit(this.companyId, event).subscribe((res) => {
        if (res.succeeded) {
          this.router.navigate(['owner/company-management/show']);
        }
      });
    }
  }
}
