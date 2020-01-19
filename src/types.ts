export interface IRoute {
  path: string;
  component: JSX.Element;
  guards?: Array<IGuard>;
}
export interface IRouterProps {
  routes: Array<IRoute>;
}
export interface IRouterState {
  location: string;
  params: Object;
  routes: Array<IRoute>;
  context: Object;
  forceRefresh: number;
  routedElement: JSX.Element | null;
}

export interface IRouter {
  location: string;
  context: any;
  params: any;
  component: JSX.Element | null;
  setLocation: (location: string) => void;
  setContext: (context: Object) => void;
}

export interface IGuard {
  middleware: (router: IRouter) => boolean;
  fallback: JSX.Element | null;
}
