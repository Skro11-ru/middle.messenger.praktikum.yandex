import template from './Profile.hbs';
import * as styles from './Profile.scss';
import Block from '../../../../helpers/block';
import { ProfileSidebar } from '../../components/ProfileSidebar/ProfileSidebar';
import { ProfileRow } from '../../components/ProfileRow/ProfileRow';
import { firstCapitalLetter } from '../../../../helpers/firstCapitalLetter';
import { ProfileAvatar } from '../../components/ProfileAvatar/ProfileAvatar';
import AuthController from '../../../../controllers/AuthController';
import { withStore } from '../../../../helpers/Store';

interface IProfile {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
}

export class BaseProfile extends Block {
  public constructor(properties: IProfile) {
    super(properties);
  }

  initChildren() {
    const elements = {
      email: {
        label: 'Почта',
        type: 'email',
        name: 'email',
        value: this.props.email,
      },
      login: {
        label: 'Логин',
        type: 'text',
        name: 'login',
        value: this.props.login,
      },
      firstName: {
        label: 'Имя',
        type: 'text',
        name: 'first_name',
        value: this.props.first_name,
      },
      secondName: {
        label: 'Фамилия',
        type: 'text',
        name: 'second_name',
        value: this.props.second_name,
      },
      displayName: {
        label: 'Имя в чате',
        type: 'text',
        name: 'display_name',
        value: this.props.display_name,
      },
      phone: {
        label: 'Телефон',
        type: 'phone',
        name: 'phone',
        value: this.props.phone,
      },
    };
    this.children.profileSidebar = new ProfileSidebar({
      class: 'sidebar',
      events: {
        click: () => {
          AuthController.back();
        },
      },
    });

    this.children.profileAvatar = new ProfileAvatar({
      text: 'Поменять аватар',
      name: this.props.display_name,
    });

    this.children.profileEditInfo = new ProfileRow({
      label: 'Изменить данные',
      class: ' button--secondary  button--router-link',
      routerLink: true,
      to: '/profile-edit',
    });
    this.children.profileEditPassword = new ProfileRow({
      label: 'Изменить пароль',
      class: ' button--secondary  button--router-link',
      routerLink: true,
      to: '/profile-edit-password',
    });
    this.children.profileExit = new ProfileRow({
      label: 'Выйти',
      class: ' button--secondary  button--router-link button--danger',
      routerLink: true,
      to: '/profile',
      events: {
        click: (event) => {
          event.preventDefault();
          AuthController.logout();
        },
      },
    });
    Object.entries(elements).forEach(([key, value]) => {
      this.children[`profileRow${firstCapitalLetter(key)}`] = new ProfileRow({
        label: value.label,
        value: value.value,
      });
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore((state) => ({ ...state.user }));
export const ProfilePage = withUser(BaseProfile);
