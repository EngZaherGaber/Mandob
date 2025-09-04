import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserStateService } from '../../../general/services/user-state.service';
import { PrimeNgSharedModule } from '../../modules/shared/primeng-shared.module';
import { StateService } from '../../service/state.service';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-layout',
  imports: [SidenavComponent, RouterOutlet, HeaderComponent, PrimeNgSharedModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [
    trigger('sidebarAnimation', [
      transition(':enter', [
        style({ width: '0', overflow: 'hidden' }),
        animate('0.5s ease-in', style({ width: '16.6667%' })),
      ]),
      transition(':leave', [animate('0.5s ease-in', style({ width: '0', overflow: 'hidden' }))]),
    ]),
    trigger('contentAnimation', [transition('* <=> *', [animate('0.5s ease-in', style({ width: '*' }))])]),
  ],
})
export class LayoutComponent {
  constructor(public stateSrv: StateService, private userState: UserStateService) {}
}
