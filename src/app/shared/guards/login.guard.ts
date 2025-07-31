import { CanActivateChildFn } from '@angular/router';

export const loginGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
