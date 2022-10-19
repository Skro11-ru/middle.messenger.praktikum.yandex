import template from './500.hbs';
import Block from '../../../../helpers/block';
import * as styles from './500.scss';
import { Button } from '../../Button/Button';

export class Error500 extends Block {
  constructor() {
    super('');
  }

  init() {
    this.children.backButton = new Button({
      label: 'Назад к чатам',
      class: 'secondary',
      routerLink: true,
      href: '/chats',
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
