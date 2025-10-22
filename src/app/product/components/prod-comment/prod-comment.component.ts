import { Component, Input } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { ReviewService } from '../../../review/services/review.service';
import { PrimeNgSharedModule } from '../../../shared/modules/shared/primeng-shared.module';
import { ProdComment } from '../../interfaces/prod-comment';

@Component({
  selector: 'prod-comment',
  imports: [PrimeNgSharedModule],
  templateUrl: './prod-comment.component.html',
  styleUrl: './prod-comment.component.scss',
})
export class ProdCommentComponent {
  @Input() productID: number = 0;
  lazyLoading: boolean = true;
  comments: ProdComment[] = [];
  get$: Observable<any>;
  getSub$: Subject<any> = new Subject();
  constructor(private reviewSrv: ReviewService) {
    this.get$ = this.getSub$.pipe(
      switchMap((body) => {
        return this.reviewSrv.getProductComments(this.productID, body);
      }),
    );
  }
  ngOnInit() {
    this.get$.subscribe((res) => {
      if (res.succeeded) this.comments = res.data;
      console.log(this.comments);
      this.lazyLoading = false;
    });
    this.getSub$.next({ first: 0, last: 10 });
  }
  onLazyLoad(event: any) {
    if (event.last !== 0) {
      this.lazyLoading = true;
      this.getSub$.next(event);
    }
  }
}
