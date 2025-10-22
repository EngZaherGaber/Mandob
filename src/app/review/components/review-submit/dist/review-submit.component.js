"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReviewSubmitComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var primeng_shared_module_1 = require("../../../shared/modules/shared/primeng-shared.module");
var ReviewSubmitComponent = /** @class */ (function () {
    function ReviewSubmitComponent(route, router, reviewSrv, msgSrv) {
        this.route = route;
        this.router = router;
        this.reviewSrv = reviewSrv;
        this.msgSrv = msgSrv;
        this.requestID = 0;
        this.withOutput = false;
        this.onSubmit = new core_1.EventEmitter();
        this.reviewDetails = null;
        this.form = new forms_1.FormGroup({
            requestID: new forms_1.FormControl(),
            companyComment: new forms_1.FormControl(),
            companyRating: new forms_1.FormControl(),
            distributorComment: new forms_1.FormControl(),
            distributorRating: new forms_1.FormControl(),
            productReviews: new forms_1.FormArray([])
        });
        this.objs = [];
        this.variantObjs = {};
    }
    ReviewSubmitComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .pipe(rxjs_1.switchMap(function (param) {
            var _a;
            if (!_this.requestID) {
                _this.requestID = param['id'];
            }
            if (_this.requestID) {
                _this.form.controls['requestID'].setValue(+_this.requestID);
            }
            return _this.reviewSrv.getOne((_a = _this.requestID) !== null && _a !== void 0 ? _a : 0);
        }))
            .subscribe(function (res) {
            if (res.succeeded) {
                _this.reviewDetails = res.data;
                if (_this.reviewDetails)
                    _this.fillForm(_this.reviewDetails);
            }
        });
    };
    ReviewSubmitComponent.prototype.fillForm = function (reviewDetails) {
        var _this = this;
        reviewDetails.requestItems.forEach(function (item) {
            var variantArr = new forms_1.FormArray([]);
            item.variants.forEach(function (variant) {
                var variantGroup = new forms_1.FormGroup({
                    productVariantID: new forms_1.FormControl(variant.variantID),
                    rating: new forms_1.FormControl(0)
                });
                variantArr.push(variantGroup);
            });
            var group = new forms_1.FormGroup({
                productID: new forms_1.FormControl(item.productID),
                comment: new forms_1.FormControl(null),
                variantReviews: variantArr
            });
            _this.form.controls['productReviews'].push(group);
        });
    };
    ReviewSubmitComponent.prototype.submit = function () {
        var _this = this;
        this.reviewSrv.submit(this.form.value).subscribe(function (res) {
            _this.msgSrv.showMessage(res.message, res.succeeded);
            if (res.succeeded) {
                if (!_this.withOutput)
                    _this.router.navigate(['']);
                else
                    _this.onSubmit.emit(true);
            }
        });
    };
    __decorate([
        core_1.Input()
    ], ReviewSubmitComponent.prototype, "requestID");
    __decorate([
        core_1.Input()
    ], ReviewSubmitComponent.prototype, "withOutput");
    __decorate([
        core_1.Output()
    ], ReviewSubmitComponent.prototype, "onSubmit");
    ReviewSubmitComponent = __decorate([
        core_1.Component({
            selector: 'review-submit',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, forms_1.ReactiveFormsModule],
            templateUrl: './review-submit.component.html',
            styleUrl: './review-submit.component.scss'
        })
    ], ReviewSubmitComponent);
    return ReviewSubmitComponent;
}());
exports.ReviewSubmitComponent = ReviewSubmitComponent;
