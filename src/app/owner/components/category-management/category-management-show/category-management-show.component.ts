import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { DynamicViewComponent } from '../../../../shared/components/dynamic-view/dynamic-view.component';
import { InfoTable } from '../../../../shared/interface/info-table';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { CategoryManagementService } from '../../../services/category-management.service';

@Component({
  selector: 'category-management-show',
  imports: [DynamicViewComponent, CommonModule],
  templateUrl: './category-management-show.component.html',
  styleUrl: './category-management-show.component.scss',
})
export class CategoryManagementShowComponent {
  tableConfig: InfoTable;
  imageField: string = '';
  type: 'table' | 'list' | string = 'table';
  columns = [
    {
      field: 'categoryName',
      header: 'اسم التصنيف',
      HeaderType: 'string',
    },
  ];
  addFunc: () => void = () => {
    this.router.navigate(['owner/category-management/add']);
  };
  editFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['owner/category-management/detail/edit/' + rowData.categoryID]);
  };
  displayFunc: (rowData: any) => void = (rowData: any) => {
    this.router.navigate(['owner/category-management/detail/display/' + rowData.categoryID]);
  };
  deleteFunc: (rowData: any) => void = (rowData: any) => {
    this.categoryManagement.delete(rowData.categoryID).subscribe((res) => {
      if (res.succeeded) {
        this.tableConfig.getSub$.next({});
        this.msgSrv.showSuccess('تم حذف الشركة');
      } else {
        this.msgSrv.showError(res.message);
      }
    });
  };
  constructor(
    private tableSrv: DyTableService,
    private msgSrv: MessageToastService,
    private router: Router,
    private categoryManagement: CategoryManagementService
  ) {
    this.tableConfig = tableSrv.getStandardInfo(this.deleteFunc, this.editFunc, this.displayFunc, this.addFunc);
  }
  ngOnInit() {
    this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
      switchMap((body: any) => {
        if (body) {
          return this.categoryManagement.getAll(body).pipe(
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
