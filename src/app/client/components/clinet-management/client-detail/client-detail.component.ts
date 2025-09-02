import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { Owner } from '../../../../owner/interfaces/owner';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { ClientManagementService } from '../../../services/client-management.service';

@Component({
  selector: 'app-client-detail',
  imports: [DynmaicFormComponent, CommonModule],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.scss',
})
export class ClientDetailComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  ownerId: number | undefined;
  owner: Owner | undefined;
  constructor(clientManagementSrv: ClientManagementService, private route: ActivatedRoute) {
    this.route.params
      .pipe(
        switchMap((param) => {
          this.ownerId = +param['id'];
          return clientManagementSrv.getOne(this.ownerId);
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
            {
              key: 'email',
              label: 'الايميل',
              value: this.owner?.name,
              dataType: 'string',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'phoneNumber',
              label: 'رقم الهاتف',
              value: this.owner?.name,
              dataType: 'string',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'address',
              label: 'العنوان',
              value: this.owner?.name,
              dataType: 'string',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'commercialRegistrationNumber',
              label: 'السجل التجاري',
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
}
