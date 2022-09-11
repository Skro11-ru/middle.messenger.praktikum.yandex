import template from './404.hbs';
import Block from '../../../../helpers/block';
import * as styles from './404.scss';
import { Button } from '../../Button/Button';

interface IError404 {
  title: string;
  text: string;
}

export class Error404 extends Block {
  constructor(properties: IError404) {
    super(properties);
  }

  init() {
    this.children.backButton = new Button({
      label: 'Назад к чатам',
      class: 'secondary',
      href: '/chats',
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}