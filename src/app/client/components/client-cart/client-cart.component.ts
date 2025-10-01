import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNgSharedModule } from '../../../shared/modules/shared/primeng-shared.module';
import { StateService } from '../../../shared/service/state.service';
import { ShoppingCart } from '../../interfaces/shopping-cart';
import { ShoppingManagementService } from '../../services/shopping.service';

@Component({
  selector: 'client-cart',
  imports: [PrimeNgSharedModule, RouterModule],
  templateUrl: './client-cart.component.html',
  styleUrl: './client-cart.component.scss',
})
export class ClientCartComponent {
  result: ShoppingCart | null = null;
  constructor(
    public stateSrv: StateService,
    private shoppingManagement: ShoppingManagementService,
  ) {
    this.shoppingManagement.getOne().subscribe((res) => {
      if (res.succeeded) {
        this.result = res.data;
      }
    });
  }
  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'boxes.svg'; // 👈 your fallback image
  }
}
