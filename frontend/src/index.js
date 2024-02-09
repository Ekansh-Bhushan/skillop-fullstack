import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContextProvider from './context/MainContextProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MainContextProvider>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </MainContextProvider>
);
