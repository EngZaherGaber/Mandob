import { inject, Inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UserStateService } from '../../general/services/user-state.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const userState = inject(UserStateService);
  const router = inject(Router);

  const isUserOK = userState.checkUser(); // sync or async

  if (isUserOK) {
    return true;
  }

  // Redirect by returning UrlTree
  return router.createUrlTree(['/auth/login'], {
    queryParams: { returnUrl: state.url },
  });
};
