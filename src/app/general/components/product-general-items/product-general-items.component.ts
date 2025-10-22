import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-general-items',
  imports: [],
  templateUrl: './product-general-items.component.html',
  styleUrl: './product-general-items.component.scss',
})
export class ProductGeneralItemsComponent {
  @Input() source: {
    variantName: string;
    reason?: string;
    quantity: number;
    originalPrice: number;
    totalFinalPrice: number;
    finalPrice: number;
  }[] = [];
}
