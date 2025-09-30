import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OptionItem } from '../../../../product/interfaces/option-item';
import { VariantItem } from '../../../../product/interfaces/variant-item';
import { DynamicInputComponent } from '../../../../shared/components/dynamic-input/dynamic-input.component';
import { APIResponse } from '../../../../shared/interface/response';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { offerConditionsobjs } from '../../../../shared/providers/offer-conditions-objs';
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
  metadata: OfferMetadataItem | null = null;
  form: FormGroup = new FormGroup({});
  objs: any = {};
  keys: { stepName: string; key: string }[] = [];
  disableMap: { [key: string]: boolean } = {};
  groupFirstInput: { [key: string]: OfferMetadataItem } = {};
  options: OptionItem[] = [];
  variants: VariantItem[] = [];
  uploadedFiles: File[] = [];
  showForm: boolean = false;
  nextInputCommand = (
    value: any,
    step: string,
    index: number,
    elemnt?: OfferMetadataItem | null,
    control?: FormControl,
  ) => {
    if (elemnt) {
      const nextInput = elemnt.options.find((x) => x.id === value)?.nextInput;
      if (nextInput) {
        if (elemnt?.addType) {
          elemnt.addType.forEach((addType, index) => {
            if (elemnt?.dataType === 'list') {
              this.keys.push({ key: addType.key, stepName: addType.stepName });
              this.disableMap = { ...this.disableMap, [addType.key]: true };
              this.objs = { ...this.objs, [addType.key]: [[nextInput[index]]] };
              const newControl = new FormControl(null);
              newControl.valueChanges.subscribe((value) => {
                if (elemnt?.addType) this.nextInputCommand(value, addType.key, 0, nextInput[index], newControl);
              });
              const group = new FormGroup({ [nextInput[index].key]: newControl });
              const arr = new FormArray([group]);
              this.form.addControl(addType.key, arr);
              this.groupFirstInput = { ...this.groupFirstInput, [addType.key]: nextInput[index] };
            }
          });
        } else {
          if (elemnt?.options.length > 0) {
            nextInput.forEach((inpt) => {
              if (inpt.source) {
                const obs$ =
                  inpt.source.method === 'post'
                    ? this.http.post<APIResponse<any[]>>(inpt.source.url, {})
                    : this.http.get<APIResponse<any[]>>(inpt.source.url);
                obs$.subscribe((res) => {
                  inpt.options = res.data;
                  this.objs[step][index].push(inpt);
                  const newControl = new FormControl(null);
                  newControl.valueChanges.subscribe((value) => {
                    this.nextInputCommand(value, step, index, inpt, newControl);
                  });
                  const stepControl = this.form.get(step);
                  if (stepControl instanceof FormArray) {
                    const orginalGroup = stepControl.controls[index] as FormGroup;
                    orginalGroup.addControl(inpt.key, newControl);
                  }
                });
              } else {
                this.objs[step][index].push(inpt);
                const newControl = new FormControl(null);
                newControl.valueChanges.subscribe((value) => {
                  this.nextInputCommand(value, step, index, inpt, newControl);
                });
                const stepControl = this.form.get(step);
                if (stepControl instanceof FormArray) {
                  const orginalGroup = stepControl.controls[index] as FormGroup;
                  orginalGroup.addControl(inpt.key, newControl);
                }
              }
            });
          }
        }
      }
      if (elemnt.options.length === 0 || !nextInput) {
        this.disableMap[step] = false;
      }
      if (elemnt.dataType === 'list') {
        control?.disable({ emitEvent: false });
      }
    }
  };
  constructor(
    private offerManagement: OfferManagementService,
    private msgSrv: MessageToastService,
    private http: HttpClient,
    public router: Router,
  ) {
    this.metadata = offerConditionsobjs;
    this.objs = { generalInfo: [this.metadata] };
    const newControl = new FormControl();
    newControl.valueChanges.subscribe((value) => {
      this.nextInputCommand(value, 'generalInfo', 0, this.metadata, newControl);
    });
    this.form.addControl('generalInfo', new FormGroup({}));
    (this.form.controls['generalInfo'] as FormGroup).addControl(this.metadata.key, newControl);
    this.keys.push({ stepName: 'معلومات عامة', key: 'generalInfo' });
    this.showForm = true;
  }
  getControl(step: string, name: string, index: number) {
    const stepControl = this.form.get(step);
    const isArray = stepControl instanceof FormArray;
    if (!isArray) {
      return stepControl?.get(name) as FormControl;
    }
    return stepControl.controls[index].get(name) as FormControl;
  }
  isArray(step: string) {
    const stepControl = this.form.get(step);
    return stepControl instanceof FormArray;
  }

  addnewGroup(key: string) {
    const index = this.objs[key].length;
    this.disableMap[key] = true;
    this.objs[key].push([this.groupFirstInput[key]]);
    const newControl = new FormControl(null);
    newControl.valueChanges.subscribe((value) => {
      this.nextInputCommand(value, key, index, this.groupFirstInput[key], newControl);
    });
    const group = new FormGroup({ [this.groupFirstInput[key].key]: newControl });
    (this.form.get(key) as FormArray).push(group);
  }
  removeGroup(key: string, index: number) {
    (this.objs[key] as any[]).splice(index, 1);
    (this.form.get(key) as FormArray).removeAt(index);
  }
  submit() {
    console.log(this.form.getRawValue());
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
