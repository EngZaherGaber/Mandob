import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { catchError, of, switchMap } from 'rxjs';
import { UserStateService } from '../../../../general/services/user-state.service';
import { DynamicViewComponent } from '../../../../shared/components/dynamic-view/dynamic-view.component';
import { columnTable } from '../../../../shared/interface/body-table';
import { EventColumn } from '../../../../shared/interface/event-column';
import { InfoTable } from '../../../../shared/interface/info-table';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { CollectionManagementService } from '../../../services/collection-management.service';

@Component({
  selector: 'collection-management-show',
  imports: [DynamicViewComponent],
  templateUrl: './collection-management-show.component.html',
  styleUrl: './collection-management-show.component.scss',
})
export class CollectionManagementShowComponent {
  tableConfig: InfoTable;
  imageField: string = 'collectionImageUrl';
  columns: columnTable[] = [
    {
      field: 'isActive',
      header: 'فعال',
      headerType: 'toggle',
    },
    {
      field: 'name',
      header: 'الاسم',
      headerType: 'string',
    },
    {
      field: 'description',
      header: 'الوصف',
      headerType: 'string',
    },
  ];
  columnsEvent: EventColumn[] = [
    {
      field: 'isActive',
      command: (event: any, field: string, rowData: any) => {
        this.changeState(rowData);
      },
    },
  ];

  addFunc: () => void = () => {
    this.router.navigate(['company/collection-management/add']);
  };
  editFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['company/collection-management/detail/edit/' + rowData.id]);
  };
  displayFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['company/collection-management/detail/display/' + rowData.id]);
  };
  changeState: (rowData: any) => void = (rowData: any) => {
    this.confirmationService.confirm({
      message: 'هل تريد تغيير حالة هذا المجموعة؟',
      header: 'تغيير حالة المجموعة',
      icon: 'pi pi-info-circle',
      rejectLabel: 'الغاء',
      rejectButtonProps: {
        label: 'الغاء',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'تاكيد',
        severity: 'danger',
      },

      accept: () => {
        this.collectionManagement.changeStatus(rowData.id).subscribe((res) => {
          this.msgSrv.showMessage(res.message, res.succeeded);
          if (res.succeeded) this.tableConfig.getSub$.next({});
        });
      },
    });
  };
  deleteFunc: (rowData: any) => void = (rowData: any) => {
    this.confirmationService.confirm({
      message: 'هل تريد حذف هذه المجموعة؟',
      header: 'حذف المجموعة',
      icon: 'pi pi-info-circle',
      rejectLabel: 'الغاء',
      rejectButtonProps: {
        label: 'الغاء',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'تأكييد',
        severity: 'danger',
      },

      accept: () => {
        this.collectionManagement.delete(rowData.id).subscribe((res) => {
          this.msgSrv.showMessage(res.message, res.succeeded);
          if (res.succeeded) this.tableConfig.getSub$.next({});
        });
      },
    });
  };

  constructor(
    tableSrv: DyTableService,
    private msgSrv: MessageToastService,
    private userState: UserStateService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private collectionManagement: CollectionManagementService,
  ) {
    this.tableConfig = tableSrv.getStandardInfo(this.deleteFunc, this.editFunc, this.displayFunc, this.addFunc);
  }
  ngOnInit() {
    this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
      switchMap((body: any) => {
        const user = this.userState.user();
        if (body && user && user.userId) {
          return this.collectionManagement.getAll(body, user.userId).pipe(
            switchMap((res) =>
              of({
                data: res.data,
                columns: this.columns,
                loading: false,
                count: res.count,
              }),
            ),
            catchError(() => of({ loading: false, data: [], columns: this.columns })),
          );
        }
        return of({ loading: false, data: [], columns: this.columns });
      }),
    );
  }
}
