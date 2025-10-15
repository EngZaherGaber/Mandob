"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OfferConditionService = void 0;
var core_1 = require("@angular/core");
var OfferConditionService = /** @class */ (function () {
    function OfferConditionService() {
        this.variantMetadata = {
            key: 'SKU',
            visible: true,
            value: null,
            label: 'نوع المنتج',
            source: 'api/ProductManagement/getall-variant',
            dataType: 'autoComplete',
            required: true,
            options: []
        };
        this.productMetadata = {
            key: 'productId',
            visible: true,
            value: null,
            label: 'نوع المنتج',
            source: 'api/ProductManagement/getall',
            dataType: 'list',
            required: true,
            options: []
        };
        this.priorityMetadata = {
            key: 'priority',
            visible: true,
            value: null,
            label: 'ترتيب الأولوية :',
            dataType: 'int',
            required: true,
            options: []
        };
        this.categoryMetadata = {
            key: 'CategoryId',
            visible: true,
            value: null,
            label: 'الفئة',
            dataType: 'list',
            required: true,
            source: 'api/Category/GetAll/false',
            options: []
        };
        this.valueMetadata = {
            key: 'value',
            visible: true,
            value: null,
            label: 'القيمة',
            dataType: 'float',
            required: true,
            options: []
        };
        this.offerBenfintsobjs = {
            key: 'actionTarget',
            visible: true,
            value: null,
            label: 'اختر هدف الإجراء:',
            dataType: 'list',
            required: true,
            options: [
                {
                    id: 0,
                    name: 'على السلة',
                    nextInput: [
                        {
                            key: 'actionType',
                            visible: true,
                            value: null,
                            label: 'اختر الإجراء لـ السلة:',
                            dataType: 'list',
                            required: true,
                            options: [
                                {
                                    id: 0,
                                    name: 'خصم بنسبة مئوية',
                                    nextInput: [
                                        {
                                            key: 'النسبة',
                                            visible: true,
                                            value: null,
                                            label: 'النسبة المئوية (%)',
                                            dataType: 'float',
                                            required: true,
                                            options: []
                                        },
                                    ]
                                },
                                {
                                    id: 1,
                                    name: 'خصم بمبلغ ثابت',
                                    nextInput: [
                                        {
                                            key: 'المبلغ',
                                            visible: true,
                                            value: null,
                                            label: 'المبلغ ($)',
                                            dataType: 'float',
                                            required: true,
                                            options: []
                                        },
                                    ]
                                },
                            ]
                        },
                    ]
                },
                {
                    id: 2,
                    name: 'على منتج ',
                    nextInput: [
                        this.productMetadata,
                        {
                            key: 'price',
                            label: 'السعر الجديد',
                            visible: true,
                            value: null,
                            dataType: 'int',
                            required: true,
                            options: []
                        },
                        {
                            key: 'quntity',
                            label: 'الكمية',
                            visible: true,
                            value: null,
                            dataType: 'int',
                            required: true,
                            options: []
                        },
                    ]
                },
            ]
        };
        this.offerConditionsobjs = {
            key: 'offerType',
            visible: true,
            value: null,
            label: 'اختر نوع العرض:',
            dataType: 'list',
            required: true,
            addType: [
                { canRepeatOption: true, key: 'conditions', stepName: 'الشروط' },
                { canRepeatOption: true, key: 'benfints', stepName: 'النتائج' },
            ],
            options: [
                {
                    id: 0,
                    name: 'عرض تلقائي',
                    nextInput: [
                        {
                            key: 'ruleCategory',
                            visible: true,
                            value: null,
                            label: 'اختيار فئة الشرط:',
                            dataType: 'list',
                            required: true,
                            options: [
                                {
                                    id: 0,
                                    name: 'السلة',
                                    nextInput: [
                                        {
                                            key: 'ruleType',
                                            visible: true,
                                            value: null,
                                            label: 'اختيار نوع الشرط لـ السلة:',
                                            dataType: 'list',
                                            required: true,
                                            options: [
                                                { id: 0, name: 'إجمالي سعر السلة', nextInput: [this.getOperatorMetadata('float')] },
                                                { id: 1, name: 'إجمالي كمية المنتجات', nextInput: [this.getOperatorMetadata('int')] },
                                                { id: 2, name: 'يحتوي على فئة', nextInput: [this.categoryMetadata, this.priorityMetadata] },
                                                { id: 3, name: 'يحتوي على منتج', nextInput: [this.productMetadata, this.priorityMetadata] },
                                                { id: 5, name: 'يحتوي على نوع منتج', nextInput: [this.variantMetadata, this.priorityMetadata] },
                                                { id: 4, name: 'خصم عام (لا شروط)', nextInput: [this.valueMetadata, this.priorityMetadata] },
                                            ]
                                        },
                                    ]
                                },
                                {
                                    id: 1,
                                    name: 'المنتجات',
                                    nextInput: [
                                        {
                                            key: 'ruleType',
                                            visible: true,
                                            value: null,
                                            label: 'اختيار نوع الشرط لـ المنتجات:',
                                            dataType: 'list',
                                            required: true,
                                            options: [
                                                { id: 0, name: 'كمية منتج', nextInput: [this.productMetadata, this.getOperatorMetadata('int')] },
                                                { id: 1, name: 'يحتوي على نوع منتج', nextInput: [this.variantMetadata, this.priorityMetadata] },
                                                {
                                                    id: 3,
                                                    name: 'كمية نوع منتج',
                                                    nextInput: [this.variantMetadata, this.getOperatorMetadata('int')]
                                                },
                                            ]
                                        },
                                    ]
                                },
                                {
                                    id: 2,
                                    name: 'العميل',
                                    nextInput: [
                                        {
                                            key: 'ruleType',
                                            visible: true,
                                            value: null,
                                            label: 'اختيار نوع الشرط لـ العميل:',
                                            dataType: 'list',
                                            required: true,
                                            options: [{ id: 0, name: 'الطلب الأول للعميل', nextInput: [this.priorityMetadata] }]
                                        },
                                    ]
                                },
                            ]
                        },
                        this.offerBenfintsobjs,
                    ]
                },
                {
                    id: 1,
                    name: 'كود خصم',
                    nextInput: [
                        {
                            key: 'offerTypeFields',
                            visible: true,
                            value: null,
                            label: 'إعدادات كود الخصم:',
                            dataType: 'list',
                            required: true,
                            options: [{ id: 0, name: 'كود الخصم', nextInput: [this.valueMetadata] }]
                        },
                        this.offerBenfintsobjs,
                    ]
                },
            ]
        };
    }
    OfferConditionService.prototype.getOperatorMetadata = function (type) {
        var value = this.valueMetadata;
        value.dataType = type;
        var lst = [value, this.priorityMetadata];
        return {
            key: 'operator',
            visible: true,
            value: null,
            label: 'اختر العملية المطلوبة:',
            dataType: 'list',
            required: true,
            options: [
                { id: 0, name: 'أكبر من', nextInput: lst },
                { id: 1, name: 'أصغر من', nextInput: lst },
                { id: 2, name: 'يساوي', nextInput: lst },
                { id: 3, name: 'أكبر أو يساوي', nextInput: lst },
                { id: 4, name: 'أصغر أو يساوي', nextInput: lst },
            ]
        };
    };
    OfferConditionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OfferConditionService);
    return OfferConditionService;
}());
exports.OfferConditionService = OfferConditionService;
