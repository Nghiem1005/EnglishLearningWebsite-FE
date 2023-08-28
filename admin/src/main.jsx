import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { AuthProvider } from './contexts/authProvider';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <AuthProvider>
      <App />
      </AuthProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
