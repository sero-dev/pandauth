import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://127.0.0.1:9000/realms/master',
  requireHttps: false,
  redirectUri: window.location.origin + '/login',
  clientId: 'pandauth-api',
  responseType: 'code',
  scope: 'openid profile email',
  useSilentRefresh: true,
  showDebugInformation: true,
};
