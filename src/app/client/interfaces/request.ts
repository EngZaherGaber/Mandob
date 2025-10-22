import { Company } from '../../company/interfaces/company';
import { Distributor } from '../../distributor/interfaces/distributor';
import { ReviewSubmit } from '../../review/interfaces/review-submit';
import { Client } from './client';
import { RequestItem } from './request-item';

export interface Request {
  requestID: number;
  userID: number;
  requestDate: Date;
  status: string;
  companyName: string;
  partialOrderPreference: string;
  requestItems: RequestItem[];
  client?: Client;
  distributor?: Distributor;
  company?: Company;
  reviews: ReviewSubmit | null;
}
