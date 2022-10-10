import template from './Button.hbs';
import Block from '../../../helpers/block';
import * as styles from './Button.scss';
import { withRouter } from '../../../helpers/withRouter';

interface IButton {
  label?: string;
  class?: string;
  href?: string;
  routerLink?: string;
  icon: string;
  events?: {
    click?: (event: Event) => void;
  };
  to: string;
}

export class BaseButton extends Block {
  constructor(properties: IButton) {
    const newProperties = properties.routerLink
      ? {
          ...properties,
          events: {
            click: (event: any) => this.navigate(event),
          },
        }
      : {
          ...properties,
        };

    super({
      ...newProperties,
    });
  }

  navigate(event: any) {
    event.preventDefault();
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const Button = withRouter(BaseButton);
