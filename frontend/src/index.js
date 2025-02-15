import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GrievancesContextProvider } from './context/GrievanceContext'; // Update the context provider import
import { AuthContextProvider } from './context/AuthContext';
import "./style.css"

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GrievancesContextProvider> {/* Update to use GrievancesContextProvider */}
        <App />
      </GrievancesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
