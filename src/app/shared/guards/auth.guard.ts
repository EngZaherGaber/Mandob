import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { UserStateService } from '../../general/services/user-state.service';

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
        const role = userState.role();
        const targetUrl = `/${role}`;

        // ✅ Prevent infinite loop: only redirect if not already on the correct role route
        if (!state.url.startsWith(targetUrl)) {
          return of(router.createUrlTree([targetUrl]));
        }

        return of(true); // allow navigation
      } else {
        return of(router.createUrlTree(['/auth/login']));
      }
    }),
  );
};
