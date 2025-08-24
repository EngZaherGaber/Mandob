import { Component, Signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DynamicInputComponent } from '../../../shared/components/dynamic-input/dynamic-input.component';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { UserStateService } from '../../services/user-state.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { User } from '../../interfaces/user.model';
import { load } from '@fingerprintjs/fingerprintjs';
import { AuthService } from '../../services/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-verfication',
  imports: [ButtonModule, CommonModule, DynamicInputComponent, LoadingComponent],
  templateUrl: './verfication.component.html',
  styleUrl: './verfication.component.scss',
})
export class VerficationComponent {
  form: FormGroup = new FormGroup({
    verificationMethod: new FormControl(null),
    email: new FormControl(null),
    phoneNumber: new FormControl(null),
    code: new FormControl(null),
  });
  step: number = 1;
  loading: boolean = false;
  objs: InputDynamic[] = [];
  role: Signal<string | null>;
  /**
   *
   */
  constructor(private router: Router, private userState: UserStateService, private authSrv: AuthService) {
    userState.setStrategy();
    this.role = userState.role;
    this.objs = [
      {
        key: 'verificationMethod',
        value: null,
        label: 'طريقة التاكيد',
        dataType: 'list',
        required: true,
        visible: true,
        options: [
          {
            id: 1,
            name: 'الايميل',
          },
          {
            id: 2,
            name: 'رقم الموبايل',
          },
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
    ];
    this.getControl('verificationMethod').valueChanges.subscribe((value) => {
      if (this.role() === 'company' || this.role() === 'distributor') {
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
      }
    });
  }
  getControl(name: string) {
    return this.form.get(name) as FormControl;
  }
  send() {
    this.loading = true;
    let formValue;
    const role = this.role();
    const body = this.form.value;
    if (role) {
      if (role === 'client' || role === 'owner') {
        formValue = { verificationMethod: body.verificationMethod };
      } else {
        formValue = { verificationMethod: body.verificationMethod, email: body.email, phoneNumber: body.phoneNumber };
      }
    }
    this.userState.strategy?.requestVerfication(formValue).subscribe(
      (res) => {
        if (res.succeeded) {
          this.loading = false;
          this.step = 2;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }
  verfication() {
    this.authSrv.verifyCode({ code: this.form.value.code }).subscribe((res) => {
      if (res.succeeded) {
        this.router.navigate(['']);
      }
    });
  }
}
