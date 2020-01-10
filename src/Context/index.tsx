import React from 'react';

export const RouterContext = React.createContext({
  location: '',
  setLocation: (location: string) => {}
});
