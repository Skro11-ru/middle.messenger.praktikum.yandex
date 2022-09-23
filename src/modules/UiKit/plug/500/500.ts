import template from './500.hbs';
import Block from '../../../../helpers/block';
import * as styles from './500.scss';
import { Button } from '../../Button/Button';

interface IError500 {
  title: string;
  text: string;
}

export class Error500 extends Block {
  constructor(properties: IError500) {
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
