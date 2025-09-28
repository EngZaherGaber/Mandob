import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OptionItem } from '../../../../product/interfaces/option-item';
import { VariantItem } from '../../../../product/interfaces/variant-item';
import { DynamicInputComponent } from '../../../../shared/components/dynamic-input/dynamic-input.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { OfferMetadataItem } from '../../../interfaces/offer-metadata-item';
import { OfferManagementService } from '../../../services/offer-management.service';

@Component({
  selector: 'app-offer-management-add',
  imports: [PrimeNgSharedModule, DynamicInputComponent, FormsModule],
  templateUrl: './offer-management-add.component.html',
  styleUrl: './offer-management-add.component.scss',
})
export class OfferManagementAddComponent {
  metadata: OfferMetadataItem[] = [];
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
  constructor(
    private offerManagement: OfferManagementService,
    private msgSrv: MessageToastService,
    public router: Router
  ) {
    this.offerManagement.getOfferMetadata().subscribe((res) => {
      // if (res.succeeded) {
      this.metadata = res.data;
      this.showForm = true;
      // }
    });
  }
  getControl(name: string) {
    return this.form.get(name) as FormControl;
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
      }))
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
            (oa, i) => oa.optionName === combo[i].optionName && oa.optionValueName === combo[i].optionValueName
          )
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
    console.log(this.uploadedFiles);
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
}
