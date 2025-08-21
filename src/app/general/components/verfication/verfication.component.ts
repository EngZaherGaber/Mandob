import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DynamicInputComponent } from '../../../shared/components/dynamic-input/dynamic-input.component';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { UserStateService } from '../../services/user-state.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-verfication',
  imports: [ButtonModule, CommonModule, DynamicInputComponent, LoadingComponent],
  templateUrl: './verfication.component.html',
  styleUrl: './verfication.component.scss',
})
export class VerficationComponent {
  loginForm: FormGroup = new FormGroup({
    code: new FormControl(null),
    way: new FormControl(null),
  });
  isSend: boolean = false;
  loading: boolean = false;
  objs: InputDynamic[] = [
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
      key: 'way',
      value: null,
      label: 'طريقة التاكيد',
      dataType: 'list',
      required: true,
      visible: true,
      options: [
        {
          id: 0,
          name: 'الايميل',
        },
        {
          id: 1,
          name: 'رقم الموبايل',
        },
      ],
    },
  ];
  /**
   *
   */
  constructor(
    private msgSrv: MessageToastService,
    private router: Router,
    private userStateService: UserStateService
  ) {}
  getControl(name: string) {
    return this.loginForm.get(name) as FormControl;
  }
  send() {}
  verfication() {}
}
