import { ApplicationConfig, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService, MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from '../../public/theme';
import { routes } from './app.routes';
import { ClientStrategy } from './client/classes/client-strategy';
import { CompanyStrategy } from './company/classes/company-strategy';
import { DistributorStrategy } from './distributor/classes/distributor-strategy';
import { authInterceptor } from './general/interceptor/auth.interceptor';
import { UserStateService } from './general/services/user-state.service';
import { OwnerStrategy } from './owner/classes/owner-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('YOUR_GOOGLE_CLIENT_ID'),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('YOUR_FACEBOOK_APP_ID'),
          },
        ],
        onError: (err) => console.error(err),
      } as SocialAuthServiceConfig,
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    MessageService,
    UserStateService,
    CompanyStrategy,
    ClientStrategy,
    DistributorStrategy,
    OwnerStrategy,
    ConfirmationService,
    provideAppInitializer(() => {}),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
