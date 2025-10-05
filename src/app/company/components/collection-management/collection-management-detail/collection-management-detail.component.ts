import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { FileService } from '../../../../shared/service/file.service';
import { MessageToastService } from '../../../../shared/service/message-toast.service';
import { CollectionManagementService } from '../../../services/collection-management.service';

@Component({
  selector: 'collection-management-detail',
  imports: [DynmaicFormComponent, PrimeNgSharedModule],
  templateUrl: './collection-management-detail.component.html',
  styleUrl: './collection-management-detail.component.scss',
})
export class CollectionManagementDetailComponent {
  resetObjs: { [key: string]: InputDynamic[] } = {};
  collectionId: number = 0;
  uploadedFiles: File[] = [];
  activeIndex = 0;
  isShow: boolean = false;
  stepsList: MenuItem[] = [{ label: 'المعلومات العامة' }, { label: 'الصورة' }];
  showForm: boolean = false;
  constructor(
    private collectionManagement: CollectionManagementService,
    private fileSrv: FileService,
    private router: Router,
    private route: ActivatedRoute,
    private msgSrv: MessageToastService,
  ) {}
  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((param) => {
          this.collectionId = param['id'];
          this.isShow = param['type'] === 'display';
          return this.collectionManagement.getOne(this.collectionId);
        }),
        switchMap((res) => {
          if (res && res.succeeded) {
            this.resetObjs = {
              generalInfo: [
                {
                  key: 'collectionName',
                  label: 'اسم المجموعة',
                  value: (res.data as any).collectionName,
                  dataType: 'string',
                  required: true,
                  visible: true,
                  options: [],
                },
                {
                  key: 'description',
                  label: 'وصف المجموعة',
                  value: (res.data as any).description,
                  dataType: 'string',
                  required: true,
                  visible: true,
                  options: [],
                },
              ],
              image: [],
            };
            return this.fileSrv.getImages([res.data.collectionImageUrl]);
          }
          return of(false);
        }),
      )
      .subscribe((res) => {
        if (res && typeof res !== 'boolean') {
          this.uploadedFiles = res;
          this.showForm = true;
        }
      });
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
  submit(event: any) {
    const body = event.generalInfo;
    this.collectionManagement.edit(this.collectionId, body, this.uploadedFiles).subscribe((res) => {
      if (res.succeeded) {
        this.router.navigate(['company/collection-management/show']);
      }
    });
  }
}
