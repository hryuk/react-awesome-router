import React, {useState, useEffect, useRef} from 'react';
import {createBrowserHistory} from 'history';
import {RouterContext} from './Context';

import {RouterProps, RouterState} from './types';
import Path from './PathUtils';
import {useLocation as _useLocation} from './Hooks/useLocation';
export const useLocation = _useLocation;

export const Router: React.FC<RouterProps> = props => {
  const history = useRef(createBrowserHistory());

  const initialState: RouterState = {
    location: history.current.location.pathname,
    params: {},
    routes: props.routes,
    routedElement: null
  };

  const [{location, params, routes, routedElement}, setState] = useState(initialState);

  const unlisten = useRef(
    history.current.listen(location => {
      setState({
        location: location.pathname + location.search + location.hash,
        params,
        routes,
        routedElement
      });
    })
  );

  const setLocation = (location: string) => {
    history.current.push(location);
  };

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

    return () => {
      unlisten.current();
    };
  }, [location]);

  return (
    <RouterContext.Provider value={{location: location, setLocation: setLocation, params: params}}>
      {routedElement}
    </RouterContext.Provider>
  );
};
