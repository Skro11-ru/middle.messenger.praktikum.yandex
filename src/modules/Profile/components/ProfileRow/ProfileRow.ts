import template from './ProfileRow.hbs';
import * as styles from './ProfileRow.scss';
import Block from '../../../../helpers/block';
import { Input } from '../../../UiKit/Input/Input';
import { inputValidation } from '../../../../helpers/validation';
import { Button } from '../../../UiKit/Button/Button';

interface IProfileRow {
  href?: string;
  to: string;
  class?: string;
  label?: string;
  value?: string;
  isInput?: boolean;
  routerLink?: boolean;
  name?: string;
  type?: string;
  placeholder?: string;
  events?: {
    click?: (event: Event) => void;
  };
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
      placeholder: this.props.placeholder,
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
    this.children.editProfile = new Button({
      label: this.props.label,
      class: this.props.class,
      routerLink: this.props.routerLink,
      to: this.props.to,
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
