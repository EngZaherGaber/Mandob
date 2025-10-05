import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CollectionManagementService } from '../../../../company/services/collection-management.service';
import { UserStateService } from '../../../../general/services/user-state.service';
import { CategoryManagementService } from '../../../../owner/services/category-management.service';
import { DynamicInputComponent } from '../../../../shared/components/dynamic-input/dynamic-input.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { FileService } from '../../../../shared/service/file.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { OptionItem } from '../../../interfaces/option-item';
import { ProductManagementAdd } from '../../../interfaces/product-management-add';
import { ProductManagementItem } from '../../../interfaces/product-management-item';
import { VariantItem } from '../../../interfaces/variant-item';
import { ProductManagementService } from '../../../services/product-management.service';

@Component({
  selector: 'prod-management-detail',
  imports: [PrimeNgSharedModule, DynamicInputComponent, FormsModule],
  templateUrl: './prod-management-detail.component.html',
  styleUrl: './prod-management-detail.component.scss',
})
export class ProdManagementDetailComponent {
  @ViewChild('fu') fu!: FileUpload;
  form: FormGroup = new FormGroup({
    productName: new FormControl(null, Validators.required),
    productDescription: new FormControl(null, Validators.required),
    CollectionIDs: new FormControl(null, Validators.required),
    CategorieIDs: new FormControl(null, Validators.required),
  });
  objs: InputDynamic[] = [];
  options: OptionItem[] = [];
  variants: VariantItem[] = [];
  uploadedFiles: File[] = [];
  showForm: boolean = false;
  productId: number = 0;
  isShow: boolean = false;
  constructor(
    private productManagement: ProductManagementService,
    private msgSrv: MessageToastService,
    private fileSrv: FileService,
    public router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    categoryManagement: CategoryManagementService,
    userState: UserStateService,
    collectionManagement: CollectionManagementService,
  ) {
    let result: ProductManagementItem | null = null;
    this.route.params
      .pipe(
        switchMap((param) => {
          this.productId = param['id'];
          this.isShow = param['type'] === 'display';
          const user = userState.user();
          if (user && user.userId) {
            return forkJoin({
              collection: collectionManagement.getAll({ first: 0, rows: 1000 }, user.userId),
              categories: categoryManagement.getAll({ first: 0, rows: 1000 }),
              product: productManagement.getOne(this.productId),
            });
          } else {
            return of(null);
          }
        }),
        switchMap((res) => {
          if (res) {
            this.objs = [
              {
                key: 'ProductName',
                value: res.product.data.productName,
                label: 'الاسم',
                dataType: 'string',
                required: true,
                visible: true,
                options: [],
              },
              {
                key: 'ProductDescription',
                value: res.product.data.productDescription,
                label: 'الوصف',
                dataType: 'editor',
                required: true,
                visible: true,
                options: [],
              },
              {
                key: 'CollectionIDs',
                value: res.product.data.collectionIDs.map((x) => x.toString()),
                label: 'المجموعات',
                dataType: 'MultiSelect',
                required: true,
                visible: true,
                options: res.collection.data.map((x: any) => ({ id: x.id.toString(), name: x.name })),
              },
              {
                key: 'CategorieIDs',
                value: res.product.data.categorieIDs.map((x) => x.toString()),
                label: 'التصنيف',
                dataType: 'MultiSelect',
                required: true,
                visible: true,
                options: res.categories.data.map((x: any) => ({ id: x.id.toString(), name: x.name })),
              },
            ];
            this.form.setValue({
              productName: res.product.data.productName,
              productDescription: res.product.data.productDescription,
              CollectionIDs: res.product.data.collectionIDs.map((x) => x.toString()),
              CategorieIDs: res.product.data.categorieIDs.map((x) => x.toString()),
            });
            result = res.product.data;
            return this.fileSrv.getImages(res.product.data.productImages ?? []);
          } else {
            return of(null);
          }
        }),
        switchMap((res) => {
          if (res && typeof res !== 'boolean') {
            this.uploadedFiles = res; // assign to <p-fileupload> if needed
            this.options = result?.options ?? [];
            // const filesNames = result?.productImages?.map((x: string) => {
            //   const sections = x.split('/');
            //   return sections[sections.length - 1];
            // });
            // result?.variants.forEach((variant) => {
            //   variant.variantImages = variant.variantImages?.filter((img) => filesNames?.includes(img));
            // });
            return of(true);
          }
          return of(false);
        }),
      )
      .subscribe((res) => {
        this.variants = result?.variants ?? [];
        this.options = result?.options ?? [];
        this.showForm = true;
      });
  }
  getControl(name: string) {
    return this.form.get(name) as FormControl;
  }
  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'productIcon.svg'; // 👈 your fallback image
  }
  onSelect(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
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
    return (
      this.form.invalid || this.options.length === 0 || this.options.filter((opt) => opt.values.length === 0).length > 0
    );
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
      this.productManagement.edit(this.productId, product, this.uploadedFiles).subscribe((res) => {
        this.msgSrv.showMessage(res.message, res.succeeded);
        if (res.succeeded) this.router.navigate(['company/product-management/show']);
      });
    } else {
      this.msgSrv.showError('يجب ان ينتمي لكل تشكيل صور خاصة به من ضمن صور المنتج');
    }
  }
}
