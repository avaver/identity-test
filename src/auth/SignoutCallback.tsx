import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getUserManager } from './oidc';

const SignoutCallback = () => {
  const history = useHistory();

  useEffect(() => {
    console.debug('signout callback called');
    const manager = getUserManager();
    manager
      .signoutRedirectCallback()
      .then((data) => {
        console.debug(data);
        console.debug(`signout completed successfully, state: ${data.state}`);
        console.debug(`redirecting to tenant "${data.state}"`);
        history.push(data.state ? `/?tenant=${data.state}` : '/');
      })
      .catch(async (error) => {
        console.warn('signout callback failed: ' + error.error);
      });
  }, [history]);
  return <></>;
};

export default SignoutCallback;
