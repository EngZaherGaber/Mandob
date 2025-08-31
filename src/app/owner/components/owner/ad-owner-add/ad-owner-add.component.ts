import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';

@Component({
  selector: 'ad-owner-add',
  imports: [DynmaicFormComponent, CommonModule],
  templateUrl: './ad-owner-add.component.html',
  styleUrl: './ad-owner-add.component.scss',
})
export class AdOwnerAddComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  stepsList: MenuItem[] = [{ label: 'المعلومات العامة' }, { label: 'المعلومات الخاصة' }];
  constructor() {
    this.resetObjs = {
      generalInfo: [
        {
          key: 'nameAr',
          label: 'Arabic Name',
          value: null,
          dataType: 'string',
          lang: 'ar',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'nameEn',
          label: 'English Name1',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
      ],
      generalInfo2: [
        {
          key: 'nameAr',
          label: 'Arabic Name',
          value: null,
          dataType: 'string',
          lang: 'ar',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'nameEn',
          label: 'English Name',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
      ],
    };
  }
  ngOnInit() {}
  submit(event: any) {
    console.log(event);
  }
}
