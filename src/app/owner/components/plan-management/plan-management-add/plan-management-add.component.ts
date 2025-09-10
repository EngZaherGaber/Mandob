import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { PlanManagementService } from '../../../services/plan-management.service';

@Component({
  selector: 'app-plan-management-add',
  imports: [DynmaicFormComponent, CommonModule],
  templateUrl: './plan-management-add.component.html',
  styleUrl: './plan-management-add.component.scss',
})
export class PlanManagementAddComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  constructor(private router: Router, private planSrv: PlanManagementService, private msgSrv: MessageToastService) {
    this.resetObjs = {
      general: [
        {
          key: 'planName',
          label: 'اسم الباقة',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'price',
          label: 'السعر',
          value: null,
          dataType: 'int',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'maxRequestsPerMonth',
          label: 'اقصى عدد منتجات بالشهر',
          value: null,
          dataType: 'int',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'maxDistributors',
          label: 'اقصى عدد موزعين',
          value: null,
          dataType: 'int',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'priorityWeight',
          label: 'الوزن',
          value: null,
          dataType: 'int',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'hasAdsFeature',
          label: 'امكانية الاعلان',
          value: null,
          dataType: 'bool',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'hasMonthlyNotifications',
          label: 'امكانية الاشعار الشهري',
          value: null,
          dataType: 'bool',
          required: true,
          visible: true,
          options: [],
        },
      ],
    };
  }
  ngOnInit() {}
  submit(event: any) {
    this.planSrv.add(event).subscribe((res) => {
      if (res.succeeded) {
        this.router.navigate(['owner/plan-management/show']);
      }
    });
  }
}
