import React from 'react';
import {IRouter, IGuard, IRoute} from 'react-awesome-router';

import Route1 from './Components/Route1';
import Route2 from './Components/Route2';
import Route3 from './Components/Route3';
import Unauthorized from './Components/Unauthorized';

const authGuard: IGuard = {
  middleware: (router: IRouter) => {
    const authenticated = !!router.context?.auth?.logued;
    return authenticated;
  },
  fallback: <Unauthorized />
};

const adminGuard: IGuard = {
  middleware: (router: IRouter) => {
    const isAdmin = !!(router.context?.auth?.username === 'admin');
    return isAdmin;
  },
  fallback: <Unauthorized />
};

export const routes: Array<IRoute> = [
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
    path: '/admin',
    component: <Route3 />,
    guards: [authGuard, adminGuard]
  }
];
