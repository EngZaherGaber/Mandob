import { inject, makeStateKey, PLATFORM_ID } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UserStateService } from '../../general/services/user-state.service';
import { map, of, switchMap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
const IS_AUTHORIZED_KEY = makeStateKey<boolean>('isAuthorized');

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const userState = inject(UserStateService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    // On server: don’t block rendering, just allow navigation
    return of(true);
  }
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
