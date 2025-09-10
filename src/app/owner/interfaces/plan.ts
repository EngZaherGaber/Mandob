import { User } from '../../general/interfaces/user';

export interface Plan {
  planID: number;
  planName: string;
  price: number;
  maxRequestsPerMonth: number;
  maxDistributors: number;
  priorityWeight: number;
  hasAdsFeature: boolean;
  hasMonthlyNotifications: boolean;
  createdAt: Date;
  updatedAt: Date;
}
