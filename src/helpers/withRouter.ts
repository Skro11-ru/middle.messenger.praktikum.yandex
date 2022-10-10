import Router from './Router';
import Block from './block';

export function withRouter(Component: typeof Block<any>) {
  type Properties = typeof Component extends typeof Block<
    infer P extends Record<string, any>
  >
    ? P
    : any;

  return class WithRouter extends Component {
    constructor(properties: Properties & PropertiesWithRouter) {
      super({ ...properties, router: Router });
    }
  };
}

export interface PropertiesWithRouter {
  router?: typeof Router;
  label?: string;
  class?: string;
  routerLink?: boolean;
  to?: string;
  events?: {
    click?: () => void;
  };
}
