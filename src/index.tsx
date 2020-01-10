import React, { useState, useEffect, useRef } from 'react';
import { createBrowserHistory } from 'history';
import { RouterContext } from './Context';
import { useLocation as _useLocation } from './Hooks/useLocation';

interface RouterProps {
    routes: Array<Route>
}

interface Route {
    path: string,
    action: (state: Object) => JSX.Element
}
interface RouterState {
    location: string;
    routes: Array<Route>;
    routedElement: JSX.Element | null;
}

export const Router: React.FC<RouterProps> = (props) => {
    const history = useRef(createBrowserHistory());

    const [{ location, routes, routedElement }, setState] = useState<RouterState>({
        location: history.current.location.pathname,
        routes: props.routes,
        routedElement: null
    });

    const unlisten = useRef(history.current.listen((location, action) => {
        setState({
            location: location.pathname,
            routes,
            routedElement
        });
    }));

    const setLocation = (location: string) => {
        history.current.push(location);
    }

    useEffect(() => {

        let route = routes.find((rt) => {
            return rt.path === location;
        });

        if (route) {
            setState({
                location,
                routes,
                routedElement: route.action({})
            })
        }

        return () => {
            unlisten.current();
        }
    }, [location]);

    return (
        <RouterContext.Provider value={{ location: location, setLocation: setLocation }}>
            {routedElement}
        </RouterContext.Provider>
    )
}

export const useLocation = _useLocation;