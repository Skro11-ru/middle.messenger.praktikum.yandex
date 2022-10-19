import template from './ChatMenuItem.hbs';
import * as styles from './ChatMenuItem.scss';
import Block from '../../../../helpers/block';

interface IChatMenuItem {
  title?: string;
  text?: string;
  time?: string;
  event?: string;
  count_mess?: number;
  events?: {
    click?: () => void;
  };
}

export class ChatMenuItem extends Block {
  public constructor(properties: IChatMenuItem) {
    super(properties);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
