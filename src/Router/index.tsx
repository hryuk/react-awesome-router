import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createBrowserHistory, History } from 'history';
import { RouterContext } from '../Context';

import { Route, Router as IRouter } from '../types';
import Path from '../PathUtils';

export interface IRouterProps {
  routes: Array<Route>;
  children: React.ReactNode
}

const browserHistory = createBrowserHistory()

const getComponentFromRoute = (route: Route, router: IRouter) => {
  let guardReturn: React.ReactNode = undefined;

  if (route.guards) {
    let nexted = false;
    for (const guard of route.guards) {
      guardReturn = guard(router, () => {
        nexted = true
        return undefined
      })
      if (!nexted && guardReturn) break
    }
  }

  return guardReturn ?? route.component
}

export const Router = ({ routes, children }: IRouterProps) => {
  const [location, setLocation] = useState<string>(browserHistory.location.pathname)
  const [context, setContext] = useState<object>({})

  // Listen to location changes
  useEffect(() => {
    browserHistory.listen(update => {
      setLocation(update.location.pathname);
    });
  }, []);

  const route = routes.find(route => Path.match(route.path, location));

  if (!route) {
    console.error(`Current location ${location} did not match any defined route`)
    return null;
  }

  const params = Path.parse(route.path, location)
  const component = getComponentFromRoute(route, { location, setLocation, context, setContext, params })

  return (
    <RouterContext.Provider
      value={{
        params,
        location,
        setLocation,
        context,
        setContext,
        component
      }}
    >
      {children}
    </RouterContext.Provider>
  )
}
