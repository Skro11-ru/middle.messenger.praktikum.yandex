import template from './ProfileAvatar.hbs';
import Block from '../../../../helpers/block';
import * as styles from './ProfileAvatar.scss';

interface IProfileAvatar {
  text: string;
  name: string;
}

export class ProfileAvatar extends Block {
  constructor(properties: IProfileAvatar) {
    super(properties);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
