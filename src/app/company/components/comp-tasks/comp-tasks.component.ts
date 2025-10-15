import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { PrimeNgSharedModule } from '../../../shared/modules/shared/primeng-shared.module';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { StateService } from '../../../shared/service/state.service';
import { CompTask } from '../../interfaces/comp-task';
import { CompanyRequestService } from '../../services/company-request.service';

@Component({
  selector: 'comp-tasks',
  imports: [PrimeNgSharedModule, FormsModule],
  templateUrl: './comp-tasks.component.html',
  styleUrl: './comp-tasks.component.scss',
})
export class CompTasksComponent {
  result: CompTask[] = [];
  get$: Subject<any> = new Subject();
  getSub$: Observable<any> = new Observable();
  constructor(
    public stateSrv: StateService,
    public router: Router,
    public msgSrv: MessageToastService,
    private companyRequestSrv: CompanyRequestService,
  ) {
    this.getSub$ = this.get$.pipe(
      switchMap((res) => {
        return this.companyRequestSrv.myTask().pipe(
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
