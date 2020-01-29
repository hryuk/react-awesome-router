import React from 'react';
import './App.css';
import logo from './logo.svg';
import {Routes, useLocation} from 'react-awesome-router';

const App: React.FC = () => {
  const {location, context, setLocation, setContext} = useLocation();

  const login = () => {
    setContext({auth: {logued: true, username: 'notadmin'}});
    //Optional, force refresh on login
    setLocation(location);
  };

  const logout = () => {
    setContext({auth: {logued: false, username: ''}});
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="navbar">
          <button onClick={() => setLocation('/')}>Index</button>
          <button onClick={() => setLocation('/private')}>Private Route</button>
          <button onClick={() => setLocation('/route3/hello/world')}>Param Route</button>
          <button onClick={() => setLocation('/admin')}>Admin</button>
          {context?.auth?.logued ? (
            <button className="logout" onClick={() => logout()}>
              Logout
            </button>
          ) : (
            <button className="login" onClick={() => login()}>
              Login
            </button>
          )}
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <Routes />
      </header>
    </div>
  );
};

export default App;
