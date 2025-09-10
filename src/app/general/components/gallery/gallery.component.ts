import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
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
      this.uploadedFiles.push(file);
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
  deleteImage(id: number) {
    this.uploadSrv.delete(id).subscribe((res) => {
      if (res.succeeded) {
        this.msgSrv.showSuccess('تم حذف الصورة');
        this.getSub$.next(null);
      }
    });
  }
  setMain(id: number) {
    this.uploadSrv.setMain(id).subscribe((res) => {
      if (res.succeeded) {
        this.msgSrv.showSuccess(' تم اختيار الصورة الرئيسية');
        this.getSub$.next(null);
      }
    });
  }
}
