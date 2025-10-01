import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, concatMap, from, map, of, switchMap } from 'rxjs';
import { ProdGeneralListComponent } from '../../../../product/components/product-general/prod-general-list/prod-general-list.component';
import { ProdManagementTableItem } from '../../../../product/interfaces/product-management-table-item';
import { ProductStoreService } from '../../../../product/services/product-store.service';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { Collection } from '../../../interfaces/collection';
import { Company } from '../../../interfaces/company';
import { CollectionManagementService } from '../../../services/collection-management.service';
import { CompanyStoreService } from '../../../services/company-store.service';

@Component({
  selector: 'app-comp-general-profile',
  imports: [PrimeNgSharedModule, FormsModule, ProdGeneralListComponent],
  templateUrl: './comp-general-profile.component.html',
  styleUrl: './comp-general-profile.component.scss',
})
export class CompGeneralProfileComponent {
  tabindex: number = 0;
  companyId: number | null = null;
  company: Company | null = null;
  collectionsData: { collection: Collection; products: ProdManagementTableItem[] }[] = [];
  images: { itemImageSrc: string; alt: string; title: string; thumbnailImageSrc: string }[] = [];
  constructor(
    private companyStore: CompanyStoreService,
    private productStore: ProductStoreService,
    private route: ActivatedRoute,
    private collectionManagement: CollectionManagementService,
  ) {
    this.route.params
      .pipe(
        switchMap((param) => {
          this.companyId = +param['id'];
          return companyStore.getOne(this.companyId);
        }),
        switchMap((res) => {
          if (res.succeeded && this.companyId) {
            this.company = res.data;
            this.images = this.company.images.map((x) => ({
              itemImageSrc: x.imageUrl ?? '',
              alt: this.company?.companyName ?? '',
              title: this.company?.companyName ?? '',
              thumbnailImageSrc: x.imageUrl ?? '',
            }));
            return collectionManagement.getAll({ rows: 100, first: 0 }, this.companyId);
          }
          return of(null);
        }),
        switchMap((res) => {
          if (res?.succeeded) {
            return from(res.data).pipe(
              concatMap((collection) =>
                this.productStore.getAll({ collectionId: collection.id, pageNumber: 1, pageSize: 8 }).pipe(
                  map((productRes) => ({ collection, products: productRes.data.products })),
                  catchError(() => of({ collection, products: [] })),
                ),
              ),
            );
          }
          return of(null);
        }),
      )
      .subscribe((res) => {
        if (res) {
          this.collectionsData.push(res);
          this.tabindex = this.collectionsData[0].collection.id;
          console.log(this.tabindex);
        }
      });
  }
}
