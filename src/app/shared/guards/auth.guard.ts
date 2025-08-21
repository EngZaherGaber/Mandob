import { inject, Inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UserStateService } from '../../general/services/user-state.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const userState: UserStateService = inject(UserStateService);
  const router: Router = inject(Router);
  if (userState.checkUser()) return true;
  else router.navigate(['auth/login']);
  return false;
};
