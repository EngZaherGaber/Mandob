import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfferMetadataItem } from '../../../offer/interfaces/offer-metadata-item';
import { InputDynamic } from '../../interface/input-dynamic';
import { PrimeNgSharedModule } from '../../modules/shared/primeng-shared.module';

@Component({
  selector: 'dynamic-input',
  imports: [ReactiveFormsModule, PrimeNgSharedModule, FormsModule],
  templateUrl: './dynamic-input.component.html',
  styleUrl: './dynamic-input.component.scss',
})
export class DynamicInputComponent {
  @Input() object: InputDynamic | OfferMetadataItem = {
    key: '',
    value: null,
    label: '',
    dataType: '',
    required: false,
    visible: false,
    options: [],
  };
  @Input() FEcontrol: FormControl = new FormControl('');
  items: any[] | undefined = [];
  autoCompleteValue: any;
  arabicPattern: RegExp = /^[\u0600-\u06FF\s]+$/;
  nonArabicPattern: RegExp = /^[^\u0600-\u06FF]+$/;
  numberPlusPattern: RegExp = /^[0-9+]+$/;

  now: Date = new Date();
  minDate: Date;
  maxDate: Date;
  constructor() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);
  }
  ngOnInit(): void {
    if (this.FEcontrol.value === null && this.FEcontrol.value !== 0) {
      if (this.object.dataType.toLowerCase() === 'autocomplete') {
        this.items;
        const value = this.object.options?.find((x) => x.id === this.FEcontrol.value);
        value ? (this.autoCompleteValue = value) : '';
      } else if (this.object.dataType.toLowerCase() === 'float' || this.object.dataType.toLowerCase() === 'int') {
        this.FEcontrol.setValue(0);
      } else if (this.object.dataType.toLowerCase() === 'bool') {
        this.FEcontrol.setValue(false);
      } else if (this.object.dataType.toLowerCase() === 'datetime') {
        this.FEcontrol.setValue(new Date());
      } else if (this.object.dataType.toLowerCase() === 'year' || this.object.dataType.toLowerCase() === 'month') {
        if (this.object.dataType.toLowerCase() === 'year') {
          this.autoCompleteValue = new Date();
          this.FEcontrol.setValue(new Date().getFullYear());
        } else {
          // this.FEcontrol.setValue(this.autoCompleteValue);
          this.autoCompleteValue = new Date();
          this.FEcontrol.setValue(new Date().getMonth() + 1);
        }
      }
    } else {
      if (this.object.dataType.toLowerCase() === 'list') {
        if (this.FEcontrol.value && this.FEcontrol.value.id === 0) {
          this.FEcontrol.setValue(this.FEcontrol.value.id);
        }
      } else if (this.object.dataType.toLowerCase() === 'autocomplete') {
        this.items;
        this.autoCompleteValue = this.object.options?.find((x) => x.id === this.FEcontrol.value);
      } else if (this.object.dataType.toLowerCase() === 'datetime') {
        const va = new Date(this.FEcontrol.value);
        this.FEcontrol.setValue(va);
      } else if (this.object.dataType.toLowerCase() === 'year' || this.object.dataType.toLowerCase() === 'month') {
        const type = this.object.dataType.toLowerCase() === 'year' ? 'yy' : 'mm';
        if (this.object.dataType.toLowerCase() === 'year') {
          this.autoCompleteValue = new Date();
        } else {
          this.autoCompleteValue = new Date();
        }
        const yy = this.autoCompleteValue.getFullYear();
        const mm = this.autoCompleteValue.getMonth() + 1;
        this.FEcontrol.setValue(type === 'mm' ? mm : yy);
      }
    }
    this.object = this.repeairLabel(this.object);
  }
  repeairLabel(obj: InputDynamic): InputDynamic {
    obj.label = obj.label.replace(/([a-z])([A-Z])/g, '$1 $2');
    if (obj.label.toLowerCase().endsWith(' id')) {
      obj.label = obj.label.slice(0, -3);
    }
    obj.label = obj.label.replace('_', ' ');
    obj.label = obj.label.charAt(0).toUpperCase() + obj.label.slice(1);
    return obj;
  }
  getSuggestions(event: any) {
    this.items = this.object.options
      ?.filter((x) => (x.name as string).toLowerCase().includes(event.query.toLowerCase()))
      .sort((a, b) => (a.name as string).localeCompare(b.name as string));
  }
  selectValue(event: any) {
    this.autoCompleteValue = event;
    this.FEcontrol.setValue(event.id);
  }
  selectDate(event: any) {
    this.FEcontrol.setValue(new Date(new Date(event).setHours(3)));
  }
  selectYM(event: Date, type: 'mm' | 'yy') {
    const date = new Date(event);
    const yy = date.getFullYear();
    const mm = date.getMonth() + 1;
    this.FEcontrol.setValue(type === 'mm' ? mm : yy);
  }
  disableAutoComplete() {
    return this.FEcontrol.disabled;
  }
  filterList(event: any, drop: any) {
    const searchValue = (event.filter as string) ? (event.filter as string).toLowerCase().replace(/\s+/g, '') : null;
    if (drop) {
      if (searchValue) {
        drop.options = this.object.options?.filter((x) =>
          (x.name as string).toLowerCase().replace(/\s+/g, '').includes(searchValue),
        );
      } else {
        drop.options = drop.options;
      }
    }
  }
  preventSpace(event: KeyboardEvent, controlValue: number | null) {
    if (event.code === 'Space' && controlValue === 0) {
      event.preventDefault();
    }
  }
}
