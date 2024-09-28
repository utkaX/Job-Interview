import React from 'react'; // Make sure to import React
import { createRoot } from 'react-dom/client';
import './index.css';
import Main from './App.jsx';
import { AuthProvider } from './context/authContext';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <Main />
    </React.StrictMode>
  </AuthProvider>
);
