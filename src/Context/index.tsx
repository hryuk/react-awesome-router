import React from 'react';

export const RouterContext = React.createContext({
  location: '',
  params: {},
  component: null as JSX.Element | null,
  setLocation: (location: string) => {}
});
