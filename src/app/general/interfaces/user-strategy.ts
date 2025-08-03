import { MenuItem } from 'primeng/api';
import { User } from './user.model';

export interface UserStrategy {
  getNavMenu(role:string):MenuItem[];
}
