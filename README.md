# React Awesome Router

A simple, lightweight, middleware oriented router for react applications.

## Motivation

Comming from non-react world, routing throgh JSX components feels anoying to me. I don't like to spread the routing logic between different react components; I don't like to write JSX components to extend router capabilities (like auth). I also missed other features I enjoy and was used to like [Angular guards](https://angular.io/api/router/CanActivate) and [Koa](https://github.com/koajs/koa) middleware based architecture.

When starting with react hooks, I realized how simple it will be to write a react router with hooks, [history.js](https://github.com/ReactTraining/history) and [path-to-regexp](https://github.com/pillarjs/path-to-regexp), indeed I think the whole module is far below 200 lines of code. This module allows me to provide basic routing features to small applications, as well as more advanced features on bigger applications through the use of custom ad-hoc middlewares.

## Installation

```bash
npm i react-awesome-router --save
```

## How it looks

**(WIP)**

Full working example application, bootstraped with create-react-app is provided in the example folder.

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
