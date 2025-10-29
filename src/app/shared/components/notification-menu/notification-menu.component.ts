import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '../../../general/services/user-state.service';
import { ReviewSubmitComponent } from '../../../review/components/review-submit/review-submit.component';
import { NotificationApp } from '../../interface/notficiation-app';
import { PrimeNgSharedModule } from '../../modules/shared/primeng-shared.module';
import { MessageToastService } from '../../service/message-toast.service';
import { StateService } from '../../service/state.service';

@Component({
  selector: 'notification-menu',
  imports: [PrimeNgSharedModule, ReviewSubmitComponent],
  templateUrl: './notification-menu.component.html',
  styleUrl: './notification-menu.component.scss',
})
export class NotificationMenuComponent {
  showSubmitReview: boolean = false;
  requestID: number | null = null;
  constructor(
    public stateSrv: StateService,
    public router: Router,
    public msgSrv: MessageToastService,
    public userState: UserStateService,
  ) {}
  goToByNotification(value: NotificationApp) {
    switch (value.type) {
      case 'تقييم':
        this.requestID = value.recordId;
        this.showSubmitReview = true;
        break;

      default:
        this.router.navigate([this.userState.role() + '/' + value.type + '/' + value.recordId]);
        break;
    }
    this.stateSrv.markNotificationAsRead(value.id);
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
