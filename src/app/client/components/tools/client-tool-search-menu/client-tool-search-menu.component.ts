import { Component, input } from '@angular/core';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { GlobalSearchResponse } from '../../../interfaces/global-search-response';

@Component({
  selector: 'client-tool-search-menu',
  imports: [PrimeNgSharedModule],
  templateUrl: './client-tool-search-menu.component.html',
  styleUrl: './client-tool-search-menu.component.scss',
})
export class ClientToolSearchMenuComponent {
  result = input<GlobalSearchResponse | null>();
  header = input<string>();
  getProducts() {
    return this.result()?.products ?? [];
  }
  getCategories() {
    return this.result()?.categories ?? [];
  }
  getCollections() {
    return this.result()?.collections ?? [];
  }
  getCompanies() {
    return this.result()?.companies ?? [];
  }
}
