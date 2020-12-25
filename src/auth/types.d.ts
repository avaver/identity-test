import { UserManagerSettings } from 'oidc-client';

export interface MultitenantUserManagerSettings extends UserManagerSettings {
  tenantClaim: string;
  resolveTenant: () => string;
}

export type User = {
  id: string;
  tenant: string;
  token: string;
  name?: string;
  email?: string;
};
