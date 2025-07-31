import { Component } from '@angular/core';
import { DynamicInputComponent } from '../../../shared/components/dynamic-input/dynamic-input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { ButtonModule } from 'primeng/button';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [DynamicInputComponent, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null, [Validators.min(8)]),
  });
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
  /**
   *
   */
  constructor(private msgSrv: MessageToastService, private router: Router) {}
  getControl(name: string) {
    return this.loginForm.get(name) as FormControl;
  }
  login() {
    this.msgSrv.showSuccess('تم تسجيل الدخول');
    this.router.navigate(['']);
  }
}
