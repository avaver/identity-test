import { MultitenantUserManagerSettings } from './auth/types';

const config: MultitenantUserManagerSettings = {
  authority: 'https://authd1.dentalsuite.io/',
  client_id: 'dentalsuite.client.web',
  scope: 'openid dentalsuite.scope.profile dentalsuite.scope.api',
  response_type: 'code',
  redirect_uri: `${window.location.origin}/auth/login`,
  silent_redirect_uri: `${window.location.origin}/auth/loginsilent`,
  post_logout_redirect_uri: `${window.location.origin}/auth/logout`,
  automaticSilentRenew: true,
  revokeAccessTokenOnSignout: true,
  checkSessionInterval: 5000,
  tenantClaim: 'tenant',
  resolveTenant: () =>
    window.location.hostname.substr(0, window.location.hostname.indexOf('.')) ||
    new URLSearchParams(window.location.search).get('tenant') ||
    '__local',
};

export default config;
