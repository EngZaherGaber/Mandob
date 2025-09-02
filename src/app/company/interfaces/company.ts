import { User } from '../../general/interfaces/user';

export interface Company extends User {
  companyName: string;
  companyDescription: string;
  createdBy: string;
  commercialRegistrationNumber: string;
  address: string;
  planName: string;
  planId: number;
}
