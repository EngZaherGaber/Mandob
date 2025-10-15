import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OptionItem } from '../../../../product/interfaces/option-item';
import { VariantItem } from '../../../../product/interfaces/variant-item';
import { DynamicInputComponent } from '../../../../shared/components/dynamic-input/dynamic-input.component';
import { APIResponse } from '../../../../shared/interface/response';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { OfferConditionService } from '../../../../shared/service/offer-condition.service';
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
                this.http.post<APIResponse<any[]>>(inpt.source, {}).subscribe((res) => {
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
    private offerConditionSrv: OfferConditionService,
    public router: Router,
  ) {
    this.metadata = this.offerConditionSrv.offerConditionsobjs;
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

  submit() {
    console.log(this.form.getRawValue());
  }
}
