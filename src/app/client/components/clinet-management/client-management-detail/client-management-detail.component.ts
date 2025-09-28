import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { Client } from '../../../interfaces/client';
import { ClientManagementService } from '../../../services/client-management.service';

@Component({
  selector: 'client-detail',
  imports: [DynmaicFormComponent, CommonModule],
  templateUrl: './client-management-detail.component.html',
  styleUrl: './client-management-detail.component.scss',
})
export class ClientManagementDetailComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  clientId: number | undefined;
  client: Client | undefined;
  constructor(clientManagement: ClientManagementService, private route: ActivatedRoute) {
    this.route.params
      .pipe(
        switchMap((param) => {
          this.clientId = +param['id'];
          return clientManagement.getOne(this.clientId);
        })
      )
      .subscribe((res) => {
        this.client = res.data;
        this.resetObjs = {
          general: [
            {
              key: 'name',
              label: 'الاسم',
              value: this.client?.name,
              dataType: 'string',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'email',
              label: 'الايميل',
              value: this.client?.email,
              dataType: 'string',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'phoneNumber',
              label: 'رقم الهاتف',
              value: this.client?.phoneNumber,
              dataType: 'string',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'address',
              label: 'العنوان',
              value: this.client?.address,
              dataType: 'string',
              required: true,
              visible: true,
              options: [],
            },
            {
              key: 'commercialRegistrationNumber',
              label: 'السجل التجاري',
              value: this.client?.commercialRegistrationNumber,
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
