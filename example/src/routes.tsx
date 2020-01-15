import React from 'react';

import Route1 from './Components/Route1';
import Route2 from './Components/Route2';
import Route3 from './Components/Route3';
import Unauthorized from './Components/Unauthorized';

import { IRouter, IGuard } from 'react-awesome-router';

const authGuard: IGuard = {
  middleware: (router: IRouter) => {
    const authenticated = !!router.context?.auth?.logued;
    return authenticated;
  },

  fallback: <Unauthorized />
};

export const routes = [
  {
    path: '/',
    component: <Route1 />
  },
  {
    path: '/private',
    component: <Route2 />,
    guards: [authGuard]
  },
  {
    path: '/route3/:param1/:param2',
    component: <Route3 />
  },
  {
    path: '/unauthorized',
    component: <Unauthorized />
  }
];
