import { Company } from '../../company/interfaces/company';
import { Distributor } from '../../distributor/interfaces/distributor';
import { Client } from './client';

export interface Return {
  returnRequestID: number;
  requestID: number;
  userID: number;
  returnStatusID: number;
  returnStatusName: string;
  requestDate: Date;
  totalRefundAmount: number;
  isApprovedByCompany: boolean;
  notes: string;
  client?: Client;
  distributor?: Distributor;
  company?: Company;
  items: [
    {
      returnRequestItemID: number;
      requestItemID: number;
      productVariantID: number;
      productName: string;
      variantName: string;
      quantity: number;
      reason: string;
      refundPricePerUnit: number;
      totalItemRefundAmount: number;
    },
  ];
}
