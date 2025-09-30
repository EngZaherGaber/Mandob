import { OfferMetadataItem } from '../../offer/interfaces/offer-metadata-item';

export const offerAddobjs: OfferMetadataItem = {
  key: 'offerType',
  value: null,
  visible: true,
  label: 'اختر نوع العرض:',
  desc: 'اختر ما إذا كان العرض تلقائيًا أم يتم تفعيله بكود خصم.',
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
  options: [],
};
