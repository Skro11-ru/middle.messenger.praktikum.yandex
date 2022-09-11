import template from './ProfileEdit.hbs';
import * as styles from '../Profile/Profile.scss';
import Block from '../../../../helpers/block';
import { ProfileSidebar } from '../../components/ProfileSidebar/ProfileSidebar';
import { ProfileRow } from '../../components/ProfileRow/ProfileRow';
import { firstCapitalLetter } from '../../../../helpers/firstCapitalLetter';
import { ProfileAvatar } from '../../components/ProfileAvatar/ProfileAvatar';
import { Button } from '../../../UiKit/Button/Button';
import { formValidation } from '../../../../helpers/validation';

interface IProfileEdit {
  title: string;
}

export class ProfileEdit extends Block {
  public constructor(properties: IProfileEdit) {
    super(properties);
  }

  init() {
    const elements = {
      email: {
        label: 'Почта',
        type: 'email',
        name: 'email',
        value: 'pochta@yandex.ru',
      },
      login: {
        label: 'Логин',
        type: 'text',
        name: 'login',
        value: 'ivanivanov',
      },
      firstName: {
        label: 'Имя',
        type: 'text',
        name: 'first_name',
        value: 'Иван',
      },
      secondName: {
        label: 'Фамилия',
        type: 'text',
        name: 'second_name',
        value: 'Иванов',
      },
      displayName: {
        label: 'Имя в чате',
        type: 'text',
        name: 'display_name',
        value: 'Иван',
      },
      phone: {
        label: 'Телефон',
        type: 'phone',
        name: 'phone',
        value: '+7 (909) 967 30 30',
      },
    };
    this.children.profileSidebar = new ProfileSidebar({
      class: 'sidebar',
      events: {
        click: (event) => {
          event.preventDefault();
          window.history.go(-1);
        },
      },
    });

    this.children.profileAvatar = new ProfileAvatar({
      text: 'Поменять аватар',
      name: 'Иван',
    });

    this.children.profileEditInfo = new ProfileRow({
      label: 'Изменить данные',
      href: '/ProfileEdit',
    });
    this.children.profileEditPassword = new ProfileRow({
      label: 'Изменить пароль',
      href: '/ProfileEdit-password',
    });
    this.children.profileExit = new ProfileRow({
      label: 'Выйти',
      href: '/',
      class: 'link--danger',
    });

    Object.entries(elements).forEach(([key, value]) => {
      this.children[`profileRow${firstCapitalLetter(key)}`] = new ProfileRow({
        label: value.label,
        value: value.value,
        isInput: true,
      });
    });
    this.children.saveButton = new Button({
      label: 'Сохранить',
      class: 'primary',
      events: {
        click: (event) => {
          event.preventDefault();
          if (formValidation('registration__form')) {
            window.location.pathname = '/Profile';
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
