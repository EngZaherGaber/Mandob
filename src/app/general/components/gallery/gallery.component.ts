import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PrimeNgSharedModule } from '../../../shared/modules/shared/primeng-shared.module';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { UploadsService } from '../../services/uploads.service';
import { UserStateService } from '../../services/user-state.service';
@Component({
  selector: 'gallery',
  imports: [PrimeNgSharedModule, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  uploadedFiles: File[] = [];
  images: { imageUrl: string; imageId: number }[] = [];
  getSub$: Subject<any> = new Subject();
  get$: Observable<any> = new Observable();
  constructor(
    public userState: UserStateService,
    private msgSrv: MessageToastService,
    private confirmationService: ConfirmationService,
    private uploadSrv: UploadsService
  ) {
    const strategy = userState.strategy();
    if (strategy) {
      this.get$ = this.getSub$.pipe(
        switchMap((res) => {
          return strategy.getById();
        })
      );
      this.get$.subscribe(async (res) => {
        if (res.succeeded) {
          this.images = res.data.images;
        }
        return of(res ?? true);
      });
      this.getSub$.next(null);
    }
  }
  // Called by UI buttons: triggers function passed by parent
  chooseCallbackN(event: any, callback: any) {
    callback();
  }
  clearCallbackN(callback: any) {
    callback();
  }
  onSelect(event: any) {
    for (let file of event.files) {
      this.uploadedFiles = [file];
    }
  }
  handleFileUpload() {
    this.uploadSrv.upload(this.uploadedFiles).subscribe((res) => {
      if (res.succeeded) {
        this.msgSrv.showSuccess('تم تحميل الصور');
        this.getSub$.next(null);
      }
    });
  }
  deleteImage(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'هل تريد حذف هذه الصورة؟',
      header: 'حذف الصورة',
      icon: 'pi pi-info-circle',
      rejectLabel: 'الغاء',
      rejectButtonProps: {
        label: 'الغاء',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'حذف',
        severity: 'danger',
      },

      accept: () => {
        this.uploadSrv.delete(id).subscribe((res) => {
          if (res.succeeded) {
            this.msgSrv.showSuccess('تم حذف الصورة');
            this.getSub$.next(null);
          }
        });
      },
    });
  }
  setMain(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'هل تريد جعل هذه الصورة رئيسية؟',
      header: 'جعل الصورة رئيسية',
      icon: 'pi pi-info-circle',
      rejectLabel: 'الغاء',
      rejectButtonProps: {
        label: 'الغاء',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'حفظ',
        severity: 'success',
      },

      accept: () => {
        this.uploadSrv
          .setMain(id)
          .pipe(
            switchMap((res) => {
              if (res.succeeded) {
                this.msgSrv.showSuccess(' تم اختيار الصورة الرئيسية');
                this.getSub$.next(null);
                return this.userState.authSrv.myInfo();
              }
              return EMPTY;
            })
          )
          .subscribe((res) => {
            if (res.succeeded) {
              this.userState.user.set(res.data);
            }
          });
      },
    });
  }
}
