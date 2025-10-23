import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { ShoppingCartAddItem } from '../../../../client/interfaces/shopping-cart-add-item';
import { ShoppingManagementService } from '../../../../client/services/shopping.service';
import { UserStateService } from '../../../../general/services/user-state.service';
import { DynamicInputComponent } from '../../../../shared/components/dynamic-input/dynamic-input.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { StateService } from '../../../../shared/service/state.service';
import { ProdManagementTableItem } from '../../../interfaces/product-management-table-item';
import { ProductStoreService } from '../../../services/product-store.service';

@Component({
  selector: 'prod-general-card',
  imports: [PrimeNgSharedModule, RouterModule, DynamicInputComponent],
  templateUrl: './prod-general-card.component.html',
  styleUrl: './prod-general-card.component.scss',
})
export class ProdGeneralCardComponent {
  product = input.required<ProdManagementTableItem>();
  get$ = new Observable();
  getSub$ = new Subject();
  buyDialog: boolean = false;
  objs: InputDynamic[] = [];
  form: FormGroup = new FormGroup({
    quanitiy: new FormControl(0),
    variantSKU: new FormControl(null),
  });
  constructor(
    public router: Router,
    private msgSrv: MessageToastService,
    private shoppingManagement: ShoppingManagementService,
    private productStore: ProductStoreService,
    private userState: UserStateService,
    private stateSrv: StateService,
  ) {}
  ngOnInit() {
    this.get$ = this.getSub$.pipe(
      switchMap((res) => {
        this.buyDialog = res as boolean;
        if (this.buyDialog) {
          return this.productStore.getOne(this.product().productID);
        }
        return of(null);
      }),
    );
    this.get$.subscribe((res: any) => {
      if (res && res.succeeded) {
        this.objs = [
          {
            label: 'التشكيل المطلوب',
            key: 'variantSKU',
            value: null,
            required: true,
            visible: true,
            dataType: 'list',
            options: res.data.variants.map((x: any) => ({ id: x.sku, name: x.variantName })),
          },
          {
            label: 'الكمية',
            key: 'quanitiy',
            value: null,
            required: true,
            visible: true,
            dataType: 'int',
            options: [],
          },
        ];
      }
    });
  }
  getControl(key: string) {
    return this.form.controls[key] as FormControl;
  }
  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'productIcon.svg'; // 👈 your fallback image
  }
  getRating() {
    if (this.product) return this.product()?.ratingCount.toString();
    else return '0';
  }
  addToCart() {
    const body: ShoppingCartAddItem = {
      sku: this.getControl('variantSKU').value,
      quantity: +this.getControl('quanitiy').value,
      userId: +(this.userState.user()?.userId ?? 0),
    };
    this.shoppingManagement.add(body).subscribe((res) => {
      this.msgSrv.showMessage(res.message, res.succeeded);
      if (res.succeeded) {
        this.buyDialog = false;
        this.stateSrv.collapseCart();
      }
    });
  }
}
