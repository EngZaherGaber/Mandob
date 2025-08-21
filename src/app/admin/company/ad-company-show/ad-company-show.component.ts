import { Component } from '@angular/core';
import { switchMap, of, catchError } from 'rxjs';
import { InfoTable } from '../../../shared/interface/info-table';
import { DyTableService } from '../../../shared/service/dy-table.service';
import { ActivatedRoute } from '@angular/router';
import { DynamicCardListComponent } from '../../../shared/components/dynamic-card-list/dynamic-card-list.component';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { UserStateService } from '../../../general/services/user-state.service';
import { CompanyStrategy } from '../../../company/classes/company-strategy';

@Component({
  selector: 'app-ad-company-show',
  imports: [DynamicTableComponent, DynamicCardListComponent, CommonModule],
  templateUrl: './ad-company-show.component.html',
  styleUrl: './ad-company-show.component.scss',
})
export class AdCompanyShowComponent {
  tableConfig: InfoTable;
  type: 'table' | 'list' | string = 'table';
  columns = [
    {
      field: 'name',
      header: 'الاسم',
      HeaderType: 'string',
    },
    {
      field: 'subscribeDate',
      header: 'تاريخ الاشتراك',
      HeaderType: 'DateTime',
    },
    {
      field: 'subscribeDate1',
      header: 'تاريخ الانتهاء',
      HeaderType: 'DateTime',
    },
    {
      field: 'region',
      header: 'المنطقة',
      HeaderType: 'string',
    },
    {
      field: 'count',
      header: 'عدد الطلبات',
      HeaderType: 'int',
    },
    {
      field: 'status',
      header: 'الحالة',
      HeaderType: 'tag',
    },
  ];
  constructor(
    private tableSrv: DyTableService,
    private route: ActivatedRoute,
    private companyStrategy: CompanyStrategy
  ) {
    this.tableConfig = tableSrv.getStandardInfo(
      () => {},
      () => {},
      () => {},
      () => {}
    );
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.type = param['type'];
      this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
        switchMap((body: any) => {
          if (body) {
            return this.companyStrategy.getAll(body).pipe(
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
    });
  }
}
