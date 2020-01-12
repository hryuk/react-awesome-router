import React from 'react';
import './App.css';
import logo from './logo.svg';
import {Routes, useLocation} from 'react-awesome-router';

const App: React.FC = () => {
  const {setLocation} = useLocation();

  return (
    <div className="App">
      <header className="App-header">
        <div className="navbar">
          <button onClick={() => setLocation('/')}>Index</button>
          <button onClick={() => setLocation('/route2')}>Route 2</button>
          <button onClick={() => setLocation('/route3/test')}>Route3</button>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <Routes />
      </header>
    </div>
  );
};

export default App;
