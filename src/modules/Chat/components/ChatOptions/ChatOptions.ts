import template from './chatOptions.hbs';

import * as styles from './chatOptions.scss';
import Block from '../../../../helpers/block';

type ChatOptionsProperties = {
  chatId: number;
  nameChat: string;
};

export class ChatOptions extends Block {
  constructor(properties: ChatOptionsProperties) {
    super(properties);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
