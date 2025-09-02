import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlanService } from '../../../services/plan.service';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../../shared/service/message-toast.service';

@Component({
  selector: 'app-plan-add',
  imports: [DynmaicFormComponent, CommonModule],
  templateUrl: './plan-add.component.html',
  styleUrl: './plan-add.component.scss',
})
export class PlanAddComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  constructor(private router: Router, private planSrv: PlanService, private msgSrv: MessageToastService) {
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
        this.router.navigate(['owner/plan-management/show/table']);
      }
    });
  }
}
