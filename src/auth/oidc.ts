import { UserManager, Log, UserManagerSettings } from 'oidc-client';

Log.logger = console;
Log.level = Log.INFO;

let userManager: UserManager;

export const init = (config: UserManagerSettings) => {
  if (!userManager) {
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

export const oidcLogin = async (tenant: string, username?: string) => {
  console.debug('oidcLogin called');
  const manager = getUserManager();
  const user = await manager.getUser();
  const returnUrl = getCurrentUrl();
  if (!user) {
    console.debug('user not found, logging in');
    await manager.signinRedirect({ acr_values: `tenant:${tenant}`, login_hint: username, data: { returnUrl } });
  } else {
    console.debug(`current user: ${user?.profile.name ?? user?.profile.sub}, trying silent login`);
    oidcLoginSilent(tenant);
  }
};

export const oidcForceLogin = async (tenant: string, username?: string) => {
  console.debug('oidcForceLogin called');
  const manager = getUserManager();
  const returnUrl = getCurrentUrl();
  await manager.signinRedirect({
    acr_values: `tenant:${tenant}`,
    login_hint: username,
    prompt: 'login',
    data: { returnUrl },
  });
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
