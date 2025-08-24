export interface User {
  id?: number;
  userName: string;
  email: string;
  name: string;
  phoneNumber: string;
  commercialRegistrationNumber: string;
  address: string;
  isActive?: boolean;
  companyLogos: string[];
  password: string;
  role: 'company' | 'client' | 'distributor' | 'owner';
}
