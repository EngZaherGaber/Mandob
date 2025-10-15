import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { ProdManagementTableItem } from '../../../interfaces/product-management-table-item';

@Component({
  selector: 'prod-general-card',
  imports: [PrimeNgSharedModule, RouterModule],
  templateUrl: './prod-general-card.component.html',
  styleUrl: './prod-general-card.component.scss',
})
export class ProdGeneralCardComponent {
  product = input.required<ProdManagementTableItem>();
  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'productIcon.svg'; // 👈 your fallback image
  }
  getRating() {
    if (this.product) return this.product()?.ratingCount.toString();
    else return '0';
  }
}
