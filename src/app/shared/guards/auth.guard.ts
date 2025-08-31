import { inject, makeStateKey } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UserStateService } from '../../general/services/user-state.service';
import { map, of, switchMap } from 'rxjs';
const IS_AUTHORIZED_KEY = makeStateKey<boolean>('isAuthorized');

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const userState = inject(UserStateService);
  const router = inject(Router);

  return userState.checkUser().pipe(
    switchMap((isLoggedIn) => {
      if (isLoggedIn) {
        return of(true);
      } else {
        return of(router.createUrlTree(['/auth/login']));
      }
    })
  );
};
