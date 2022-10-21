import template from './404.hbs';
import Block from '../../../../helpers/block';
import * as styles from './404.scss';
import { Button } from '../../Button/Button';

export class Error404 extends Block {
  constructor() {
    super('');
  }

  init() {
    this.children.backButton = new Button({
      label: 'Назад к чатам',
      class: ' button--secondary  button--router-link',
      routerLink: true,
      to: '/chats',
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
