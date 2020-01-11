export interface Route {
  path: string;
  component: JSX.Element;
}
export interface RouterProps {
  routes: Array<Route>;
}
export interface RouterState {
  location: string;
  params: Object;
  routes: Array<Route>;
  routedElement: JSX.Element | null;
}
