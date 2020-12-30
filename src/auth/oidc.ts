import { UserManager, Log, UserManagerSettings } from 'oidc-client';
import { MultitenantUserManagerSettings } from './types';

Log.logger = console;
Log.level = Log.INFO;

let userManager: UserManager;
let settings: MultitenantUserManagerSettings;

export const init = (config: UserManagerSettings) => {
  if (!userManager) {
    settings = config as MultitenantUserManagerSettings;
    userManager = new UserManager(config);
    console.debug('UserManager initialized');
  }
  return userManager;
};

export const getUserManager = () => {
  if (!userManager) {
    throw new Error('UserManager is not initialized');
  }
  return userManager;
};

export const oidcLogin = async (username?: string) => {
  console.debug('oidcLogin called');
  const manager = getUserManager();
  const returnUrl = getCurrentUrl();
  const tenant = settings?.resolveTenant();

  const args: any = {
    data: { returnUrl },
    ...(tenant && { acr_values: `tenant:${tenant}` }),
    ...(username && { login_hint: username }),
  };

  await manager.signinRedirect(args);
};

export const oidcLoginSilent = async (tenant: string) => {
  console.debug('oidcLoginSilent called');
  const manager = getUserManager();
  const user = await manager.getUser();
  if (user && user.expired) {
    console.debug('user expired, trying silent login');
    try {
      await manager.signinSilent();
    } catch (error) {
      console.warn(error);
      console.debug(`error during silent signin: ${error}`);
      console.debug('removing user and trying normal login');
      await manager.removeUser();
      oidcLogin(tenant);
    }
  }
};

export const oidcLogout = async () => {
  console.debug('oidcLogout called');
  const manager = getUserManager();
  const user = await manager.getUser();
  console.debug(`current user: ${user?.profile.name ?? user?.profile.sub}`);
  await manager.signoutRedirect();
};

const getCurrentUrl = () => window.location.pathname + window.location.search + window.location.hash;
