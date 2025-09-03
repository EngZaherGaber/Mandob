import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { Owner } from '../../../interfaces/owner';
import { OwnerManagementService } from '../../../services/owner-management.service';

@Component({
  selector: 'owner-detail',
  imports: [DynmaicFormComponent, CommonModule],
  templateUrl: './owner-detail.component.html',
  styleUrl: './owner-detail.component.scss',
})
export class OwnerDetailComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  isShow: boolean = false;
  ownerId: number | undefined;
  owner: Owner | undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ownerManagementSrv: OwnerManagementService,
    private msgSrv: MessageToastService
  ) {
    this.route.params
      .pipe(
        switchMap((param) => {
          this.isShow = param['type'] === 'display';
          this.ownerId = +param['id'];
          return ownerManagementSrv.getOne(this.ownerId);
        })
      )
      .subscribe((res) => {
        this.owner = res.data;
        this.resetObjs = {
          general: [
            {
              key: 'name',
              label: 'الاسم',
              value: this.owner?.name,
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
    if (this.ownerId) {
      this.ownerManagementSrv.edit(this.ownerId, event).subscribe((res) => {
        if (res.succeeded) {
          this.msgSrv.showSuccess('تم تعديل المدير');
          this.router.navigate(['owner/owner-management/show']);
        }
      });
    }
  }
}
