import { useEffect } from 'react';
import { getUserManager } from './oidc';

const SigninSilentCallback = () => {
  useEffect(() => {
    console.debug('signin silent callback called');
    const manager = getUserManager();
    manager
      .signinSilentCallback()
      .then((user) => {
        console.debug(`signin silent completed successfully, user: ${user?.profile.name}`);
      })
      .catch((error) => {
        console.warn('signin silent callback failed: ' + error.error);
      });
  }, []);
  return <></>;
};

export default SigninSilentCallback;
