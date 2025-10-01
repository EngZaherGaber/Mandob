import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DynmaicFormComponent } from '../../../../shared/components/dynmaic-form/dynmaic-form.component';
import { InputDynamic } from '../../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
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
  isShow: boolean = false;
  constructor(
    private collectionManagement: CollectionManagementService,
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
      )
      .subscribe((res) => {
        this.resetObjs = {
          general: [
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
        };
      });
  }

  submit(event: any) {
    this.collectionManagement.edit(this.collectionId, event).subscribe((res) => {
      if (res.succeeded) {
        this.router.navigate(['company/collection-management/show']);
      }
    });
  }
}
