import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, of, catchError } from 'rxjs';
import { InfoTable } from '../../../../shared/interface/info-table';
import { DyTableService } from '../../../../shared/service/dy-table.service';
import { CommonModule } from '@angular/common';
import { DynamicCardListComponent } from '../../../../shared/components/dynamic-card-list/dynamic-card-list.component';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-com-distributor-show',
  imports: [DynamicTableComponent, DynamicCardListComponent, CommonModule],
  templateUrl: './com-distributor-show.component.html',
  styleUrl: './com-distributor-show.component.scss',
})
export class ComDistributorShowComponent {
  tableConfig: InfoTable;
  type: 'table' | 'list' | string = 'table';
  constructor(private tableSrv: DyTableService, private route: ActivatedRoute) {
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
            return of(body).pipe(
              switchMap((res) =>
                of({
                  data: res.data,
                  columns: res.columns,
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
      this.tableConfig.getSub$.next({
        data: [
          {
            name: 'Tolido',
            subscribeDate: new Date(),
            subscribeDate1: new Date(),
            region: 'Damascus',
            count: 12,
            status: 'Active',
          },
          {
            name: 'Tolido1',
            subscribeDate: new Date(),
            subscribeDate1: new Date(),
            region: 'Damascus',
            count: 12,
            status: 'Active',
          },
          {
            name: 'Tolido2',
            subscribeDate: new Date(),
            subscribeDate1: new Date(),
            region: 'Damascus',
            count: 12,
            status: 'Active',
          },
          {
            name: 'Tolido3',
            subscribeDate: new Date(),
            subscribeDate1: new Date(),
            region: 'Damascus',
            count: 12,
            status: 'Active',
          },
          {
            name: 'Tolido3',
            subscribeDate: new Date(),
            subscribeDate1: new Date(),
            region: 'Damascus',
            count: 12,
            status: 'Active',
          },
          {
            name: 'Tolido3',
            subscribeDate: new Date(),
            subscribeDate1: new Date(),
            region: 'Damascus',
            count: 12,
            status: 'Active',
          },
          {
            name: 'Tolido3',
            subscribeDate: new Date(),
            subscribeDate1: new Date(),
            region: 'Damascus',
            count: 12,
            status: 'Active',
          },
          {
            name: 'Tolido3',
            subscribeDate: new Date(),
            subscribeDate1: new Date(),
            region: 'Damascus',
            count: 12,
            status: 'Active',
          },
          {
            name: 'Tolido3',
            subscribeDate: new Date(),
            subscribeDate1: new Date(),
            region: 'Damascus',
            count: 12,
            status: 'Active',
          },
          {
            name: 'Tolido3',
            subscribeDate: new Date(),
            subscribeDate1: new Date(),
            region: 'Damascus',
            count: 12,
            status: 'Active',
          },
          {
            name: 'Tolido3',
            subscribeDate: new Date(),
            subscribeDate1: new Date(),
            region: 'Damascus',
            count: 12,
            status: 'Active',
          },
        ],
        columns: [
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
        ],
      });
    });
  }
}
