import './App.css';
import { useAuth } from './auth/AuthProvider';
import config from './authConfig';

function App() {
  const { user, login, logout } = useAuth();

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ padding: '20px' }}>
          User: {user ? user.id + ' (' + user.name + ' @ ' + user.tenant + ')' : 'N/A'}
        </div>
        {user ? (
          <button onClick={() => logout()}>Logout</button>
        ) : (
          <button onClick={() => login(config.resolveTenant())}>Login to {config.resolveTenant()}</button>
        )}
      </header>
    </div>
  );
}

export default App;
