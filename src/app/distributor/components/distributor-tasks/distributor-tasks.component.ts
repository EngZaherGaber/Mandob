import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { PrimeNgSharedModule } from '../../../shared/modules/shared/primeng-shared.module';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { StateService } from '../../../shared/service/state.service';
import { DistributorTask } from '../../interfaces/distributor-task';
import { DistributorRequestService } from '../../services/distributor-request.service';

@Component({
  selector: 'distributor-tasks',
  imports: [PrimeNgSharedModule],
  templateUrl: './distributor-tasks.component.html',
  styleUrl: './distributor-tasks.component.scss',
})
export class DistributorTasksComponent {
  result: DistributorTask[] = [];
  get$: Subject<any> = new Subject();
  getSub$: Observable<any> = new Observable();
  constructor(
    public stateSrv: StateService,
    public router: Router,
    public msgSrv: MessageToastService,
    private distributorRequestSrv: DistributorRequestService,
  ) {
    this.getSub$ = this.get$.pipe(
      switchMap((res) => {
        return this.distributorRequestSrv.myTask().pipe(
          switchMap((res) => {
            if (res.succeeded) {
              this.result = res.data;
            }
            return of(null);
          }),
        );
      }),
    );
    this.getSub$.subscribe((res) => {});
    this.get$.next(true);
  }

  goToTask(taskId: number, relatedEntityId: number) {
    switch (taskId) {
      case 1:
        this.router.navigate(['company/request-management/waiting/show']);
        break;

      default:
        this.router.navigate(['company/return-management/show']);
        break;
    }
  }
}
