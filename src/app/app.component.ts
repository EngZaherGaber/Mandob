import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { AuthService } from './general/services/auth.service';

@Component({
  selector: 'root',
  imports: [RouterOutlet, Toast, ConfirmDialog, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Mandob';
  constructor(public authSrv: AuthService) {}
}
