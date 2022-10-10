import template from './ProfileEditPassword.hbs';
import { ProfileSidebar } from '../../components/ProfileSidebar/ProfileSidebar';
import { ProfileRow } from '../../components/ProfileRow/ProfileRow';
import { firstCapitalLetter } from '../../../../helpers/firstCapitalLetter';
import { ProfileAvatar } from '../../components/ProfileAvatar/ProfileAvatar';
import { Button } from '../../../UiKit/Button/Button';
import { formValidation } from '../../../../helpers/validation';
import Block from '../../../../helpers/block';
import { getFormData } from '../../../../helpers/GetFormData';
import ProfileController from '../../../../controllers/ProfileController';
import store, { withStore } from '../../../../helpers/Store';
import AuthController from '../../../../controllers/AuthController';

interface IProfileEditPassword {
  title: string;
}

export class ProfileEditPassword extends Block {
  public constructor(properties: IProfileEditPassword) {
    super(properties);
  }

  init() {
    const elements = {
      oldPassword: {
        label: 'Старый пароль',
        type: 'password',
        name: 'oldPassword',
        placeholder: '*********',
      },
      newPassword: {
        label: 'Новый пароль',
        type: 'password',
        name: 'newPassword',
        placeholder: '*********',
      },
      newPasswordAgain: {
        label: 'Повторите новый пароль',
        type: 'password',
        name: 'password',
        placeholder: '*********',
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
      name: 'Иван',
    });

    Object.entries(elements).forEach(([key, value]) => {
      this.children[`profileRow${firstCapitalLetter(key)}`] = new ProfileRow({
        label: value.label,
        placeholder: value.placeholder,
        name: value.name,
        type: value.type,
        isInput: true,
      });
    });
    console.log(
      `############___ProfileEditPassword---97___#######\n`,
      this.props,
    );

    this.children.saveButton = new Button({
      label: 'Сохранить',
      class: 'primary',
      events: {
        click: (event) => {
          event.preventDefault();
          if (formValidation('profile__form')) {
            const { oldPassword, newPassword } = getFormData('profile__form');
            ProfileController.editPassword({ oldPassword, newPassword });
          }
        },
      },
    });
  }

  render() {
    console.log(
      `############___ProfileEditPassword---88___#######\n`,
      store.getState(),
    );
    console.log(
      `############___ProfileEditPassword---95___#######\n`,
      this.props,
    );
    return this.compile(template, { ...this.props });
  }
}

// const withUser = withStore((state) => ({ ...state.user }));
//
// export const ProfilePage = withUser(ProfilePageBase);

const withUser = withStore((state) => ({ ...state.user }));
export default withUser(ProfileEditPassword);
