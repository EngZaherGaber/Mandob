"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReviewDetailComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var primeng_shared_module_1 = require("../../../shared/modules/shared/primeng-shared.module");
var ReviewDetailComponent = /** @class */ (function () {
    function ReviewDetailComponent() {
        this.reviewDetails = null;
        this.form = new forms_1.FormGroup({
            requestID: new forms_1.FormControl(),
            companyComment: new forms_1.FormControl(),
            companyName: new forms_1.FormControl(),
            companyRating: new forms_1.FormControl(),
            distributorComment: new forms_1.FormControl(),
            distributorName: new forms_1.FormControl(),
            distributorRating: new forms_1.FormControl(),
            productReviews: new forms_1.FormArray([])
        });
        this.objs = [];
        this.variantObjs = {};
    }
    ReviewDetailComponent.prototype.ngOnInit = function () {
        if (this.reviewDetails)
            this.fillForm(this.reviewDetails);
    };
    ReviewDetailComponent.prototype.fillForm = function (reviewDetails) {
        var _this = this;
        reviewDetails.productReviews.forEach(function (item) {
            var variantArr = new forms_1.FormArray([]);
            item.variantReviews.forEach(function (variant) {
                var variantGroup = new forms_1.FormGroup({
                    productVariantID: new forms_1.FormControl(variant.productVariantID),
                    variantName: new forms_1.FormControl(variant.variantName),
                    rating: new forms_1.FormControl(0)
                });
                variantArr.push(variantGroup);
            });
            var group = new forms_1.FormGroup({
                productID: new forms_1.FormControl(item.productID),
                productName: new forms_1.FormControl(item.productName),
                comment: new forms_1.FormControl(null),
                variantReviews: variantArr
            });
            _this.form.controls['productReviews'].push(group);
        });
        this.form.setValue(reviewDetails);
        this.form.disable();
    };
    __decorate([
        core_1.Input()
    ], ReviewDetailComponent.prototype, "reviewDetails");
    ReviewDetailComponent = __decorate([
        core_1.Component({
            selector: 'review-detail',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, forms_1.ReactiveFormsModule],
            templateUrl: './review-detail.component.html',
            styleUrl: './review-detail.component.scss'
        })
    ], ReviewDetailComponent);
    return ReviewDetailComponent;
}());
exports.ReviewDetailComponent = ReviewDetailComponent;
