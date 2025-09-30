import { InputDynamic } from '../../shared/interface/input-dynamic';

export interface OfferMetadataItem extends InputDynamic {
  options: { id: any; name: any; nextInput?: OfferMetadataItem[] }[];
  source?: { url: string; method: 'Get' | 'post' };
  addType?: { canRepeatOption: boolean; stepName: string; key: string }[];
}
