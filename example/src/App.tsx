import React from 'react';
import './App.css';

import { Router } from 'react-awesome-router'

import Route1 from './Components/Route1';
import Route2 from './Components/Route2';

const App: React.FC = () => {

  const routes = [
    {
      path: '/',
      action: () => <Route1 />
    },
    {
      path: '/route2',
      action: () => <Route2 />
    },
  ]

  return (
    <div className="App">
      <Router routes={routes} />
    </div>
  );
}

export default App;