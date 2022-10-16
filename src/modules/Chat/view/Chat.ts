import { nanoid } from 'nanoid';
import template from './Chat.hbs';
import * as styles from './Chats.scss';
import Block from '../../../helpers/block';
import { Input } from '../../UiKit/Input/Input';
import { Button } from '../../UiKit/Button/Button';
import { ChatItem } from '../components/ChatItem/ChatItem';
import { formValidation } from '../../../helpers/validation';
import { getFormData } from '../../../helpers/GetFormData';
import { ChatMessage } from '../components/ChatMessage/ChatMessage';
import store, { withStore } from '../../../helpers/Store';
import ChatController from '../../../controllers/ChatController';
import { ChatOptions } from '../components/ChatOptions/ChatOptions';
import iconSend from '../../../../static/icons/icon-send.svg';
import iconAttach from '../../../../static/icons/icon-attach.svg';
import iconDots from '../../../../static/icons/icon-dots.svg';
import { ChatMenuItem } from '../components/ChatMenuItem/ChatMenuItem';
import { ChatModal } from '../components/ChatModal/ChatModal';

type ChatsPageProperties = {
  title: string;
};
type MessageData = {
  time: Date;
  user_id: number;
  content: string;
};
const enterButtonNumber = 13;
export class ChatsPage extends Block {
  protected initChildren() {
    this.children.chatList = [];
    const lengthText = 30;
    if (this.props?.allChats !== undefined) {
      Object.values(this.props.allChats).forEach((chats: any) => {
        const text =
          chats.last_message?.content.length > lengthText
            ? `${chats.last_message?.content.slice(0, lengthText)}...`
            : chats.last_message?.content;
        this.children.chatList.push(
          new ChatItem({
            name: chats.title,
            text,
            count_mess: chats.unread_count,
            events: {
              click: () => {
                ChatController.getChat(
                  chats.id,
                  this.props.user.id,
                  chats.title,
                );
              },
            },
          }),
        );
      });
    }

    if (this.props?.token !== undefined) {
      this.children.header = new ChatOptions({
        chatId: this.props.chatId,
        nameChat: this.props.nameChat,
      });
    }

    this.children.messages = [];

    if (this.props?.chat !== undefined) {
      this.props.chat.forEach((message: MessageData) => {
        const date = new Date(message.time);
        const isMyMessage = message.user_id === this.props.user.id;
        this.children.messages.push(
          new ChatMessage({
            content: message.content,
            time: `${date.getHours()}:${date.getMinutes()}`,
            class: isMyMessage ? 'message--outgoing' : 'message--incoming',
          }),
        );
      });
      this.children.messages.reverse();
    }
    this.children.inputMess = new Input({
      name: 'message',
      type: 'text',
      class: 'chat-input-mess',
      placeholder: 'Сообщение',
      events: {
        keydown: (event) => {
          if (
            event.keyCode === enterButtonNumber &&
            formValidation('control__input')
          ) {
            const data = getFormData('control__input');
            ChatController.sendMessage(data as { message: string });
          }
        },
      },
    });

    this.children.modal = new ChatModal({
      buttonLabel1: 'Добавить',
      buttonLabel2: 'Закрыть',
      chatId: this.props.chatId,
    });

    this.children.linkProfile = new Button({
      label: 'Профиль >',
      routerLink: true,
      to: '/profile',
      class: 'profile-link',
    });
    this.children.buttonSend = new Button({
      icon: iconSend,
      routerLink: false,
      events: {
        click: (event: any) => {
          event.preventDefault();

          if (formValidation('control__input')) {
            const data = getFormData('control__input');
            ChatController.sendMessage(data as { message: string });
          }
        },
      },
    });

    this.children.buttonAttach = new Button({
      icon: iconAttach,
      routerLink: false,
    });

    this.children.buttonMenu = new Button({
      icon: iconDots,
      routerLink: false,
      events: {
        click: () => {
          document
            .querySelector('.chat-menu')!
            .classList.toggle('chat-menu--hidden');
        },
      },
    });

    const chatMenu = [
      {
        id: nanoid(7),
        title: 'Добавить пользователя',
        event: 'addUser',
      },
      {
        id: nanoid(7),
        title: 'Создать чат',
        event: 'createChat',
      },
      {
        id: nanoid(7),
        title: 'Удалить чат',
        event: 'deleteChat',
      },
    ];
    this.children.chatMenu = [];
    chatMenu.forEach((item) => {
      this.children.chatMenu.push(
        new ChatMenuItem({
          title: item.title,
          event: item.event,
          events: {
            click: () => {
              if (item.event === 'deleteChat') {
                ChatController.deleteChat(this.props.chatId);
              } else {
                store.set('event', item.event);
                document
                  .querySelector('.modal')
                  .classList.toggle('modal--hidden');
              }
            },
          },
        }),
      );
    });
  }

  render() {
    return this.compile(template, {
      ...this.props,
      styles,
      icon: { send: iconSend, attach: iconAttach },
    });
  }
}

const withChats = withStore((state) => ({
  allChats: state.allChats,
  chatId: state.chatId,
  nameChat: state.nameChat,
  token: state.token,
  user: state.user,
  chat: state.chat,
}));
export const ChatsPageS = withChats(ChatsPage);
