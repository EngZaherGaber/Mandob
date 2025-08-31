import { User } from '../../general/interfaces/user';

export interface Company extends User {
  companyDescription: string;
  createdBy: string;
  commercialRegistrationNumber: string;
  address: string;
  planName: boolean;
  companyImages: string[];
}
