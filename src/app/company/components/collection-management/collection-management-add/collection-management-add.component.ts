import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { CollectionManagementService } from '../../../services/collection-management.service';

@Component({
  selector: 'app-collection-management-add',
  imports: [DynmaicFormComponent, PrimeNgSharedModule],
  templateUrl: './collection-management-add.component.html',
  styleUrl: './collection-management-add.component.scss',
})
export class CollectionManagementAddComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  uploadedFiles: File[] = [];
  activeIndex = 0;
  stepsList: MenuItem[] = [{ label: 'المعلومات العامة' }, { label: 'الصورة' }];
  constructor(
    private collectionManagementSrv: CollectionManagementService,
    private router: Router,
    private msgSrv: MessageToastService
  ) {
    this.resetObjs = {
      generalInfo: [
        {
          key: 'collectionName',
          label: 'اسم المجموعة',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
        {
          key: 'description',
          label: 'وصف المجموعة',
          value: null,
          dataType: 'string',
          required: true,
          visible: true,
          options: [],
        },
      ],
      image: [],
    };
  }
  ngOnInit() {}
  onSelect(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  submit(event: any) {
    const body = event.generalInfo;
    this.collectionManagementSrv.add(body, this.uploadedFiles).subscribe((res) => {
      if (res.succeeded) {
        this.router.navigate(['company/collection-management/show']);
      }
    });
  }
}
