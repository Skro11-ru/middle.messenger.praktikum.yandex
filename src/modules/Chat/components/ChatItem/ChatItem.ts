import template from './ChatItem.hbs';
import * as styles from './ChatItem.scss';
import Block from '../../../../helpers/block';

interface IChatItem {
  name: string;
  text?: string;
  time?: string;
  count_mess: number;
  events?: {
    click?: () => KeyboardEvent;
  };
}

export class ChatItem extends Block {
  public constructor(properties: IChatItem) {
    super(properties);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
