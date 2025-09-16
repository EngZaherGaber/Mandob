import { Component, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, of, switchMap } from 'rxjs';
import { DynamicInputComponent } from '../../../shared/components/dynamic-input/dynamic-input.component';
import { InfoTable } from '../../../shared/interface/info-table';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../shared/modules/shared/primeng-shared.module';
import { DyTableService } from '../../../shared/service/dy-table.service';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'product-details',
  imports: [ReactiveFormsModule, DynamicInputComponent, FormsModule, PrimeNgSharedModule, ProductListComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  tableConfig: InfoTable;
  images = model<any[]>([]);
  obj: InputDynamic = {
    key: 'option',
    value: null,
    label: 'اللون',
    dataType: 'list',
    required: true,
    visible: true,
    options: [
      { id: 1, name: 'احمر', color: 'red' },
      { id: 2, name: 'اصفر', color: 'yellow' },
      { id: 3, name: 'اخضر', color: 'green' },
    ],
  };
  control: FormControl = new FormControl(null);
  countObj: InputDynamic = {
    key: 'count',
    value: 1,
    label: 'الكمية',
    dataType: 'int',
    required: true,
    visible: true,
    options: [],
  };
  countControl: FormControl = new FormControl(1);
  responsiveOptions: any[] = [
    {
      breakpoint: '1200px',
      numVisible: 4,
    },
    {
      breakpoint: '992px',
      numVisible: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
  ];
  constructor(private tableSrv: DyTableService) {
    this.tableConfig = tableSrv.getStandardInfo(undefined, undefined, undefined, undefined);
    this.images.set([
      {
        itemImageSrc:
          'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        itemImageSrc:
          'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      },
      {
        itemImageSrc: 'boxes.svg',
      },
      {
        itemImageSrc: 'boxes.svg',
      },
      {
        itemImageSrc: 'boxes.svg',
      },
      {
        itemImageSrc: 'boxes.svg',
      },
      {
        itemImageSrc: 'boxes.svg',
      },
      {
        itemImageSrc: 'boxes.svg',
      },
    ]);
  }
  ngOnInit() {
    this.tableConfig.get$ = this.tableConfig.getSub$.pipe(
      switchMap((body: any) => {
        if (body) {
          return of(body).pipe(
            switchMap((res) =>
              of({
                data: res.data,
                columns: res.columns,
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
  }
}
