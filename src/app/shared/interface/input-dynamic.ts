import { FormGroup } from '@angular/forms';
import { DynamicAttributeService } from '../service/dynamic-attribute.service';

export interface InputDynamic {
  id?: number;
  key: string;
  value: any;
  label: string;
  desc?: string;
  dataType: string;
  Max?: number;
  lang?: 'en' | 'ar';
  required?: boolean;
  options: any[];
  startValidation?: boolean;
  command?: (
    event?: any,
    element?: InputDynamic,
    form?: FormGroup,
    objs?: any,
    isListenAgain?: DynamicAttributeService
  ) => void;
  visible: boolean;
  source$?: string;
}
