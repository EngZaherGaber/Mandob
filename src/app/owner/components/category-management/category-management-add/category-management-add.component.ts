import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { CategoryManagementService } from '../../../services/category-management.service';

@Component({
  selector: 'category-management-add',
  imports: [DynmaicFormComponent, CommonModule],
  templateUrl: './category-management-add.component.html',
  styleUrl: './category-management-add.component.scss',
})
export class CategoryManagementAddComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  constructor(
    private router: Router,
    private categoryManagement: CategoryManagementService,
    private msgSrv: MessageToastService
  ) {
    this.resetObjs = {
      general: [
        {
          key: 'categoryName',
          label: 'اسم التصنيف',
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
    this.categoryManagement.add(event).subscribe((res) => {
      if (res.succeeded) {
        this.router.navigate(['owner/category-management/show']);
      }
    });
  }
}
