import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { Plan } from '../../../interfaces/plan';
import { PlanManagementService } from '../../../services/plan-management.service';

@Component({
  selector: 'plan-management-detail',
  imports: [DynmaicFormComponent, CommonModule],
  templateUrl: './plan-management-detail.component.html',
  styleUrl: './plan-management-detail.component.scss',
})
export class PlanManagementDetailComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  isShow: boolean = false;
  planId: number | undefined;
  plan: Plan | undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private planSrv: PlanManagementService,
    private msgSrv: MessageToastService
  ) {
    this.route.params
      .pipe(
        switchMap((param) => {
          this.isShow = param['type'] === 'display';
          this.planId = +param['id'];
          return planSrv.getOne(this.planId);
        })
      )
      .subscribe((res) => {
        this.plan = res.data;
        this.resetObjs = {
          general: [
            {
              key: 'planName',
              label: 'اسم الباقة',
              value: this.plan?.planName,
              dataType: 'string',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'price',
              label: 'السعر',
              value: this.plan?.price,
              dataType: 'int',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'maxRequestsPerMonth',
              label: 'اقصى عدد منتجات بالشهر',
              value: this.plan?.maxRequestsPerMonth,
              dataType: 'int',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'maxDistributors',
              label: 'اقصى عدد موزعين',
              value: this.plan?.maxDistributors,
              dataType: 'int',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'priorityWeight',
              label: 'الوزن',
              value: this.plan?.priorityWeight,
              dataType: 'int',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'hasAdsFeature',
              label: 'امكانية الاعلان',
              value: this.plan?.hasAdsFeature,
              dataType: 'bool',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'hasMonthlyNotifications',
              label: 'امكانية الاشعار الشهري',
              value: this.plan?.hasMonthlyNotifications,
              dataType: 'bool',
              required: true,
              visible: true,
              options: [],
            },
          ],
        };
      });
  }
  ngOnInit() {}
  submit(event: any) {
    if (this.planId) {
      this.planSrv.edit(this.planId, event).subscribe((res) => {
        if (res.succeeded) {
          this.msgSrv.showSuccess('تم تعديل المدير');
          this.router.navigate(['owner/plan-management/show']);
        }
      });
    }
  }
}
