import template from './ProfileEdit.hbs';
import * as styles from '../Profile/Profile.scss';
import Block from '../../../../helpers/block';
import { ProfileSidebar } from '../../components/ProfileSidebar/ProfileSidebar';
import { ProfileRow } from '../../components/ProfileRow/ProfileRow';
import { firstCapitalLetter } from '../../../../helpers/firstCapitalLetter';
import { Button } from '../../../UiKit/Button/Button';
import { formValidation } from '../../../../helpers/validation';
import AuthController from '../../../../controllers/AuthController';
import { withStore } from '../../../../helpers/Store';
import ProfileController from '../../../../controllers/ProfileController';
import { getFormData } from '../../../../helpers/GetFormData';
import router from '../../../../helpers/Router';

interface IProfileEdit {
  title: string;
}
interface IProfile {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
}
export class BaseProfileEdit extends Block {
  public constructor(properties: IProfileEdit) {
    super(properties);
  }

  init() {
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
        value: this.props.first_name,
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

    Object.entries(elements).forEach(([key, value]) => {
      console.log(`############___ProfileEdit---79___#######\n`, value);
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
            const data = getFormData('profile__form');
            ProfileController.editUser(data as IProfile).then(
              router.go('/profile'),
            );
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore((state) => ({ ...state.user }));
export const ProfileEdit = withUser(BaseProfileEdit);
