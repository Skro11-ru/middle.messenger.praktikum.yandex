import template from './Registration.hbs';
import Block from '../../../helpers/block';
import { inputValidation, formValidation } from '../../../helpers/validation';
import { Button } from '../../UiKit/Button/Button';
import { Input } from '../../UiKit/Input/Input';
import * as styles from './Registration.scss';
import { firstCapitalLetter } from '../../../helpers/firstCapitalLetter';

interface IRegistration {
  title: string;
}

export class Registration extends Block {
  public constructor(properties: IRegistration) {
    super(properties);
  }

  init() {
    const elements = {
      email: {
        label: 'Почта',
        type: 'email',
        name: 'email',
      },
      login: {
        label: 'Логин',
        type: 'text',
        name: 'login',
      },

      firstName: {
        label: 'Имя',
        type: 'text',
        name: 'first_name',
      },
      secondName: {
        label: 'Фамилия',
        type: 'text',
        name: 'second_name',
      },
      password: {
        label: 'Пароль',
        type: 'password',
        name: 'password',
      },
      passwordAgain: {
        label: 'Пароль (еще раз)',
        type: 'password',
        name: 'password_again',
      },
    };

    Object.entries(elements).forEach(([key, value]) => {
      this.children[`input${firstCapitalLetter(key)}`] = new Input({
        label: value.label,
        type: value.type,
        name: value.name,
        showLabel: true,

        events: {
          focus: (event: { target: HTMLInputElement }) =>
            inputValidation(event.target.name, event.target.value),
          blur: (event: { target: HTMLInputElement }) =>
            inputValidation(event.target.name, event.target.value),
          input: (event: { target: HTMLInputElement }) =>
            inputValidation(event.target.name, event.target.value),
        },
      });
    });

    this.children.login = new Button({
      label: 'Зарегистрироваться',
      class: 'primary',
      events: {
        click: (event) => {
          event.preventDefault();
          if (formValidation('registration__form')) {
            window.location.pathname = '/chats';
          }
        },
      },
    });

    this.children.registration = new Button({
      label: 'Войти',
      class: 'secondary',
      href: '/login',
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
