import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicInputComponent } from '../../../shared/components/dynamic-input/dynamic-input.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../shared/modules/shared/primeng-shared.module';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { AuthService } from '../../services/auth.service';
import { UserStateService } from '../../services/user-state.service';

@Component({
  selector: 'verfication',
  imports: [PrimeNgSharedModule, DynamicInputComponent, LoadingComponent],
  templateUrl: './verfication.component.html',
  styleUrl: './verfication.component.scss',
})
export class VerficationComponent {
  codeControl: FormControl = new FormControl(null);
  input: string = '';
  loading: boolean = false;
  codeInput: InputDynamic;
  // role: Signal<string | null>;
  /**
   *
   */
  constructor(
    private router: Router,
    private userState: UserStateService,
    private msgSrv: MessageToastService,
    private authSrv: AuthService,
  ) {
    // this.role = userState.role;
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.input = nav.extras.state['input'] ?? '';
    }
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
  reSendCode() {
    this.authSrv.resendCode({ email: this.input }).subscribe((res) => {
      this.msgSrv.showMessage(res.message, res.succeeded);
    });
  }
  verfication() {
    this.authSrv.verifyCode({ code: this.codeControl.value, email: this.input }).subscribe((res) => {
      if (res.succeeded) this.router.navigate(['']);
    });
  }
}
