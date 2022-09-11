import template from './Input.hbs';
import Block from '../../../helpers/block';
import * as styles from './Input.scss';

interface IInput {
  type: string;
  label: string;
  name: string;
  class?: string;
  showLabel: boolean;
  value?: string;
  events?: {
    blur?: (event: { target: HTMLInputElement }) => void;
    focus?: (event: { target: HTMLInputElement }) => void;
    input?: (event: { target: HTMLInputElement }) => void;
  };
}

export class Input extends Block {
  public constructor(properties: IInput) {
    super(properties);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
