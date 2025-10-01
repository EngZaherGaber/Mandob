import { OfferMetadataItem } from '../../offer/interfaces/offer-metadata-item';

const variantMetadata: OfferMetadataItem = {
  key: 'SKU',
  visible: true,
  value: null,
  label: 'نوع المنتج',
  source: 'api/ProductManagement/getall-variant',
  dataType: 'autoComplete',
  required: true,
  options: [],
};
const productMetadata: OfferMetadataItem = {
  key: 'productId',
  visible: true,
  value: null,
  label: 'نوع المنتج',
  source: 'api/ProductManagement/getall',
  dataType: 'list',
  required: true,
  options: [],
};
const priorityMetadata: OfferMetadataItem = {
  key: 'priority',
  visible: true,
  value: null,
  label: 'ترتيب الأولوية :',
  dataType: 'int',
  required: true,
  options: [],
};
const operatorMetadata: OfferMetadataItem = {
  key: 'operator',
  visible: true,
  value: null,
  label: 'اختر العملية المطلوبة:',
  dataType: 'list',
  required: true,
  options: [
    {
      id: 0,
      name: 'أكبر من',
      nextInput: [
        {
          key: 'value',
          visible: true,
          value: null,
          label: 'القيمة',
          dataType: 'float',
          required: true,
          options: [],
        },
        priorityMetadata,
      ],
    },
    {
      id: 1,
      name: 'أصغر من',
      nextInput: [
        {
          key: 'value',
          visible: true,
          value: null,
          label: 'القيمة',
          dataType: 'float',
          required: true,
          options: [],
        },
        priorityMetadata,
      ],
    },
    {
      id: 2,
      name: 'يساوي',
      nextInput: [
        {
          key: 'value',
          visible: true,
          value: null,
          label: 'القيمة',
          dataType: 'float',
          required: true,
          options: [],
        },
        priorityMetadata,
      ],
    },
    {
      id: 3,
      name: 'أكبر أو يساوي',
      nextInput: [
        {
          key: 'value',
          visible: true,
          value: null,
          label: 'القيمة',
          dataType: 'float',
          required: true,
          options: [],
        },
        priorityMetadata,
      ],
    },
    {
      id: 4,
      name: 'أصغر أو يساوي',
      nextInput: [
        {
          key: 'value',
          visible: true,
          value: null,
          label: 'القيمة',
          dataType: 'float',
          required: true,
          options: [],
        },
        priorityMetadata,
      ],
    },
  ],
};
const categoryMetadata: OfferMetadataItem = {
  key: 'CategoryId',
  visible: true,
  value: null,
  label: 'الفئة',
  dataType: 'list',
  required: true,
  source: 'api/Category/GetAll/false',
  options: [],
};
const valueMetadata: OfferMetadataItem = {
  key: 'value',
  visible: true,
  value: null,
  label: 'القيمة',
  dataType: 'float',
  required: true,
  options: [],
};
const offerBenfintsobjs: OfferMetadataItem = {
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
                  options: [],
                },
              ],
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
                  options: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'على منتج ',
      nextInput: [
        productMetadata,
        {
          key: 'price',
          label: 'السعر الجديد',
          visible: true,
          value: null,
          dataType: 'int',
          required: true,
          options: [],
        },
        {
          key: 'quntity',
          label: 'الكمية',
          visible: true,
          value: null,
          dataType: 'int',
          required: true,
          options: [],
        },
      ],
    },
  ],
};
export const offerConditionsobjs: OfferMetadataItem = {
  key: 'offerType',
  visible: true,
  value: null,
  label: 'اختر نوع العرض:',
  dataType: 'list',
  required: true,
  addType: [
    {
      canRepeatOption: true,
      key: 'conditions',
      stepName: 'الشروط',
    },
    {
      canRepeatOption: true,
      key: 'benfints',
      stepName: 'النتائج',
    },
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
                    {
                      id: 0,
                      name: 'إجمالي سعر السلة',
                      nextInput: [operatorMetadata],
                    },
                    {
                      id: 1,
                      name: 'إجمالي كمية المنتجات',
                      nextInput: [operatorMetadata],
                    },
                    {
                      id: 2,
                      name: 'يحتوي على فئة',
                      nextInput: [categoryMetadata, priorityMetadata],
                    },
                    {
                      id: 3,
                      name: 'يحتوي على منتج',
                      nextInput: [productMetadata, priorityMetadata],
                    },
                    {
                      id: 5,
                      name: 'يحتوي على نوع منتج',
                      nextInput: [variantMetadata, priorityMetadata],
                    },
                    {
                      id: 4,
                      name: 'خصم عام (لا شروط)',
                      nextInput: [valueMetadata, priorityMetadata],
                    },
                  ],
                },
              ],
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
                    {
                      id: 0,
                      name: 'كمية منتج',
                      nextInput: [productMetadata, operatorMetadata],
                    },
                    {
                      id: 1,
                      name: 'يحتوي على نوع منتج',
                      nextInput: [variantMetadata, priorityMetadata],
                    },
                    {
                      id: 3,
                      name: 'كمية نوع منتج',
                      nextInput: [variantMetadata, operatorMetadata],
                    },
                  ],
                },
              ],
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
                  options: [
                    {
                      id: 0,
                      name: 'الطلب الأول للعميل',
                      nextInput: [priorityMetadata],
                    },
                  ],
                },
              ],
            },
          ],
        },
        offerBenfintsobjs,
      ],
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
          options: [
            {
              id: 0,
              name: 'كود الخصم',
              nextInput: [valueMetadata],
            },
          ],
        },
        offerBenfintsobjs,
      ],
    },
  ],
};
