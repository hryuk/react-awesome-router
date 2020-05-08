import React from 'react';
import { Guard, Route } from 'react-awesome-router';

import Route1 from './Components/Route1';
import Route2 from './Components/Route2';
import Route3 from './Components/Route3';
import Unauthorized from './Components/Unauthorized';

const authGuard: Guard = (router, next) => {
  const authenticated = !!router.context?.auth?.logued;
  if (authenticated) {
    return next();
  } else {
    return <Unauthorized />;
  }
};

const adminGuard: Guard = (router, next) => {
  const isAdmin = !!(router.context?.auth?.username === 'admin');
  if (isAdmin) {
    next();
  } else {
    return <Unauthorized />;
  }
};

export const routes: Array<Route> = [
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
