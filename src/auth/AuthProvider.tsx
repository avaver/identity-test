import React, { FC, useContext } from 'react';
import { AuthContext } from './AuthContext';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import SigninCallback from './SigninCallback';
import SigninSilentCallback from './SigninSilentCallback';
import { useAuthProvider } from './useAuthProvider';
import { MultitenantUserManagerSettings } from './types';

const AuthProvider: FC<{ settings: MultitenantUserManagerSettings }> = ({ settings, children }) => {
  const { user, login, logout, callbackUrl, silentCallbackUrl } = useAuthProvider(settings);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <Route path={callbackUrl}>
          <SigninCallback />
        </Route>
        <Route path={silentCallbackUrl}>
          <SigninSilentCallback />
        </Route>
        <Route path="*">{children}</Route>
      </Router>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth called outside of AuthProvider');
  }
  return auth;
};
