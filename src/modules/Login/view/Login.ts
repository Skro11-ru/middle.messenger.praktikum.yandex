import template from './Login.hbs';
import Block from '../../../helpers/block';
import { inputValidation } from '../../../helpers/validation';
import { Button } from '../../UiKit/Button/Button';
import { Input } from '../../UiKit/Input/Input';
import * as styles from './Login.scss';
import { getFormData } from '../../../helpers/GetFormData';
import { SignupData } from '../../../api/AuthAPI';
// eslint-disable-next-line import/no-named-as-default
import AuthController from '../../../controllers/AuthController';

interface ILogin {
  title: string;
}

export class Login extends Block {
  public constructor(properties: ILogin) {
    super(properties);
  }

  init() {
    this.children.inputLogin = new Input({
      label: 'Логин',
      type: 'text',
      name: 'login',
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
    this.children.inputPassword = new Input({
      label: 'Пароль',
      type: 'password',
      name: 'password',
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

    this.children.login = new Button({
      label: 'Авторизоваться',
      class: 'primary',
      events: {
        click: (event) => {
          event.preventDefault();
          // if (formValidation('login__form')) {
          const formData = getFormData('login__form');
          AuthController.signin(formData as SignupData);
          // window.location.pathname = '/chats';
          // }
        },
      },
    });

    this.children.registration = new Button({
      label: 'Нет аккаунта?',
      class: 'secondary',
      routerLink: true,
      to: '/registration',
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
