import template from './ChatMessage.hbs';
import * as styles from './ChatMessage.scss';
import Block from '../../../../helpers/block';

interface Properties {
  content: string;
  time: string;
  class: string;
}

export class ChatMessage extends Block {
  constructor(properties: Properties) {
    super(properties);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      styles,
    });
  }
}
