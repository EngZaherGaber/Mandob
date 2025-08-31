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
import { User } from '../../interfaces/user';
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
  codeControl: FormControl = new FormControl(null);
  loading: boolean = false;
  codeInput: InputDynamic;
  // role: Signal<string | null>;
  /**
   *
   */
  constructor(private router: Router, private userState: UserStateService, private authSrv: AuthService) {
    // this.role = userState.role;
    this.codeInput = {
      key: 'code',
      value: null,
      label: 'كود التاكيد',
      dataType: 'string',
      required: true,
      visible: true,
      options: [],
    };
  }

  verfication() {
    this.authSrv.verifyCode({ code: this.codeControl.value }).subscribe((res) => {
      if (res.succeeded) this.router.navigate(['']);
    });
  }
}
