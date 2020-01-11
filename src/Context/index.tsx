import React from 'react';

export const RouterContext = React.createContext({
  location: '',
  params: {},
  setLocation: (location: string) => {}
});
