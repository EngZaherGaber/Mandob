import { Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TableLazyLoadEvent } from 'primeng/table';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { DynamicInputComponent } from '../../../../shared/components/dynamic-input/dynamic-input.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { ProductListFilter } from '../../../interfaces/product-list-filter';
import { ProductStoreResult } from '../../../interfaces/product-store-result';
import { ProductStoreService } from '../../../services/product-store.service';
import { ProdGeneralCardComponent } from '../prod-general-card/prod-general-card.component';

@Component({
  selector: 'app-prod-general-group',
  imports: [PrimeNgSharedModule, ProdGeneralCardComponent, DynamicInputComponent, FormsModule],
  templateUrl: './prod-general-group.component.html',
  styleUrl: './prod-general-group.component.scss',
})
export class ProdGeneralGroupComponent {
  @ViewChild('dv') dv: any | undefined;
  header: string = '';
  rows: number = 12;
  type: string = '';
  id: number = 0;
  body: ProductListFilter = { pageNumber: 0, pageSize: 4 };
  result: ProductStoreResult | null = null;
  objs: InputDynamic[] = [];
  controlsArr: FormArray<any> = new FormArray<any>([]);
  loadData$: Subject<any> = new Subject();
  priceRange$: Subject<number[]> = new Subject();
  priceRange: number[] = [];

  constructor(private route: ActivatedRoute, private productStoreSrv: ProductStoreService) {
    this.loadData$
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        switchMap((event) => {
          this.body.pageSize = event.rows ?? 4;
          const number = (event.first ?? 0) / this.body.pageSize;
          this.body.pageNumber = number + 1;
          return this.productStoreSrv.getAll(this.body);
        })
      )
      .subscribe((res) => {
        this.result = res.data;
        this.priceRange = [this.result.minPrice, this.result.maxPrice];
        this.objs = Object.keys(this.result.optionList).map((key) => {
          return {
            key: key,
            label: key,
            value: null,
            required: false,
            visible: true,
            dataType: 'MultiSelect',
            options: this.result?.optionList ? this.result.optionList[key].map((x) => ({ id: x, name: x })) : [],
          };
        });
        const arr = Object.keys(this.result.optionList).map((key) => {
          const control = new FormControl(null);
          control.valueChanges.subscribe((res) => this.changeFilter(key, res ?? []));
          return control;
        });
        this.controlsArr.controls.push(...arr);
      });
  }
  ngOnInit() {
    this.route.params.subscribe((param) => {
      console.log(param);
      this.type = param['type'];
      this.id = param['id'];
      this.header = param['header'];
      switch (this.type) {
        case 'category':
          this.body.categoryId = +this.id;
          break;
        case 'collection':
          this.body.collectionId = +this.id;
          break;
        case 'search':
          this.body.globalFilter = this.header;
          break;
        default:
          break;
      }
    });
  }
  load(event: TableLazyLoadEvent) {
    this.loadData$.next({ ...event, ...this.body });
  }
  getControl(index: number) {
    return this.controlsArr.controls[index] as FormControl;
  }
  changeFilter(key: string, value: string[]) {
    const newBody = {
      rows: this.body.pageSize ?? 4,
      first: (this.body.pageSize ?? 0) * (this.body.pageNumber ? this.body.pageNumber - 1 : 0),
    };
    this.body.changeOption = false;
    this.body.optionFilters = { ...this.body.optionFilters, [key]: value };
    this.loadData$.next({ ...newBody, ...this.body });
  }
  priceRangeChange() {
    const newBody = {
      rows: this.body.pageSize ?? 4,
      first: (this.body.pageSize ?? 0) * (this.body.pageNumber ? this.body.pageNumber - 1 : 0),
    };
    this.body.minPrice = this.priceRange[0];
    this.body.maxPrice = this.priceRange[1];
    this.loadData$.next({ ...newBody, ...this.body });
  }
}
