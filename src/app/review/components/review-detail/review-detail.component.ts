import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputDynamic } from '../../../shared/interface/input-dynamic';
import { PrimeNgSharedModule } from '../../../shared/modules/shared/primeng-shared.module';
import { ReviewSubmit } from '../../interfaces/review-submit';

@Component({
  selector: 'review-detail',
  imports: [PrimeNgSharedModule, ReactiveFormsModule],
  templateUrl: './review-detail.component.html',
  styleUrl: './review-detail.component.scss',
})
export class ReviewDetailComponent implements OnInit {
  @Input() reviewDetails: ReviewSubmit | null = null;
  form: FormGroup = new FormGroup({
    requestID: new FormControl(),
    companyComment: new FormControl(),
    companyName: new FormControl(),
    companyRating: new FormControl(),
    distributorComment: new FormControl(),
    distributorName: new FormControl(),
    distributorRating: new FormControl(),
    productReviews: new FormArray([]),
  });
  objs: InputDynamic[] = [];
  variantObjs: { [key: string]: InputDynamic[] } = {};
  constructor() {}

  ngOnInit(): void {
    if (this.reviewDetails) this.fillForm(this.reviewDetails);
  }

  fillForm(reviewDetails: ReviewSubmit) {
    reviewDetails.productReviews.forEach((item) => {
      const variantArr = new FormArray<any>([]);
      item.variantReviews.forEach((variant) => {
        const variantGroup = new FormGroup({
          productVariantID: new FormControl(variant.productVariantID),
          variantName: new FormControl(variant.variantName),
          rating: new FormControl(0),
        });
        variantArr.push(variantGroup);
      });
      const group = new FormGroup({
        productID: new FormControl(item.productID),
        productName: new FormControl(item.productName),
        comment: new FormControl(null),
        variantReviews: variantArr,
      });
      (this.form.controls['productReviews'] as FormArray).push(group);
    });
    this.form.setValue(reviewDetails);
    this.form.disable();
  }
}
