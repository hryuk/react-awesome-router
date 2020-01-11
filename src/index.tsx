import React, {useState, useEffect, useRef} from 'react';
import {createBrowserHistory} from 'history';
import {RouterContext} from './Context';

import {RouterProps, RouterState} from './types';
import Path from './PathUtils';
import {useLocation as _useLocation} from './Hooks/useLocation';
export const useLocation = _useLocation;

export const Router: React.FC<RouterProps> = props => {
  const history = useRef<any>(null);
  const initialState: RouterState = {
    location: '',
    params: {},
    routes: props.routes,
    routedElement: null
  };

  const [{location, params, routes, routedElement}, setState] = useState(initialState);

  const setLocation = (location: string) => {
    history.current.push(location);
  };

  useEffect(() => {
    history.current = createBrowserHistory();
    setState({
      location: history.current.location.pathname,
      params,
      routes,
      routedElement
    });

    const unlisten = history.current.listen((location: any, action: any) => {
      setState({
        location: location.pathname,
        params,
        routes,
        routedElement
      });
    });

    return () => {
      unlisten();
    };
  }, []);

  useEffect(() => {
    let route = routes.find(route => {
      return Path.match(route.path, location);
    });

    if (route) {
      const parsedParams = Path.parse(route.path, location);

      setState({
        location,
        params: parsedParams,
        routes,
        routedElement: route.component
      });
    }
  }, [location]);

  return (
    <RouterContext.Provider value={{location: location, setLocation: setLocation, params: params}}>
      {routedElement}
    </RouterContext.Provider>
  );
};
