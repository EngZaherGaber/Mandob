export interface User {
  id?: number;
  username: string;
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
