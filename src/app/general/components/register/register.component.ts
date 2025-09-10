import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ClientService } from '../../../client/services/client.service';
import { DynmaicFormComponent } from '../../../shared/components/dynmaic-form/dynmaic-form.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../shared/modules/shared/primeng-shared.module';
import { DynamicAttributeService } from '../../../shared/service/dynamic-attribute.service';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { UserStateService } from '../../services/user-state.service';

@Component({
  selector: 'app-register',
  imports: [PrimeNgSharedModule, DynmaicFormComponent, LoadingComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  loading: boolean = false;
  stepsList: MenuItem[] = [
    {
      label: 'معلومات الحساب',
    },
    {
      label: 'الامان',
    },
    {
      label: 'المعلومات التجارية',
    },
  ];
  /**
   *
   */

  constructor(
    private msgSrv: MessageToastService,
    private clientSrv: ClientService,
    private dyAttSrv: DynamicAttributeService,
    private router: Router,
    private userStateService: UserStateService
  ) {
    this.resetObjs = {
      loginInfo: [
        {
          key: 'name',
          label: 'اسم',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'email',
          label: 'الايميل',
          value: null,
          dataType: 'string',
          lang: 'en',
          required: true,
          visible: true,
          options: [],
        },
      ],
      security: [
        {
          key: 'password',
          label: 'كلمة السر',
          value: null,
          dataType: 'password',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'confirmPassword',
          label: 'تاكيد كلمة السر',
          value: null,
          dataType: 'password',
          required: true,
          visible: true,
          options: [],
        },
      ],
      generalInfo: [
        {
          key: 'commercialRegistrationNumber',
          label: 'السجل التجاري',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'address',
          label: 'العنوان',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
      ],
    };
  }

  register(body: any) {
    if (body.security.password !== body.security.confirmPassword) {
      this.msgSrv.showError('تاكيد كلمة السر ليس مطابق');
    } else {
      const user = {
        name: body.loginInfo.name,
        email: body.loginInfo.email,
        password: body.security.password,
        commercialRegistrationNumber: body.generalInfo.commercialRegistrationNumber,
        address: body.generalInfo.address,
      };
      this.loading = true;
      this.clientSrv.create(user).subscribe(
        (res) => {
          this.loading = false;
          this.router.navigate(['auth/login']);
        },
        (err) => {
          this.loading = false;
        }
      );
    }
  }
  goToLogin() {
    this.router.navigate(['auth/login']);
  }
}
