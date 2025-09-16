import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { DynamicViewComponent } from '../../../../shared/components/dynamic-view/dynamic-view.component';
import { InfoTable } from '../../../../shared/interface/info-table';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { ProductManagementService } from '../../../services/product-management.service';

@Component({
  selector: 'prod-management-show',
  imports: [DynamicViewComponent],
  templateUrl: './prod-management-show.component.html',
  styleUrl: './prod-management-show.component.scss',
})
export class ProdManagementShowComponent {
  tableConfig: InfoTable;
  imageField: string = '';
  columns = [
    {
      field: 'productName',
      header: 'الاسم',
      HeaderType: 'string',
    },
    {
      field: 'productDescription',
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
    this.productManagement.changeStatus(rowData.userId).subscribe((res) => {
      this.msgSrv.showMessage(res.message, res.succeeded);
      if (res.succeeded) {
        this.tableConfig.getSub$.next({});
      }
    });
  }
  addFunc: () => void = () => {
    this.router.navigate(['company/product-management/add']);
  };
  editFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['company/product-management/detail/edit/' + rowData.productID]);
  };
  displayFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['company/product-management/detail/display/' + rowData.productID]);
  };
  deleteFunc: (rowData: any) => void = (rowData: any) => {
    this.productManagement.delete(rowData.productID).subscribe((res) => {
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
    private productManagement: ProductManagementService
  ) {
    this.tableConfig = tableSrv.getStandardInfo(this.deleteFunc, this.editFunc, this.displayFunc, this.addFunc);
  }
  ngOnInit() {
    this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
      catchError((err) => {
        return of({
          data: [],
          columns: this.columns,
          loading: false,
          count: 0,
        });
      }),
      switchMap((body: any) => {
        if (body) {
          return this.productManagement.getAll(body).pipe(
            switchMap((res) =>
              of({
                data: res.data,
                columns: this.columns,
                loading: false,
                count: res.count,
              })
            ),
            catchError(() => of({ loading: false, data: [], columns: this.columns }))
          );
        }
        return of({ loading: false, data: [], columns: this.columns });
      })
    );
  }
}
