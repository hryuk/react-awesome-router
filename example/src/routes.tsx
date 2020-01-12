import React from 'react';
import Route1 from './Components/Route1';
import Route2 from './Components/Route2';
import Route3 from './Components/Route3';

export const routes = [
  {
    path: '/',
    component: <Route1 />
  },
  {
    path: '/route2',
    component: <Route2 />
  },
  {
    path: '/route3/:children',
    component: <Route3 />
  }
];
