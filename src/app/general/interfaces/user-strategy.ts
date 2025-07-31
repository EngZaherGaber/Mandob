import { User } from './user.model';

export interface UserStrategy {
  handlePostLogin(user: User): void;
}
