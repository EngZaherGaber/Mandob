import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../shared/modules/shared/primeng-shared.module';
import { MessageToastService } from '../../../shared/service/message-toast.service';
import { RequestReviewDetails } from '../../interfaces/request-review-details';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'review-submit',
  imports: [PrimeNgSharedModule, ReactiveFormsModule],
  templateUrl: './review-submit.component.html',
  styleUrl: './review-submit.component.scss',
})
export class ReviewSubmitComponent implements OnInit {
  @Input() requestID: number | null = 0;
  @Input() withOutput: boolean = false;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  reviewDetails: RequestReviewDetails | null = null;
  form: FormGroup = new FormGroup({
    requestID: new FormControl(),
    companyComment: new FormControl(),
    companyRating: new FormControl(),
    distributorComment: new FormControl(),
    distributorRating: new FormControl(),
    productReviews: new FormArray([]),
  });
  objs: InputDynamic[] = [];
  variantObjs: { [key: string]: InputDynamic[] } = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewSrv: ReviewService,
    private msgSrv: MessageToastService,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((param) => {
          if (!this.requestID) {
            this.requestID = param['id'];
          }
          if (this.requestID) {
            this.form.controls['requestID'].setValue(+this.requestID);
          }
          return this.reviewSrv.getOne(this.requestID ?? 0);
        }),
      )
      .subscribe((res) => {
        if (res.succeeded) {
          this.reviewDetails = res.data;
          if (this.reviewDetails) this.fillForm(this.reviewDetails);
        }
      });
  }

  fillForm(reviewDetails: RequestReviewDetails) {
    reviewDetails.requestItems.forEach((item) => {
      const variantArr = new FormArray<any>([]);
      item.variants.forEach((variant) => {
        const variantGroup = new FormGroup({
          productVariantID: new FormControl(variant.variantID),
          rating: new FormControl(0),
        });
        variantArr.push(variantGroup);
      });
      const group = new FormGroup({
        productID: new FormControl(item.productID),
        comment: new FormControl(null),
        variantReviews: variantArr,
      });
      (this.form.controls['productReviews'] as FormArray).push(group);
    });
  }
  submit() {
    this.reviewSrv.submit(this.form.value).subscribe((res) => {
      this.msgSrv.showMessage(res.message, res.succeeded);
      if (res.succeeded) {
        if (!this.withOutput) this.router.navigate(['']);
        else this.onSubmit.emit(true);
      }
    });
  }
}
