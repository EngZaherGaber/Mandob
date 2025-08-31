import { Component } from '@angular/core';
import { switchMap, of, catchError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompanyStrategy } from '../../../../company/classes/company-strategy';
import { DynamicCardListComponent } from '../../../../shared/components/dynamic-card-list/dynamic-card-list.component';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { InfoTable } from '../../../../shared/interface/info-table';
import { DyTableService } from '../../../../shared/service/dy-table.service';

@Component({
  selector: 'app-ad-company-show',
  imports: [
    // DynamicTableComponent, DynamicCardListComponent,
    CommonModule,
  ],
  templateUrl: './ad-company-show.component.html',
  styleUrl: './ad-company-show.component.scss',
})
export class AdCompanyShowComponent {
  // tableConfig: InfoTable;
  // type: 'table' | 'list' | string = 'table';
  // columns = [
  //   {
  //     field: 'companyName',
  //     header: 'الاسم',
  //     HeaderType: 'string',
  //   },
  //   {
  //     field: 'email',
  //     header: 'الايميل',
  //     HeaderType: 'string',
  //   },
  //   {
  //     field: 'phoneNumber',
  //     header: 'رقم الهاتف',
  //     HeaderType: 'string',
  //   },
  //   {
  //     field: 'address',
  //     header: 'العنوان',
  //     HeaderType: 'string',
  //   },
  //   {
  //     field: 'commercialRegistrationNumber',
  //     header: 'السجل التجاري',
  //     HeaderType: 'string',
  //   },
  //   {
  //     field: 'isActive',
  //     header: 'فعال',
  //     HeaderType: 'tag',
  //   },
  // ];
  // addFunc: () => void = () => {
  //   this.router.navigate(['owner/company/add']);
  // };
  // editFunc: (rowData: any) => void = (rowData: any) => {
  //   this.router.navigate(['owner/company/detail/edit/' + rowData.userId]);
  // };
  // displayFunc: (rowData: any) => void = (rowData: any) => {
  //   this.router.navigate(['owner/company/detail/display/' + rowData.userId]);
  // };
  // constructor(
  //   private tableSrv: DyTableService,
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private companyStrategy: CompanyStrategy
  // ) {
  //   this.tableConfig = tableSrv.getStandardInfo(() => {}, this.editFunc, this.displayFunc, this.addFunc);
  // }
  // ngOnInit() {
  //   this.route.params.subscribe((param) => {
  //     this.type = param['type'];
  //     this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
  //       switchMap((body: any) => {
  //         if (body) {
  //           return this.companyStrategy.getAll(body).pipe(
  //             switchMap((res) =>
  //               of({
  //                 data: res.data,
  //                 columns: this.columns,
  //                 loading: false,
  //                 count: res.data.length,
  //               })
  //             ),
  //             catchError(() => of({ loading: false, data: [], columns: [] }))
  //           );
  //         }
  //         return of({ loading: false, data: [], columns: [] });
  //       })
  //     );
  //     this.tableConfig.getSub$.next({});
  //   });
  // }
}
