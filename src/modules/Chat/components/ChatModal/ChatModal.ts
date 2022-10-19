import template from './ChatModal.hbs';
import * as styles from './ChatModal.scss';
import Block from '../../../../helpers/block';
import { Button } from '../../../UiKit/Button/Button';
import { Input } from '../../../UiKit/Input/Input';
import { getFormData } from '../../../../helpers/GetFormData';
import ChatController from '../../../../controllers/ChatController';
import store from '../../../../helpers/Store';

interface IChatModal {
  title?: string;
  buttonLabel1?: string;
  buttonLabel2?: string;
  text?: string;
  event?: string;
  chatId?: number;
  users?: [];

  events?: {
    click?: () => void;
  };
}

export class ChatModal extends Block {
  public constructor(properties: IChatModal) {
    super(properties);
  }

  init() {
    const buttons = [
      new Button({
        label: this.props.buttonLabel1,
        class: 'primary',
        routerLink: false,
        events: {
          click: (event: any) => {
            event.preventDefault();
            const data = getFormData('modal__window');
            switch (store.getState().event) {
              case 'addUser':
                ChatController.addUser({
                  chatId: this.props.chatId,
                  users: [data.field],
                });
                break;
              case 'createChat':
                ChatController.createChat({
                  title: data.field,
                });
                break;
              default:
                console.log('Ошибка');
            }

            document.querySelector('.modal')!.classList.toggle('modal--hidden');
          },
        },
      }),
      new Button({
        label: this.props.buttonLabel2,
        class: 'secondary',
        routerLink: false,
        events: {
          click: (event: any) => {
            event.preventDefault();

            document.querySelector('.modal')?.classList.toggle('modal--hidden');
          },
        },
      }),
    ];

    this.children.inputModal = new Input({
      name: 'field',
      type: 'text',
      class: 'modal__input',
      placeholder: 'Введите значение',
    });
    this.children.buttons = [];
    buttons.forEach((button) => {
      this.children.buttons.push(button);
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
