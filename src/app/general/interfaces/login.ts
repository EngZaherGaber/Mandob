export interface loginResponse {
  name: string;
  role: 'client' | 'company' | 'distributor' | 'owner';
  isVerified: boolean;
}
