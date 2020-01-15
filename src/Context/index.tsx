import React from 'react';

export const RouterContext = React.createContext({
  location: '',
  context: {} as any,
  params: {},
  component: null as JSX.Element | null,
  setLocation: (location: string) => {},
  setContext: (context: Object) => {}
});
