import React, { useState, useEffect, useRef } from 'react';
import { createBrowserHistory } from 'history';
import { RouterContext } from '../Context';

import { RouterProps, RouterState } from '../types';
import Path from '../PathUtils';

export const Router: React.FC<RouterProps> = props => {
  const history = useRef<any>(null);
  const initialState: RouterState = {
    location: '',
    params: {},
    context: {},
    routes: props.routes,
    routedElement: null
  };

  const [state, setState] = useState(initialState);

  const setLocation = (location: string) => {
    if (state.location !== location) {
      history.current.push(location);
    }
  };

  const setContext = (context: Object) => {
    setState({
      ...state,
      context: Object.assign(state.context, context)
    });
  };

  useEffect(() => {
    history.current = createBrowserHistory();
    setState({
      ...state,
      location: history.current.location.pathname
    });

    const unlisten = history.current.listen((location: any) => {
      setState({
        ...state,
        location: location.pathname
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
      if (route.guards) {
        for (const guard of route.guards) {
          if (
            !guard.middleware({
              location: state.location,
              setLocation,
              setContext,
              context: state.context,
              params: state.params,
              component: state.routedElement
            })
          ) {
            setState({
              ...state,
              routedElement: guard.fallback
            });
            return;
          }
        }
      }

      setState({
        ...state,
        params: Path.parse(route.path, state.location),
        routedElement: route.component
      });
    }
  }, [state.location]);

  return (
    <RouterContext.Provider
      value={{
        location: state.location,
        context: state.context,
        setLocation: setLocation,
        setContext: setContext,
        params: state.params,
        component: state.routedElement
      }}
    >
      {props.children}
    </RouterContext.Provider>
  );
};
