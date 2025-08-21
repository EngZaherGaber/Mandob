import { Component } from '@angular/core';
import { switchMap, of, catchError } from 'rxjs';
import { InfoTable } from '../../../shared/interface/info-table';
import { DyTableService } from '../../../shared/service/dy-table.service';
import { ActivatedRoute } from '@angular/router';
import { DynamicCardListComponent } from '../../../shared/components/dynamic-card-list/dynamic-card-list.component';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { UserStateService } from '../../../general/services/user-state.service';
import { AdminStrategy } from '../../classes/admin-strategy';

@Component({
  selector: 'ad-owner-show',
  imports: [DynamicTableComponent, DynamicCardListComponent, CommonModule],
  templateUrl: './ad-owner-show.component.html',
  styleUrl: './ad-owner-show.component.scss',
})
export class AdOwnerShowComponent {
  tableConfig: InfoTable;
  type: 'table' | 'list' | string = '';
  columns = [
    {
      field: 'name',
      header: 'الاسم',
      HeaderType: 'string',
    },
    {
      field: 'userName',
      header: 'اسم المستخدم',
      HeaderType: 'string',
    },
    {
      field: 'email',
      header: 'الايميل',
      HeaderType: 'string',
    },
    {
      field: 'phoneNumber',
      header: 'رقم الهاتف',
      HeaderType: 'string',
    },
    {
      field: 'isActive',
      header: 'فعال',
      HeaderType: 'tag',
    },
  ];
  constructor(private tableSrv: DyTableService, private route: ActivatedRoute, private adminStrategy: AdminStrategy) {
    this.tableConfig = tableSrv.getStandardInfo(
      () => {},
      () => {},
      () => {},
      () => {}
    );
    this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
      switchMap((body: any) => {
        if (body) {
          return this.adminStrategy.getAll(body).pipe(
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
    this.type = this.route.snapshot.params['type'];
  }

  ngOnInit() {}
}
