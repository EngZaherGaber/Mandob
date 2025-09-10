import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { Category } from '../../../interfaces/category';
import { CategoryManagementService } from '../../../services/category-management.service';

@Component({
  selector: 'category-management-detail',
  imports: [DynmaicFormComponent, CommonModule],
  templateUrl: './category-management-detail.component.html',
  styleUrl: './category-management-detail.component.scss',
})
export class CategoryManagementDetailComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  isShow: boolean = false;
  categoryId: number | undefined;
  category: Category | undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryManagement: CategoryManagementService,
    private msgSrv: MessageToastService
  ) {
    this.route.params
      .pipe(
        switchMap((param) => {
          this.isShow = param['type'] === 'display';
          this.categoryId = +param['id'];
          return categoryManagement.getOne(this.categoryId);
        })
      )
      .subscribe((res) => {
        this.category = res.data;
        this.resetObjs = {
          general: [
            {
              key: 'categoryName',
              label: 'اسم التصنيف',
              value: res.data.categoryName,
              dataType: 'string',
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
    if (this.categoryId) {
      this.categoryManagement.edit(this.categoryId, event).subscribe((res) => {
        this.msgSrv.showMessage(res.message, res.succeeded);
        if (res.succeeded) {
          this.router.navigate(['owner/category-management/show']);
        }
      });
    }
  }
}
