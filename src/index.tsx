import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import AuthProvider from './auth/AuthProvider';
import config from './authConfig';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider settings={config}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
