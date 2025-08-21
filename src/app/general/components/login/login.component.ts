import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicInputComponent } from '../../../shared/components/dynamic-input/dynamic-input.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { UserStateService } from '../../services/user-state.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login',
  imports: [ButtonModule, DynamicInputComponent, LoadingComponent, CommonModule],
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

  user: SocialUser | null = null;
  /**
   *
   */
  constructor(
    private msgSrv: MessageToastService,
    private router: Router,
    private authSrv: AuthService,
    private userState: UserStateService,
    private socialAuthService: SocialAuthService
  ) {}
  ngOnInit() {
    this.userState.storeUser(null);
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
    });
  }
  // TODO:: login and register for social
  signInWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  getControl(name: string) {
    return this.loginForm.get(name) as FormControl;
  }
  login() {
    this.loading = true;
    const formValue = this.loginForm.value;
    this.authSrv.login(formValue['input'], formValue['password']).subscribe(
      (res: any) => {
        this.loading = false;
        this.userState.setToken(res.data.accessToken, res.data.refreshToken);
        const token = this.authSrv.helper.decodeToken(res.data.token);
        this.msgSrv.showSuccess(' تم تسجيل الدخول' + token.unique_name);
        if (token.IsVerified || token.IsActive) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['auth/verfication']);
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
