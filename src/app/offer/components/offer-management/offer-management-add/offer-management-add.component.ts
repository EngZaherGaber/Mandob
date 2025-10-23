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
  metadata: OfferMetadataItem[] | null = null;
  form: FormGroup = new FormGroup({});
  objs: any = {};
  keys: { stepName: string; key: string }[] = [];
  disableMap: { [key: string]: boolean } = {};
  groupFirstInput: { [key: string]: OfferMetadataItem } = {};
  options: OptionItem[] = [];
  variants: VariantItem[] = [];
  uploadedFiles: File[] = [];
  showForm: boolean = false;
  /**
   * Dynamically handles form input changes and builds dependent fields.
   * When a user selects a value, this method:
   *  1. Finds and initializes the corresponding next input(s).
   *  2. Dynamically updates the form structure (FormControl, FormArray, FormGroup).
   *  3. Optionally fetches options from an API if defined.
   *  4. Supports recursive chaining of dependent inputs.
   */
  nextInputCommand = (
    value: any, // Selected value from the current form input
    stepKey: string, // Current step or form section key
    groupIndex: number, // Index of the group inside FormArray
    element?: OfferMetadataItem | null, // Metadata definition for the current input
    control?: FormControl, // Associated reactive FormControl
  ): void => {
    const addNewControl = (stepKey: string, groupIndex: number, element?: OfferMetadataItem | null) => {
      if (element) {
        this.objs[stepKey][groupIndex].push(element);
        // Create a new reactive FormControl
        const newControl = new FormControl(null);

        // Subscribe recursively to handle nested dependencies
        newControl.valueChanges.subscribe((newValue) => {
          this.nextInputCommand(newValue, stepKey, groupIndex, element, newControl);
        });

        // Add control to the corresponding FormGroup inside FormArray
        const stepControl = this.form.get(stepKey);
        if (stepControl instanceof FormArray) {
          const group = stepControl.at(groupIndex) as FormGroup;
          group.addControl(element.key, newControl);
        }
      }
    };

    // Exit early if the element definition is missing
    if (!element) return;

    // Find the "nextInput" configuration based on the selected option
    const nextInputs = element.options.find((opt) => opt.id === value)?.nextInput;

    // Only proceed if we have next inputs defined
    if (nextInputs && nextInputs.length > 0) {
      /**
       * CASE 1: Handle elements that define "addType"
       * (used for dynamically adding new form arrays or grouped inputs)
       */
      if (element.addType) {
        element.addType.forEach((addType, addIndex) => {
          // --- Clean up any existing controls with the same key ---
          const existingKeyIndex = this.keys.findIndex((k) => k.key === addType.key);
          if (existingKeyIndex > -1) {
            this.form.removeControl(addType.key);
            delete this.objs[addType.key];
            delete this.disableMap[addType.key];
            delete this.groupFirstInput[addType.key];
            this.keys.splice(existingKeyIndex, 1);
          }

          // --- Add new controls only if dataType is "list" ---
          if (element.dataType === 'list') {
            // Track metadata key for the newly added field
            this.keys.push({ key: addType.key, stepName: addType.stepName });

            // Disable new section initially
            this.disableMap = { ...this.disableMap, [addType.key]: true };

            // Store the structure for the newly added section
            this.objs = { ...this.objs, [addType.key]: [[nextInputs[addIndex]]] };

            // Create reactive control for the next input
            const newControl = new FormControl(null);

            // Subscribe to changes → recursively process deeper inputs
            newControl.valueChanges.subscribe((newValue) => {
              if (element.addType) {
                this.nextInputCommand(newValue, addType.key, 0, nextInputs[addIndex], newControl);
              }
            });

            // Wrap control inside a FormGroup and then into a FormArray
            const group = new FormGroup({ [nextInputs[addIndex].key]: newControl });
            const array = new FormArray([group]);

            // Add this dynamic array to the root form
            this.form.addControl(addType.key, array);

            // Keep track of the first input metadata for this group
            this.groupFirstInput = { ...this.groupFirstInput, [addType.key]: nextInputs[addIndex] };
          }
        });
      } else if (element.options.length > 0) {
        /**
         * CASE 2: Handle elements without "addType"
         * These are standard dependent inputs (may load data from API or local options)
         */
        nextInputs.forEach((inputMeta) => {
          // --- If this input has an API source, fetch its options ---
          if (inputMeta.source) {
            this.http.post<APIResponse<any[]>>(inputMeta.source, {}).subscribe((res) => {
              // Populate options from server response
              inputMeta.options = res.data;

              // Store metadata structure
              addNewControl(stepKey, groupIndex, inputMeta);
            });
          }

          // --- Otherwise, add static options directly ---
          else {
            addNewControl(stepKey, groupIndex, inputMeta);
          }
        });
      }
    }

    /**
     * CASE 3: No next input exists → enable current step again
     */
    if (!nextInputs || element.options.length === 0) {
      this.disableMap[stepKey] = false;
    }

    /**
     * CASE 4: Disable the control if it's a list without addType
     * (prevents multiple triggers)
     */
    if (element.dataType === 'list' && !element.addType) {
      control?.disable({ emitEvent: false });
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
    console.log(JSON.stringify(this.metadata));
    this.objs = { generalInfo: this.metadata };
    this.metadata.forEach((item) => {
      const newControl = new FormControl();
      newControl.valueChanges.subscribe((value) => {
        this.nextInputCommand(value, 'generalInfo', 0, item, newControl);
      });
      this.form.addControl('generalInfo', new FormGroup({}));
      (this.form.controls['generalInfo'] as FormGroup).addControl(item.key, newControl);
    });
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
    if ((this.objs[key] as any[]).length === 0) {
      this.disableMap[key] = false;
    }
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
    this.offerManagement.add(this.form.getRawValue()).subscribe((res) => {
      this.msgSrv.showMessage(res.message, res.succeeded);
      if (res.succeeded) this.router.navigate(['company/offer-management/show']);
    });
  }
}
