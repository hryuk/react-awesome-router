import React, { useState, useEffect, useRef } from 'react';
import { createBrowserHistory, History } from 'history';
import { RouterContext } from '../Context';

import { Route } from '../types';
import Path from '../PathUtils';

export interface RouterState {
  location: string;
  params: Object;
  routes: Array<Route>;
  context: Object;
  forceRefresh: number;
  routedElement: React.ReactNode | undefined;
}

export interface IRouterProps {
  routes: Array<Route>;
}

export const Router: React.FC<IRouterProps> = props => {
  const history = useRef<History | undefined>(undefined);
  const initialState: RouterState = {
    location: '',
    params: {},
    context: {},
    routes: props.routes,
    routedElement: undefined,
    forceRefresh: 0
  };

  const [state, setState] = useState(initialState);

  const setLocation = (location: string) => {
    if (state.location !== location) {
      history.current?.push(location);
    } else {
      setState({
        ...state,
        forceRefresh: state.forceRefresh + 1
      });
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

    const unlisten = history.current.listen(location => {
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
      let guardReturn = undefined;

      if (route.guards) {
        for (const guard of route.guards) {
          guardReturn = guard({
            location: state.location,
            setLocation,
            setContext,
            context: state.context,
            params: state.params,
          }, () => undefined);
          if (guardReturn) break;
        }
      }

      setState({
        ...state,
        params: Path.parse(route.path, state.location),
        routedElement: guardReturn ?? route.component
      });

    }



  }, [state.location, state.forceRefresh]);

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
