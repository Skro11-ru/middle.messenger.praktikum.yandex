import template from './ProfileSidebar.hbs';
import Block from '../../../../helpers/block';
import * as styles from './ProfileSidebar.scss';

interface IProfileSidebar {
  class: string;
  events?: {
    click?: (event: Event) => void;
  };
}

export class ProfileSidebar extends Block {
  constructor(properties: IProfileSidebar) {
    super(properties);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
