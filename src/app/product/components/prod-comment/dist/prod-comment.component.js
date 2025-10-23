"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProdCommentComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var primeng_shared_module_1 = require("../../../shared/modules/shared/primeng-shared.module");
var ProdCommentComponent = /** @class */ (function () {
    function ProdCommentComponent(reviewSrv) {
        var _this = this;
        this.reviewSrv = reviewSrv;
        this.productID = 0;
        this.lazyLoading = true;
        this.comments = [];
        this.totalCount = 0;
        this.getSub$ = new rxjs_1.Subject();
        this.get$ = this.getSub$.pipe(rxjs_1.switchMap(function (body) {
            return _this.reviewSrv.getProductComments(_this.productID, body);
        }));
    }
    ProdCommentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.get$.subscribe(function (res) {
            if (res.succeeded) {
                _this.comments = res.data;
                _this.totalCount = res.count;
            }
            console.log(_this.comments);
            _this.lazyLoading = false;
        });
        this.getSub$.next({ first: 0, last: 10 });
    };
    ProdCommentComponent.prototype.onLazyLoad = function (event) {
        if (event.last !== 0) {
            this.lazyLoading = true;
            this.getSub$.next(event);
        }
    };
    __decorate([
        core_1.Input()
    ], ProdCommentComponent.prototype, "productID");
    ProdCommentComponent = __decorate([
        core_1.Component({
            selector: 'prod-comment',
            imports: [primeng_shared_module_1.PrimeNgSharedModule, forms_1.FormsModule],
            templateUrl: './prod-comment.component.html',
            styleUrl: './prod-comment.component.scss'
        })
    ], ProdCommentComponent);
    return ProdCommentComponent;
}());
exports.ProdCommentComponent = ProdCommentComponent;
