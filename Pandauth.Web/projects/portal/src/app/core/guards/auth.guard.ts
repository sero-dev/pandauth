import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export const AuthGuard: CanActivateChildFn = () => {
  const oauthService = inject(OAuthService);
  const router = inject(Router);

  const isLoggedIn = oauthService.hasValidAccessToken() && oauthService.hasValidIdToken();

  if (!isLoggedIn) {
    return router.navigateByUrl('/login');
  }

  return true;
};
