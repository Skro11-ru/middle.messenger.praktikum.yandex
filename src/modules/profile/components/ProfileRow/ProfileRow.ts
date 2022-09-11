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
}

export class ProfileRow extends Block {
  public constructor(properties: IProfileRow) {
    super(properties);
  }

  init() {
    this.children.inputProfileEmail = new Input({
      label: 'Почта',
      type: 'email',
      name: 'email',
      value: 'pddddochta@yanddex.ru',
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
    this.children.inputProfileLogin = new Input({
      label: 'Логин',
      type: 'email',
      name: 'email',
      value: 'pddddochta@yanddex.ru',
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
