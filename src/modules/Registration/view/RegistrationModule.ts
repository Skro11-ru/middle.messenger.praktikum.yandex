import template from './Registration.hbs';
import Block from '../../../helpers/block';
import { inputValidation, formValidation } from '../../../helpers/validation';
import { Button } from '../../UiKit/Button/Button';
import { Input } from '../../UiKit/Input/Input';
import * as styles from './Registration.scss';
import { firstCapitalLetter } from '../../../helpers/firstCapitalLetter';
import AuthController from '../../../controllers/AuthController';
import { getFormData } from '../../../helpers/GetFormData';
import { SignupData } from '../../../api/AuthAPI';

export class RegistrationModule extends Block {
  public constructor() {
    super('');
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
      phone: {
        label: 'Телефон',
        type: 'tel',
        name: 'phone',
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
        click: (event: any) => {
          event.preventDefault();
          if (formValidation('registration__form')) {
            const formData = getFormData('registration__form');
            AuthController.signup(formData as SignupData);
          }
        },
      },
    });

    this.children.registration = new Button({
      label: 'Войти',
      class: 'secondary button__center',
      routerLink: true,
      to: '/login',
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
