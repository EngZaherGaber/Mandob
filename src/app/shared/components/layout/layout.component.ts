import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ClientCartComponent } from '../../../client/components/client-cart/client-cart.component';
import { CompTasksComponent } from '../../../company/components/comp-tasks/comp-tasks.component';
import { UserStateService } from '../../../general/services/user-state.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { NotificationApp } from '../../interface/notficiation-app';
import { PrimeNgSharedModule } from '../../modules/shared/primeng-shared.module';
import { StateService } from '../../service/state.service';
import { HeaderComponent } from '../header/header.component';
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
    CompTasksComponent,
  ],
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
  constructor(
    public stateSrv: StateService,
    public router: Router,
    public userState: UserStateService,
  ) {}
  onClickOutside(event: any) {
    if (this.stateSrv.isOpenedNotficiation()) {
      this.stateSrv.collapseNotficiation();
    }
  }
  goToByNotification(value: NotificationApp) {
    this.stateSrv.markNotificationAsRead(value.id);
    this.router.navigate([this.userState.role() + '/' + value.type + '/' + value.recordId]);
  }
  timeSince(timestamp: Date): string {
    const date = new Date(timestamp);

    // Handle invalid or default date
    if (isNaN(date.getTime()) || date.getFullYear() <= 1900) {
      return 'قديم'; // or 'N/A' or ''
    }

    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);
    const weeks = Math.floor(seconds / (86400 * 7));
    const months = Math.floor(seconds / (86400 * 30));
    const years = Math.floor(seconds / (86400 * 365));

    if (years > 0) return `${years}Y`;
    if (months > 0) return `${months}M`;
    if (weeks > 0) return `${weeks}W`;
    if (days > 0) return `${days}D`;
    if (hours > 0) return `${hours}H`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds}s`;
  }
  ngOnDestroy() {
    this.stateSrv.wsSrv.stopConnection();
  }
}
