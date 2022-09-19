import template from './Chat.hbs';
import * as styles from './Chats.scss';
import Block from '../../../helpers/block';
import { Input } from '../../UiKit/Input/Input';
import { Button } from '../../UiKit/Button/Button';
import { ChatItem } from '../components/ChatItem/ChatItem';

type ChatsPageProperties = {
  title: string;
};

export class ChatsPage extends Block {
  public constructor(properties: ChatsPageProperties) {
    super(properties);
  }

  init() {
    const chatUser = [
      {
        name: 'Андрей',
        text: 'Изображение',
        time: '10:49',
        count_mess: 2,
      },
      {
        name: 'Киноклуб',
        text: 'Вы: стикер',
        time: '12:00',
        count_mess: 0,
      },
      {
        name: 'Илья',
        text: 'Друзья, у меня для вас особенный выпуск новостей!',
        time: '15:12',
        count_mess: 4,
      },
    ];

    chatUser.forEach((item, index) => {
      this.children[`ChatUser${index + 1}`] = new ChatItem({
        name: item.name,
        text: item.text,
        time: item.time,
        count_mess: item.count_mess,
      });
    });

    this.children.inputChat = new Input({
      name: 'search',
      type: 'text',
      class: 'chat-input',
      placeholder: 'Поиск',
    });
    this.children.inputMess = new Input({
      name: 'messages',
      type: 'text',
      class: 'chat-input',
      placeholder: 'Сообщение',
    });
    this.children.button = new Button({
      class: '',
      label: '>',
    });
    this.children.linkProfile = new Button({
      label: 'Профиль >',
      href: '/Profile',
      class: 'profile-link',
    });
  }

  render() {
    return this.compile(template, {
      ...this.props,
      styles,
    });
  }
}
