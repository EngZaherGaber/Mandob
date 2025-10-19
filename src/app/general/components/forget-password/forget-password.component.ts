import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicInputComponent } from '../../../shared/components/dynamic-input/dynamic-input.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../shared/modules/shared/primeng-shared.module';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { AuthService } from '../../services/auth.service';
import { UserStateService } from '../../services/user-state.service';

@Component({
  selector: 'forget-password',
  imports: [PrimeNgSharedModule, DynamicInputComponent, LoadingComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(null),
    code: new FormControl(null),
    newPassword: new FormControl(null),
  });
  step: number = 1;
  loading: boolean = false;
  objs: InputDynamic[] = [
    {
      key: 'email',
      value: null,
      label: 'الايميل',
      dataType: 'string',
      required: true,
      visible: true,
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
    private msgSrv: MessageToastService,
  ) {}
  getControl(name: string) {
    return this.form.get(name) as FormControl;
  }
  login() {
    this.router.navigate(['auth/login']);
  }
  forgetPassword() {
    this.loading = true;
    const formValue = {
      email: this.form.value.email,
    };
    this.authSrv.forgetPassword(formValue).subscribe(
      (res) => {
        if (res.data) {
          this.loading = false;
          this.msgSrv.showSuccess(res.message);
          this.step = 2;
        }
      },
      (err) => {
        this.loading = false;
      },
    );
  }
  verfication() {
    this.loading = true;
    const formValue = {
      code: this.form.value.code,
      email: this.form.value.email,
    };
    this.authSrv.verfiyCodeForForgetPassword(formValue).subscribe(
      (res) => {
        this.loading = false;
        // this.userState.setToken(res.data.accessToken, res.data.refreshToken);
        const token = this.authSrv.helper.decodeToken(res.data.token);
        this.step = 3;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      },
    );
  }
  resetPassword() {
    this.loading = true;
    const formValue = {
      code: this.form.value.code,
      newPassword: this.form.value.newPassword,
      email: this.form.value.email,
    };
    this.authSrv.resetPassword(formValue).subscribe(
      (res) => {
        this.loading = false;
        if (res.succeeded) this.router.navigate(['auth/login']);
      },
      (err) => {
        this.loading = false;
      },
    );
  }
  reSendCode() {
    this.authSrv.resendCode({ email: this.form.value.email }).subscribe((res) => {
      this.msgSrv.showMessage(res.message, res.succeeded);
    });
  }
}
