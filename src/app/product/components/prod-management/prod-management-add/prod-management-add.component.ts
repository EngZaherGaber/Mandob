import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CollectionManagementService } from '../../../../company/services/collection-management.service';
import { CompanyManagementService } from '../../../../company/services/company-management.service';
import { UserStateService } from '../../../../general/services/user-state.service';
import { CategoryManagementService } from '../../../../owner/services/category-management.service';
import { DynamicInputComponent } from '../../../../shared/components/dynamic-input/dynamic-input.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { OptionItem } from '../../../interfaces/option-item';
import { ProductManagementAdd } from '../../../interfaces/product-management-add';
import { VariantItem } from '../../../interfaces/variant-item';
import { ProductManagementService } from '../../../services/product-management.service';

@Component({
  selector: 'prod-management-add',
  imports: [PrimeNgSharedModule, DynamicInputComponent, FormsModule],
  templateUrl: './prod-management-add.component.html',
  styleUrl: './prod-management-add.component.scss',
})
export class ProdManagementAddComponent {
  form: FormGroup = new FormGroup({
    productName: new FormControl(null, Validators.required),
    productDescription: new FormControl(null, Validators.required),
    CollectionIDs: new FormControl(null, Validators.required),
    CategorieIDs: new FormControl(null, Validators.required),
  });
  objs: InputDynamic[] = [];
  currencyID: number = 0;
  options: OptionItem[] = [];
  variants: VariantItem[] = [];
  uploadedFiles: File[] = [];
  showForm: boolean = false;
  constructor(
    private productManagement: ProductManagementService,
    private msgSrv: MessageToastService,
    public router: Router,
    categoryManagement: CategoryManagementService,
    userState: UserStateService,
    collectionManagement: CollectionManagementService,
    companyManagement: CompanyManagementService,
  ) {
    const user = userState.user();
    const strategy = userState.strategy();

    if (user && user.userId && strategy) {
      forkJoin({
        company: strategy.getById(),
        collection: collectionManagement.getAll({ first: 0, rows: 1000 }, user.userId),
        categories: categoryManagement.getAll({ first: 0, rows: 1000 }),
      }).subscribe((res) => {
        if ('currencyId' in res.company.data) {
          this.currencyID = res.company.data.currencyId as number;
        }
        this.objs = [
          {
            key: 'name',
            value: null,
            label: 'الاسم',
            dataType: 'string',
            required: true,
            visible: true,
            options: [],
          },
          {
            key: 'productDescription',
            value: null,
            label: 'الوصف',
            dataType: 'editor',
            required: true,
            visible: true,
            options: [],
          },
          {
            key: 'CollectionIDs',
            value: null,
            label: 'المجموعات',
            dataType: 'MultiSelect',
            required: true,
            visible: true,
            options: res.collection.data,
          },
          {
            key: 'CategorieIDs',
            value: null,
            label: 'التصنيف',
            dataType: 'MultiSelect',
            required: true,
            visible: true,
            options: res.categories.data,
          },
        ];
        this.showForm = true;
      });
    }
  }
  getControl(name: string) {
    return this.form.get(name) as FormControl;
  }

  onSelect(event: any) {
    for (let file of event.files) {
      if (!this.uploadedFiles.find((x) => x.name === (file as File).name)) {
        this.uploadedFiles.push(file);
      }
    }
  }
  onRemove(event: any) {
    const index = this.uploadedFiles.findIndex((x) => x.name === event.file.name);
    if (index > -1) {
      this.uploadedFiles.splice(index, 1);
    }
  }
  addOptionName(input: any) {
    this.options.push({ optionName: input.value, values: [] });
    input.value = null;
  }
  addOptionValue(input: any, optionIndex: number) {
    this.options[optionIndex].values.push({ valueName: input.value });
    input.value = null;
  }
  removeOptionValue(optionIndex: number, valueIndex: number) {
    this.options[optionIndex].values.splice(valueIndex, 1);
  }
  removeOption(optionIndex: number) {
    this.options.splice(optionIndex, 1);
  }
  generateVariants(): VariantItem[] {
    const options = this.options;

    // Step 1: prepare array of arrays of values
    const valuesArray = options.map((opt) =>
      opt.values.map((v) => ({
        optionName: opt.optionName,
        optionValueName: v.valueName,
      })),
    );

    // Step 2: Cartesian product
    const cartesian = (arr: any[][]): any[][] => arr.reduce((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [[]]);

    const combinations = cartesian(valuesArray);

    // Step 3: map to VariantItem but keep old values if exist
    const newVariants: VariantItem[] = combinations.map((combo, index) => {
      const variantName = this.form.value.productName + ' ' + combo.map((c) => c.optionValueName).join(' ');

      // Try to find existing variant
      const existing = this.variants?.find(
        (v) =>
          v.optionAssignments.length === combo.length &&
          v.optionAssignments.every(
            (oa, i) => oa.optionName === combo[i].optionName && oa.optionValueName === combo[i].optionValueName,
          ),
      );

      if (existing) {
        // Keep its values
        return {
          ...existing,
          variantName, // update name if productName changed
        };
      }

      // Otherwise create new default variant
      return {
        variantName,
        sku: `SKU-${index + 1}`,
        quantity: 0,
        optionAssignments: combo,
        VariantImages: [],
        price: 0,
      };
    });
    return newVariants;
  }

  openVariantPanel(event: any) {
    if (event.index === '2') {
      this.variants = this.generateVariants();
    }
  }
  checkVariantPanel() {
    return this.form.invalid || this.options.filter((opt) => opt.values.length === 0).length > 0;
  }

  saveProduct() {
    const product: ProductManagementAdd = {
      productName: this.form.value.productName,
      productDescription: this.form.value.productDescription,
      collectionIDs: this.form.value.CollectionIDs,
      categorieIDs: this.form.value.CategorieIDs,
      options: this.options,
      variants: this.variants,
    };
    const variantImage = product.variants.flatMap((x) => x.variantImages);
    const everyVariantHaveImage = variantImage.length > 0 && variantImage.every((x) => (x ? x.length > 0 : false));

    if (everyVariantHaveImage) {
      this.productManagement.add(product, this.uploadedFiles).subscribe((res) => {
        this.msgSrv.showMessage(res.message, res.succeeded);
        if (res.succeeded) this.router.navigate(['company/product-management/show']);
      });
    } else {
      this.msgSrv.showError('يجب ان ينتمي لكل تشكيل صور خاصة به من ضمن صور المنتج');
    }
  }
}
