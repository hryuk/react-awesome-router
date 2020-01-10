export interface Route {
  path: string;
  action: (state: Object) => JSX.Element;
}
export interface RouterProps {
  routes: Array<Route>;
}
export interface RouterState {
  location: string;
  routes: Array<Route>;
  routedElement: JSX.Element | null;
}
