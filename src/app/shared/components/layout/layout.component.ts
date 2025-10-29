import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ClientCartComponent } from '../../../client/components/client-cart/client-cart.component';
import { CompTasksComponent } from '../../../company/components/comp-tasks/comp-tasks.component';
import { DistributorTasksComponent } from '../../../distributor/components/distributor-tasks/distributor-tasks.component';
import { UserStateService } from '../../../general/services/user-state.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { PrimeNgSharedModule } from '../../modules/shared/primeng-shared.module';
import { StateService } from '../../service/state.service';
import { HeaderComponent } from '../header/header.component';
import { NotificationMenuComponent } from '../notification-menu/notification-menu.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'layout',
  imports: [
    SidenavComponent,
    RouterOutlet,
    HeaderComponent,
    ClickOutsideDirective,
    ClientCartComponent,
    PrimeNgSharedModule,
    NotificationMenuComponent,
    CompTasksComponent,
    DistributorTasksComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [
    trigger('sidebarAnimation', [
      transition(':enter', [
        style({ width: '0px', overflow: 'hidden' }),
        animate('400ms ease-out', style({ width: '250px' })), // use px to debug
      ]),
      transition(':leave', [style({ overflow: 'hidden' }), animate('400ms ease-in', style({ width: '0px' }))]),
    ]),
    trigger('contentAnimation', [transition('* <=> *', [animate('0.5s ease-in', style({ width: '*' }))])]),
  ],
})
export class LayoutComponent {
  constructor(
    public stateSrv: StateService,
    public router: Router,
    public userState: UserStateService,
  ) {}
  onClickOutside(event: any) {
    if (this.stateSrv.isOpenedNotficiation()) {
      this.stateSrv.collapseNotficiation();
    } else if (this.stateSrv.isOpenedCart()) {
      this.stateSrv.collapseCart();
    }
  }
  ngOnDestroy() {
    this.stateSrv.wsSrv.stopConnection();
  }
}
