# React Awesome Router (WIP! big breaking changes comming in the following days)

A simple, lightweight, middleware oriented router for react applications.

## Motivation

Comming from non-react world, routing throgh JSX components feels annoying to me. I don't like to spread the routing logic between different react components or write JSX components to extend router capabilities (like auth). I also missed other features I enjoy and was used to like [Angular guards](https://angular.io/api/router/CanActivate) and [Koa](https://github.com/koajs/koa) middleware based architecture.

When starting with react hooks, I realized how simple it will be to write a react router with hooks, [history.js](https://github.com/ReactTraining/history) and [path-to-regexp](https://github.com/pillarjs/path-to-regexp); indeed I think the whole module is far below 200 lines of code. This module provides basic routing features to small applications, and allows more advanced features on bigger applications through the use of custom ad-hoc middlewares.

## Installation (not published yet)

```bash
npm i react-awesome-router --save
```

## Getting started

First, wrap the component you want to enable router on with the router component.

```jsx
import {Router} from 'react-awesome-router';
import {routes} from './routes';

ReactDOM.render(
  <Router routes={routes}>
    <App />
  </Router>,
  document.getElementById('root')
);
```

Then, use Routes component where you want the routes to be rendered:

```jsx
const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Routes />
      </header>
    </div>
  );
};
export default App;
```

Routes are defined as an array of routes. A route is an object with a path and a JSX Component that will be rendered when the path match the current location.

```jsx
import Route1 from './Components/Route1';

export const routes: = [
  {
    path: '/',
    component: <Route1 />
  }
];
```

A react hook is provided to access router resources anywhere inside the Router component.

```js
import {useLocation} from 'react-awesome-router';

const {location, context, params, setLocation, setContext} = useLocation();
```

| Property        |           Type           | Description                                                                                                                                |
| --------------- | :----------------------: | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **location**    |         `string`         | The current routed path                                                                                                                    |
| **setLocation** | `function(string)=>void` | Sets the current location. If the location provided is the current location, triggers another render of the current route                  |
| **context**     |         `Object`         | A global router state. Can be used to set global state related to router, such as authentication state or user information                 |
| **setContext**  | `function(Object)=>void` | Add information to router state. Note that Object properties are copied to current router state, only existing properties will be replaced |
| **params**      |         `Object`         | An Object representing the current route params                                                                                            |

> Note that you can only use the hook on components that are children of the component wrapped by Router

You can define route params and access them with ease with the hook:

```jsx
export const routes: = [
  {
    path: '/',
    component: <Route1 />
  },
  {
    path: '/route3/:param1/:param2',
    component: <Route3 />
  }
];
```

```jsx
import {useLocation} from 'react-awesome-router';

const Route3 = () => {
  const {params} = useLocation();

  return (
    <div className="route">
      <div>Param1: {params.param1}</div>
      <div>Param2: {params.param2}</div>
    </div>
  );
};

export default Route3;
```

You can also define Route guards. Guards are executed after route resolution and before component render, allowing to conditionally render the component basend on custom rules like authentication or user role. Guards are Objects with two members:
| Property | Type | Description |
| -------- | :----------: | ----------|
| **middleware** | `(router: Router) => boolean` | A function returning a boolean. A router object is provided as first param, which allows the middleware to access the same resources as the useLocation hook. If middleware returns true, the router will render the route component |
| **fallback** | `JSX.Element | null` | A JSX component that will be rendered when the middleware returns false |

Guards are defined as an optional Route property.

```jsx
const authGuard = {
  middleware: router => {
    const authenticated = !!router.context?.auth?.logued;
    return authenticated;
  },

  fallback: <Unauthorized />
};

export const routes = [
  {
    path: '/',
    component: <Route1 />
  },
  {
    path: '/private',
    component: <Route2 />,
    guards: [authGuard]
  }
];
```

> Note that guards are defined as an array, and are executed in the same order as provided: The router will render the first guard's fallback that returns false, or the route component if all guards return true.

Fully working example application, bootstraped with create-react-app is provided in the [example](https://github.com/hzeroo/react-awesome-router/tree/master/example) directory.

## Running for developement

To run both the router module and the example together with live reloading, first clone the repository:

```bash
git clone https://github.com/hzeroo/react-awesome-router.git
```

Then install dependencies and run the router module:

```bash
cd react-awesome-router
npm i
# Link the package to the global npm package folder
sudo npm link
npm start
```

On another shell, install the example dependencies and and run it:

```bash
cd example
npm i
npm link react-awesome-router
# Remove react dependency, as react-awesome-router module
# already provides it and using both will result on runtime error
rm -rf node_modules/react
npm start
```

This will open http://localhost:3000 with the example application running. Any changes either to the router or the example will live reload the example.

## Previous work I liked and guided me

- [Angular router](https://angular.io/guide/router)
- [universal-router](https://github.com/kriasoft/universal-router) by Kriasoft
