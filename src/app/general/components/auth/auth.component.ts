import { Component } from '@angular/core';
import { DynamicInputComponent } from '../../../shared/components/dynamic-input/dynamic-input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { ButtonModule } from 'primeng/button';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { Router, RouterOutlet } from '@angular/router';
import { User } from '../../interfaces/user.model';
import { UserStateService } from '../../services/user-state.service';

@Component({
  selector: 'auth',
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {}
