import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { PrimeNgSharedModule } from '../../../shared/modules/shared/primeng-shared.module';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { StateService } from '../../../shared/service/state.service';
import { ShoppingCart } from '../../interfaces/shopping-cart';
import { ClientRequestService } from '../../services/client-request.service';
import { ShoppingManagementService } from '../../services/shopping.service';

@Component({
  selector: 'client-cart',
  imports: [PrimeNgSharedModule, RouterModule, FormsModule],
  templateUrl: './client-cart.component.html',
  styleUrl: './client-cart.component.scss',
})
export class ClientCartComponent {
  result: ShoppingCart | null = null;
  get$: Subject<any> = new Subject();
  getSub$: Observable<any> = new Observable();
  itemUpdates = computed(() => {
    return this.result?.items.map((item) => ({ cartItemId: item.cartItemId, newQuantity: item.quantity }));
  });
  isUpdate: boolean = false;
  constructor(
    public stateSrv: StateService,
    public msgSrv: MessageToastService,
    private shoppingManagement: ShoppingManagementService,
    private clientRequestSrv: ClientRequestService,
  ) {
    this.getSub$ = this.get$.pipe(
      switchMap((res) => {
        return this.shoppingManagement.getOne().pipe(
          switchMap((res) => {
            if (res.succeeded) {
              this.result = res.data;
            }
            return of(null);
          }),
        );
      }),
    );
    this.getSub$.subscribe((res) => {});
    this.get$.next(true);
  }
  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'boxes.svg'; // 👈 your fallback image
  }

  makeItRequest() {
    if (this.result) {
      this.clientRequestSrv.createFromCart(this.result).subscribe((res) => {
        this.msgSrv.showMessage(res.message, res.succeeded);
        this.get$.next(true);
      });
    }
  }

  clear() {
    if (this.result?.cartId) {
      this.shoppingManagement.clear(this.result?.cartId).subscribe((res) => {
        this.msgSrv.showMessage(res.message, res.succeeded);
        this.get$.next(true);
      });
    }
  }
  update() {
    const itemUpdates = this.itemUpdates();
    if (itemUpdates) {
      this.shoppingManagement.update({ itemUpdates: itemUpdates }).subscribe((res) => {
        this.msgSrv.showMessage(res.message, res.succeeded);
        this.get$.next(true);
      });
    }
  }
}
