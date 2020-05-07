export interface Route {
  path: string;
  component: React.ReactNode;
  guards?: Array<Guard>;
}

export interface Router {
  location: string;
  context: any;
  params: any;
  setLocation: (location: string) => void;
  setContext: (context: Object) => void;
}

export type Guard = (router: Router, next: () => undefined) => React.ReactNode | undefined;