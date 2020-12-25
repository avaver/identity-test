import { MultitenantUserManagerSettings } from './auth/types';

const config: MultitenantUserManagerSettings = {
  authority: 'https://localhost:5001/',
  client_id: 'dentalsuite.web',
  redirect_uri: `${window.location.origin}/authentication/callback`,
  silent_redirect_uri: `${window.location.origin}/authentication/silentcallback`,
  response_type: 'code',
  scope: 'openid profile dentalsuite.api',
  post_logout_redirect_uri: window.location.origin,
  automaticSilentRenew: true,
  revokeAccessTokenOnSignout: true,
  checkSessionInterval: 5000,
  tenantClaim: 'tenant',
  resolveTenant: () => window.location.hostname.substr(0, window.location.hostname.indexOf('.')),
};

export default config;
