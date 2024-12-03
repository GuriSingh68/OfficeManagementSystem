import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
// import '@ionic/react/css/core.css';
import "./styles/tailwind.css"


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>
    
  </React.StrictMode>
  
);