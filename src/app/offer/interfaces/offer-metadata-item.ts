import { InputDynamic } from '../../shared/interface/input-dynamic';

export interface OfferMetadataItem extends InputDynamic {
  options: { id: any; name: any; nextInput?: OfferMetadataItem[] }[];
  source?: string;
  addType?: { canRepeatOption: boolean; stepName: string; key: string }[];
}
