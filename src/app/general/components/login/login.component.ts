import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, Signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicInputComponent } from '../../../shared/components/dynamic-input/dynamic-input.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../shared/modules/shared/primeng-shared.module';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { AuthService } from '../../services/auth.service';
import { UserStateService } from '../../services/user-state.service';

@Component({
  selector: 'login',
  imports: [PrimeNgSharedModule, DynamicInputComponent, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    input: new FormControl(null),
    password: new FormControl(null, [Validators.min(8)]),
  });
  loading: boolean = false;
  objs: InputDynamic[] = [
    {
      key: 'email',
      value: null,
      label: 'الايميل او رقم الهاتف',
      dataType: 'string',
      required: true,
      visible: true,
      options: [],
    },
    {
      key: 'password',
      value: null,
      label: 'كلمة السر',
      dataType: 'password',
      required: true,
      visible: true,
      options: [],
    },
  ];
  isBrowser: Signal<boolean>;
  user: SocialUser | null = null;
  /**
   *
   */
  constructor(
    private router: Router,
    private userState: UserStateService,
    private authSrv: AuthService,
    private msgSrv: MessageToastService
  ) {
    this.isBrowser = authSrv.isBrowser;
  }
  ngOnInit() {}

  getControl(name: string) {
    return this.loginForm.get(name) as FormControl;
  }
  login() {
    this.loading = true;
    const formValue = this.loginForm.value;
    this.authSrv.login(formValue['input'], formValue['password']).subscribe(
      (res) => {
        const data = res.data;
        if (res.succeeded) {
          localStorage.setItem('role', data.role);
          localStorage.setItem('name', data.name);
          this.userState.user.set(null);
          if (data.isVerified === true) this.router.navigate(['']);
        } else {
          this.loading = false;
          this.msgSrv.showError(res.message);
          if (data?.isVerified === false)
            this.router.navigate(['auth/verfication'], { state: { input: formValue['input'] } });
        }
      },
      (err) => {
        this.loading = false;
      }
    );
  }
  goToRegister() {
    this.router.navigate(['auth/register']);
  }
  forgetPassword() {
    this.router.navigate(['auth/forget-password']);
  }
}
