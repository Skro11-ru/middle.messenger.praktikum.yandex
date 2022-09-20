import template from './ProfileRow.hbs';
import * as styles from './ProfileRow.scss';
import Block from '../../../../helpers/block';
import { Input } from '../../../UiKit/Input/Input';
import { inputValidation } from '../../../../helpers/validation';

interface IProfileRow {
  href?: string;
  class?: string;
  label: string;
  value?: string;
  isInput?: boolean;
  name?: string;
  type?: string;
}

export class ProfileRow extends Block {
  public constructor(properties: IProfileRow) {
    super(properties);
  }

  init() {
    this.children.inputProfile = new Input({
      label: this.props.label,
      type: this.props.type,
      name: this.props.name,
      value: this.props.value,
      class: 'row__input',
      showLabel: false,
      events: {
        focus: (event: { target: HTMLInputElement }) =>
          inputValidation(event.target.name, event.target.value),
        blur: (event: { target: HTMLInputElement }) =>
          inputValidation(event.target.name, event.target.value),
        input: (event: { target: HTMLInputElement }) =>
          inputValidation(event.target.name, event.target.value),
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
