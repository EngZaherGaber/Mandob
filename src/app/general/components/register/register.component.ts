import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicInputComponent } from '../../../shared/components/dynamic-input/dynamic-input.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { UserStateService } from '../../services/user-state.service';
import { Router } from '@angular/router';
import { DynmaicFormComponent } from '../../../shared/components/dynmaic-form/dynmaic-form.component';
import { MenuItem } from 'primeng/api';
import { ClientService } from '../../../client/services/client.service';
import { DynamicAttributeService } from '../../../shared/service/dynamic-attribute.service';
import { User } from '../../interfaces/user.model';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-register',
  imports: [ButtonModule, DynmaicFormComponent, CommonModule, LoadingComponent],
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
          key: 'username',
          label: 'اسم المستخدم',
          value: null,
          dataType: 'string',
          lang: 'en',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'email',
          label: 'الايميل',
          value: null,
          dataType: 'email',
          required: true,
          visible: true,
          options: [],
          command: (value?: any, input?: InputDynamic, form?: FormGroup, objs?: any) => {
            this.makeOneRequired('phoneNumber', value, input, form, objs);
          },
        },
        {
          key: 'phoneNumber',
          label: 'الرقم',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
          command: (value?: any, input?: InputDynamic, form?: FormGroup, objs?: any) => {
            this.makeOneRequired('email', value, input, form, objs);
          },
        },
      ],
      security: [
        {
          key: 'password',
          label: 'كلمة السر',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'confirmPassword',
          label: 'تاكيد كلمة السر',
          value: null,
          dataType: 'string',
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
  makeOneRequired(another: string, value?: any, input?: InputDynamic, form?: FormGroup, objs?: any) {
    if (form && objs) {
      if (value) {
        const anotherInpt = this.dyAttSrv.getInputDynamic('loginInfo', another, objs);
        const anotherControl = this.dyAttSrv.getFormControl('loginInfo', another, form);
        if (anotherInpt && anotherControl) {
          anotherInpt.required = false;
          anotherControl.clearValidators();
          anotherControl.updateValueAndValidity({ emitEvent: false });
        }
      } else {
        const anotherInpt = this.dyAttSrv.getInputDynamic('loginInfo', another, objs);
        const anotherControl = this.dyAttSrv.getFormControl('loginInfo', another, form);
        if (anotherInpt && anotherControl) {
          anotherInpt.required = true;
          anotherControl.addValidators(Validators.required);
          anotherControl.updateValueAndValidity({ emitEvent: false });
        }
      }
    }
  }

  register(body: any) {
    if (body.security.password !== body.security.confirmPassword) {
      this.msgSrv.showError('تاكيد كلمة السر ليس مطابق');
    } else {
      const user: User = {
        username: body.loginInfo.username,
        email: body.loginInfo.email,
        name: body.loginInfo.name,
        phoneNumber: body.loginInfo.phoneNumber,
        commercialRegistrationNumber: body.generalInfo.commercialRegistrationNumber,
        address: body.generalInfo.address,
        companyLogos: [],
        password: body.security.password,
        role: 'client',
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
