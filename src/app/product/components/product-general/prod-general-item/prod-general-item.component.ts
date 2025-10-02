import { Component, model } from '@angular/core';
import { FormArray, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ShoppingCartAddItem } from '../../../../client/interfaces/shopping-cart-add-item';
import { ShoppingManagementService } from '../../../../client/services/shopping.service';
import { DynamicInputComponent } from '../../../../shared/components/dynamic-input/dynamic-input.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { StateService } from '../../../../shared/service/state.service';
import { OptionItem } from '../../../interfaces/option-item';
import { ProductManagementItem } from '../../../interfaces/product-management-item';
import { VariantItem } from '../../../interfaces/variant-item';
import { ProductStoreService } from '../../../services/product-store.service';

@Component({
  selector: 'app-prod-general-item',
  imports: [ReactiveFormsModule, DynamicInputComponent, FormsModule, PrimeNgSharedModule],
  templateUrl: './prod-general-item.component.html',
  styleUrl: './prod-general-item.component.scss',
})
export class ProdGeneralItemComponent {
  images = model<any[]>([]);
  obj: InputDynamic = {
    key: 'option',
    value: null,
    label: 'اللون',
    dataType: 'list',
    required: true,
    visible: true,
    options: [],
  };
  optionsArrayControl: FormArray<any> = new FormArray<any>([]);
  countObj: InputDynamic = {
    key: 'count',
    value: 1,
    label: 'الكمية',
    dataType: 'int',
    required: true,
    visible: true,
    options: [],
  };
  countControl: FormControl = new FormControl(1);
  responsiveOptions: any[] = [
    {
      breakpoint: '1200px',
      numVisible: 4,
    },
    {
      breakpoint: '992px',
      numVisible: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
  ];
  options: OptionItem[] = [];
  variants: VariantItem[] = [];
  price: number = 0;
  activeIndex: number = 0;
  productId: number = 0;
  variantSKU: string = '';
  product: ProductManagementItem | null = null;
  constructor(
    private productStore: ProductStoreService,
    private shoppingManagement: ShoppingManagementService,
    private msgSrv: MessageToastService,
    private stateSrv: StateService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((param) => {
          this.productId = param['id'];
          return this.productStore.getOne(this.productId);
        }),
      )
      .subscribe((res) => {
        this.images.set(res.data.productImages ?? []);
        this.product = res.data;
        this.options = res.data.options;
        this.variants = res.data.variants;
        this.createOptionArrayControl();
        console.log(this.optionsArrayControl);
        this.getPrice();
      });
  }

  getControl(index: number) {
    return this.optionsArrayControl.controls[index] as FormControl;
  }
  getPrice() {
    const optionsValues = this.optionsArrayControl.getRawValue();
    const variant = this.variants.find((x) =>
      x.optionAssignments.map((assign) => assign.optionValueName).every((assign) => optionsValues.includes(assign)),
    );
    if (variant) {
      this.price = variant.price;
      this.variantSKU = variant.sku;
      const images = this.images().map((x: string) => {
        const imgSplitter = x.split('/');
        return imgSplitter[imgSplitter.length - 1];
      });
      const Index = images.findIndex((x) => x === (variant.variantImages ? variant.variantImages[0] : ''));
      this.activeIndex = Index > -1 ? Index : 0;
    }
  }
  createOptionArrayControl() {
    this.options.forEach((opt) => {
      this.optionsArrayControl.controls.push(new FormControl(opt.values[0].valueName));
    });
  }
  addToCart() {
    const body: ShoppingCartAddItem = {
      sku: this.variantSKU,
      quantity: this.countControl.value,
      userId: +(this.product?.companyId ?? 0),
    };
    this.shoppingManagement.add(body).subscribe((res) => {
      this.msgSrv.showMessage(res.message, res.succeeded);
      if (res.succeeded) {
        this.stateSrv.collapseCart();
      }
    });
  }
}
