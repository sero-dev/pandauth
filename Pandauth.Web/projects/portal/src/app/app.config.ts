import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './core/auth/auth.config';
import { PageTitleStategyService } from './core/services/page-title-strategy/page-title-stategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withInterceptorsFromDi()),
    provideAppInitializer(async () => {
      const oauthService = inject(OAuthService);
      oauthService.configure(authCodeFlowConfig);
      await oauthService.loadDiscoveryDocumentAndTryLogin();
    }),
    provideOAuthClient({
      resourceServer: {
        sendAccessToken: true,
        allowedUrls: ['https://localhost:7046/api/books'],
      },
    }),
    {
      provide: TitleStrategy,
      useClass: PageTitleStategyService,
    },
  ],
};
