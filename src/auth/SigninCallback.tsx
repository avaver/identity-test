import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getUserManager } from './oidc';

const SigninCallback = () => {
  const history = useHistory();

  useEffect(() => {
    console.debug('signin callback called');
    const manager = getUserManager();
    manager
      .signinRedirectCallback()
      .then((user) => {
        console.debug(`signin completed successfully, user: ${user?.profile.name}`);
        console.debug('redirecting to ' + user.state.returnUrl);
        history.push(user.state.returnUrl ?? '/');
      })
      .catch(async (error) => {
        console.warn('signin callback failed: ' + error.error);
      });
  }, [history]);
  return <></>;
};

export default SigninCallback;
