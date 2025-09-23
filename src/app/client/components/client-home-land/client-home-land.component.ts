import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { catchError, concatMap, from, map, of, switchMap, timer } from 'rxjs';
import { CompGeneralListComponent } from '../../../company/components/comp-general/comp-general-list/comp-general-list.component';
import { Company } from '../../../company/interfaces/company';
import { CompanyStoreService } from '../../../company/services/company-store.service';
import { Category } from '../../../owner/interfaces/category';
import { CategoryManagementService } from '../../../owner/services/category-management.service';
import { ProdGeneralListComponent } from '../../../product/components/product-general/prod-general-list/prod-general-list.component';
import { ProdManagementTableItem } from '../../../product/interfaces/product-management-table-item';
import { ProductStoreService } from '../../../product/services/product-store.service';

@Component({
  selector: 'client-home-land',
  imports: [ProdGeneralListComponent, CompGeneralListComponent, CommonModule],
  templateUrl: './client-home-land.component.html',
  styleUrl: './client-home-land.component.scss',
})
export class ClientHomeLandComponent {
  categories: Category[] = [];
  companies: Company[] = [];
  listToShow: { category: Category; products: ProdManagementTableItem[] }[] = [];
  constructor(
    private categoryManagement: CategoryManagementService,
    private companyStore: CompanyStoreService,
    private productStore: ProductStoreService
  ) {}
  ngOnInit() {
    const productObs$ = this.categoryManagement
      .getAll({ first: 0, rows: 100, multiSortMeta: [{ field: 'categoryName', order: 1 }] })
      .pipe(
        switchMap((res) => {
          if (res.succeeded) {
            this.categories = res.data;
          }
          return from(this.categories).pipe(
            concatMap((category) =>
              timer(0).pipe(
                // wait 3 seconds before request
                switchMap(() =>
                  this.productStore.getAll({ categoryId: category.categoryID, pageNumber: 0, pageSize: 5 }).pipe(
                    map((productRes) => ({ category, products: productRes.data.products })),
                    catchError(() => of({ category, products: [] }))
                  )
                )
              )
            )
          );
        })
      );
    this.companyStore
      .getAll({ first: 0, rows: 10, multiSortMeta: [{ field: 'name', order: 1 }] })
      .pipe(
        switchMap((res) => {
          if (res.succeeded) {
            this.companies = res.data;
          }
          return productObs$;
        }),
        catchError((err) => productObs$)
      )
      .subscribe((res) => {
        if (res.products.length > 0) this.listToShow.push(res);
      });
  }
}
