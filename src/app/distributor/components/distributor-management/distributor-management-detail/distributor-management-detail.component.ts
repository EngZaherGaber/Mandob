import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { Distributor } from '../../../interfaces/distributor';
import { DistributorManagementService } from '../../../services/distributor-management.service';

@Component({
  selector: 'distributor-management-detail',
  imports: [DynmaicFormComponent],
  templateUrl: './distributor-management-detail.component.html',
  styleUrl: './distributor-management-detail.component.scss',
})
export class DistributorDetailComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  type: string = '';
  distributor: Distributor | null = null;
  isShow: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private distributorManagement: DistributorManagementService,
    private msgSrv: MessageToastService,
  ) {
    this.route.params
      .pipe(
        switchMap((param) => {
          this.type = param['type'];
          this.isShow = this.type === 'display';
          return this.distributorManagement.getOne(param['id']);
        }),
      )
      .subscribe((res) => {
        this.distributor = res.data;
        this.resetObjs = {
          general: [
            {
              key: 'name',
              label: 'الاسم',
              value: this.distributor.name,
              dataType: 'string',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'email',
              label: 'الايميل',
              value: this.distributor.email,
              dataType: 'string',
              required: true,
              visible: true,
              options: [],
            },
            // {
            //   key: 'phoneNumber',
            //   label: 'رقم الهاتف',
            //   value: null,
            //   dataType: 'string',
            //   required: true,
            //   visible: true,
            //   options: [],
            // },
          ],
        };
      });
  }
  ngOnInit() {}
  submit(event: any) {
    if (this.distributor && this.distributor.userId) {
      this.distributorManagement.edit(this.distributor.userId, event).subscribe((res) => {
        if (res.succeeded) {
          this.router.navigate(['company/distributor-management/show']);
        }
      });
    }
  }
}
