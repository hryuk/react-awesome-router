export interface Route {
  path: string;
  component: JSX.Element;
  guards?: Array<IGuard>;
}
export interface RouterProps {
  routes: Array<Route>;
}
export interface RouterState {
  location: string;
  params: Object;
  routes: Array<Route>;
  context: Object;
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
