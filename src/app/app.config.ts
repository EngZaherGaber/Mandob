import { ApplicationConfig, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from '../../public/theme';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';
import { UserStateService } from './general/services/user-state.service';
import { CompanyStrategy } from './company/classes/company-strategy';
import { ClientStrategy } from './client/classes/client-strategy';
import { DistributorStrategy } from './distributor/classes/distributor-strategy';
import { AdminStrategy } from './admin/classes/admin-strategy';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { authInterceptor } from './general/interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
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
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    MessageService,
    UserStateService,
    CompanyStrategy,
    ClientStrategy,
    DistributorStrategy,
    AdminStrategy,
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
