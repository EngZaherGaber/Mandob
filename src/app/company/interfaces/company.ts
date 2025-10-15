import { User } from '../../general/interfaces/user';

export interface Company extends User {
  companyName: string;
  companyDescription: string;
  createdBy: string;
  commercialRegistrationNumber: string;
  currencyID: number;
  currencyName: string;
  address: string;
  planName: string;
  planId: number;
  planStartDate: Date;
  planEndDate: Date;
}
