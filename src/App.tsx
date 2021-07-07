import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from './auth/AuthProvider';
import config from './authConfig';

function App() {
  const [tenant, setTenant] = useState('');
  const { user, login, logout } = useAuth();

  const loginLogout = () => {
    if (user) logout();
    else login();
  };

  useEffect(() => {
    setTenant(config.resolveTenant());
    document.title = tenant + ' | DentalSuite Nexta';
  }, [tenant, user]);

  return (
    <div className="text-center content-center-outer">
      <div className="content-center-inner">
        <h1 className="h2 mb-5">Welcome to {tenant}</h1>
        {user && (
          <h1 className="h5 mb-3">
            You are currently logged in as <span className="text-success">{user.name}</span>
          </h1>
        )}
        {user ? (
          <div className="row">
            <div className="col">
              <button className="btn btn-dark" onClick={() => loginLogout()}>
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <button className="btn btn-dark" onClick={() => loginLogout()}>
            Sign in
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
