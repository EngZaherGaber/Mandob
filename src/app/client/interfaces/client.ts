import { User } from '../../general/interfaces/user';

export interface Client extends User {
  address: string;
  commercialRegistrationNumber: string;
}
