import template from './Button.hbs';
import Block from '../../../helpers/block';
import * as styles from './Button.scss';

interface IButton {
  label: string;
  class?: string;
  href?: string;
  events?: {
    click?: (event: Event) => void;
  };
}

export class Button extends Block {
  constructor(properties: IButton) {
    super(properties);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
