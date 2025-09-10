import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { DynamicViewComponent } from '../../../../shared/components/dynamic-view/dynamic-view.component';
import { InfoTable } from '../../../../shared/interface/info-table';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { CollectionManagementService } from '../../../services/collection-management.service';

@Component({
  selector: 'app-collection-management-show',
  imports: [DynamicViewComponent],
  templateUrl: './collection-management-show.component.html',
  styleUrl: './collection-management-show.component.scss',
})
export class CollectionManagementShowComponent {
  tableConfig: InfoTable;
  imageField: string = 'collectionImageUrl';
  columns = [
    {
      field: 'collectionName',
      header: 'الاسم',
      HeaderType: 'string',
    },
    {
      field: 'description',
      header: 'الوصف',
      HeaderType: 'string',
    },
    {
      field: 'isActive',
      header: 'فعال',
      HeaderType: 'Toggle',
    },
  ];
  columnsEvent = [
    {
      field: 'isActive',
      command: (event: any, field: string, rowData: any) => {
        this.changeState(rowData);
      },
    },
  ];
  changeState(rowData: any) {
    this.collectionManagementSrv.changeStatus(rowData.userId).subscribe((res) => {
      this.msgSrv.showMessage(res.message, res.succeeded);
      if (res.succeeded) {
        this.tableConfig.getSub$.next({});
      }
    });
  }
  addFunc: () => void = () => {
    this.router.navigate(['company/collection-management/add']);
  };
  editFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['company/collection-management/detail/edit/' + rowData.productID]);
  };
  displayFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['company/collection-management/detail/display/' + rowData.productID]);
  };
  deleteFunc: (rowData: any) => void = (rowData: any) => {
    this.collectionManagementSrv.delete(rowData.productID).subscribe((res) => {
      this.msgSrv.showMessage(res.message, res.succeeded);
      if (res.succeeded) {
        this.tableConfig.getSub$.next({});
      }
    });
  };

  constructor(
    tableSrv: DyTableService,
    private msgSrv: MessageToastService,
    private router: Router,
    private collectionManagementSrv: CollectionManagementService
  ) {
    this.tableConfig = tableSrv.getStandardInfo(this.deleteFunc, this.editFunc, this.displayFunc, this.addFunc);
  }
  ngOnInit() {
    this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
      switchMap((body: any) => {
        if (body) {
          return this.collectionManagementSrv.getAll(body).pipe(
            switchMap((res) =>
              of({
                data: res.data,
                columns: this.columns,
                loading: false,
                count: res.data.length,
              })
            ),
            catchError(() => of({ loading: false, data: [], columns: [] }))
          );
        }
        return of({ loading: false, data: [], columns: [] });
      })
    );
    this.tableConfig.getSub$.next({});
  }
}
