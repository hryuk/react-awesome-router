import React from 'react';
import { Router } from 'react-awesome-router';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { routes } from './routes';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Router routes={routes}>
    <App />
  </Router>  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
