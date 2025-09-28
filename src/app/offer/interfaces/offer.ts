export interface Offer {
  id: number;
  name: string;
  description: string;
  rule: string;
  action: string;
  startDate: Date;
  endDate: Date;
  isActive: true;
  code: string;
  priority: number;
}
