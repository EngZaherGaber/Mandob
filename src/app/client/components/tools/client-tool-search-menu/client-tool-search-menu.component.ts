import { Component, EventEmitter, input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { GlobalSearchResponse } from '../../../interfaces/global-search-response';

@Component({
  selector: 'client-tool-search-menu',
  imports: [PrimeNgSharedModule, RouterModule],
  templateUrl: './client-tool-search-menu.component.html',
  styleUrl: './client-tool-search-menu.component.scss',
})
export class ClientToolSearchMenuComponent {
  result = input<GlobalSearchResponse | null>();
  header = input<string>();
  @Output() onCloseMenu: EventEmitter<any> = new EventEmitter<any>();
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
  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'boxes.svg'; // 👈 your fallback image
  }
  onCloseMenuFunc() {
    this.onCloseMenu.emit(true);
  }
}
