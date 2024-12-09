import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ContextPovider } from './UserContext/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextPovider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ContextPovider>
);


