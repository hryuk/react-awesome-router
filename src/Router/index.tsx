import React, {useState, useEffect, useRef} from 'react';
import {createBrowserHistory} from 'history';
import {RouterContext} from '../Context';

import {RouterProps, RouterState} from '../types';
import Path from '../PathUtils';

export const Router: React.FC<RouterProps> = props => {
  const history = useRef<any>(null);
  const initialState: RouterState = {
    location: '',
    params: {},
    routes: props.routes,
    routedElement: null
  };

  const [state, setState] = useState(initialState);

  const setLocation = (location: string) => {
    if (state.location !== location) {
      history.current.push(location);
    }
  };

  useEffect(() => {
    history.current = createBrowserHistory();
    setState({
      location: history.current.location.pathname,
      params: state.params,
      routes: state.routes,
      routedElement: state.routedElement
    });

    const unlisten = history.current.listen((location: any, action: any) => {
      setState({
        location: location.pathname,
        params: state.params,
        routes: state.routes,
        routedElement: state.routedElement
      });
    });

    return () => {
      unlisten();
    };
  }, []);

  useEffect(() => {
    let route = state.routes.find(route => {
      return Path.match(route.path, state.location);
    });

    if (route) {
      const parsedParams = Path.parse(route.path, state.location);

      setState({
        location: state.location,
        params: parsedParams,
        routes: state.routes,
        routedElement: route.component
      });
    }
  }, [state.location]);

  return (
    <RouterContext.Provider
      value={{
        location: state.location,
        setLocation: setLocation,
        params: state.params,
        component: state.routedElement
      }}
    >
      {props.children}
    </RouterContext.Provider>
  );
};
