import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DynamicInputComponent } from '../../../shared/components/dynamic-input/dynamic-input.component';
import { DynamicAttributeService } from '../../../shared/service/dynamic-attribute.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { UserStateService } from '../../services/user-state.service';

@Component({
  selector: 'app-forget-password',
  imports: [ButtonModule, DynamicInputComponent, CommonModule, LoadingComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  form: FormGroup = new FormGroup({
    preferredVerificationMethod: new FormControl(null),
    email: new FormControl(null),
    phoneNumber: new FormControl(null),
    code: new FormControl(null),
    newPassword: new FormControl(null),
  });
  step: number = 1;
  loading: boolean = false;
  objs: InputDynamic[] = [
    {
      key: 'preferredVerificationMethod',
      value: null,
      label: 'طريقة التاكيد',
      dataType: 'list',
      required: true,
      visible: true,
      options: [
        { id: 1, name: 'الايميل' },
        { id: 2, name: 'رقم الهاتف' },
      ],
    },
    {
      key: 'email',
      value: null,
      label: 'الايميل',
      dataType: 'string',
      required: true,
      visible: false,
      options: [],
    },
    {
      key: 'phoneNumber',
      value: null,
      label: 'رقم الهاتف',
      dataType: 'password',
      required: true,
      visible: false,
      options: [],
    },
    {
      key: 'code',
      value: null,
      label: 'كود التاكيد',
      dataType: 'string',
      required: true,
      visible: true,
      options: [],
    },
    {
      key: 'newPassword',
      value: null,
      label: 'كلمة السر الجديدة',
      dataType: 'string',
      required: true,
      visible: true,
      options: [],
    },
  ];
  constructor(
    private router: Router,
    private authSrv: AuthService,
    private userState: UserStateService,
    private socialAuthService: SocialAuthService
  ) {
    this.getControl('preferredVerificationMethod').valueChanges.subscribe((value) => {
      switch (value) {
        case 1:
          this.objs[1].visible = true;
          this.objs[1].value = null;
          this.objs[2].visible = false;
          this.objs[2].value = null;
          break;
        case 2:
          this.objs[2].visible = true;
          this.objs[2].value = null;
          this.objs[1].visible = false;
          this.objs[1].value = null;
          break;

        default:
          this.objs[2].visible = false;
          this.objs[2].value = null;
          this.objs[1].visible = false;
          this.objs[1].value = null;
          break;
      }
    });
  }
  getControl(name: string) {
    return this.form.get(name) as FormControl;
  }
  login() {
    this.router.navigate(['auth/login']);
  }
  sentCode() {
    this.loading = true;
    const formValue = {
      preferredVerificationMethod: this.form.value.preferredVerificationMethod,
      email: this.form.value.email,
      phoneNumber: this.form.value.phoneNumber,
    };
    this.authSrv.forgetPassword(formValue).subscribe(
      (res) => {
        if (res.data) {
          this.loading = false;
          this.step = 2;
        }
      },
      (err) => {
        this.loading = false;
      }
    );
  }
  verfication() {
    this.loading = true;
    const formValue = {
      code: this.form.value.code,
      email: this.form.value.email,
      phoneNumber: this.form.value.phoneNumber,
    };
    this.authSrv.verfiyCodeForForgetPassword(formValue).subscribe(
      (res) => {
        this.loading = false;
        this.userState.setToken(res.data.accessToken, res.data.refreshToken);
        const token = this.authSrv.helper.decodeToken(res.data.token);
        this.step = 3;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }
  resetPassword() {
    this.loading = true;
    const formValue = {
      code: this.form.value.code,
      verificationMethod: this.form.value.preferredVerificationMethod,
      newPassword: this.form.value.newPassword,
      email: this.form.value.email,
      phoneNumber: this.form.value.phoneNumber,
    };
    this.authSrv.resetPassword(formValue).subscribe(
      (res) => {
        this.loading = false;
        if (res.succeeded) {
          this.router.navigate(['']);
        }
      },
      (err) => {
        this.loading = false;
      }
    );
  }
  ifValid() {
    return (
      !this.getControl('preferredVerificationMethod').value &&
      !(this.getControl('email').value || this.getControl('phoneNumber').value)
    );
  }
}
