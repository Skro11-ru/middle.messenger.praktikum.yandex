import template from './ProfileEditPassword.hbs';
import { ProfileSidebar } from '../../components/ProfileSidebar/ProfileSidebar';
import { ProfileRow } from '../../components/ProfileRow/ProfileRow';
import { firstCapitalLetter } from '../../../../helpers/firstCapitalLetter';
import { ProfileAvatar } from '../../components/ProfileAvatar/ProfileAvatar';
import { Button } from '../../../UiKit/Button/Button';
import { formValidation } from '../../../../helpers/validation';
import Block from '../../../../helpers/block';

interface IProfileEditPassword {
  title: string;
}

export class ProfileEditPassword extends Block {
  public constructor(properties: IProfileEditPassword) {
    super(properties);
  }

  init() {
    const elements = {
      oldEmail: {
        label: 'Старый пароль',
        type: 'password',
        name: 'password',
        value: '1234567DD',
      },
      newEmail: {
        label: 'Новый пароль',
        type: 'password',
        name: 'password',
        value: '1234567DD',
      },
      newEmailAgain: {
        label: 'Повторите новый пароль',
        type: 'password',
        name: 'password',
        value: '1234567DD',
      },
    };
    this.children.profileSidebar = new ProfileSidebar({
      class: 'sidebar',
      events: {
        click: (event) => {
          event.preventDefault();
          window.location.pathname = '/chats';
        },
      },
    });

    this.children.profileAvatar = new ProfileAvatar({
      text: 'Поменять аватар',
      name: 'Иван',
    });

    Object.entries(elements).forEach(([key, value]) => {
      this.children[`profileRow${firstCapitalLetter(key)}`] = new ProfileRow({
        label: value.label,
        value: value.value,
        name: value.name,
        type: value.type,
        isInput: true,
      });
    });
    this.children.saveButton = new Button({
      label: 'Сохранить',
      class: 'primary',
      events: {
        click: (event) => {
          event.preventDefault();
          if (formValidation('profile__form')) {
            window.location.pathname = '/profile';
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
