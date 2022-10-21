import { ChatsAPI, TypesChat, TypesUsersChat } from '../api/ChatsAPI';
import store from '../helpers/Store';
import CONSTANTS from '../Constants';

export class ChatController {
  private readonly api: ChatsAPI;

  socket: WebSocket | null;

  data: any;

  constructor() {
    this.api = new ChatsAPI();
    this.socket = null;
  }

  async createChat(data: TypesChat) {
    try {
      await this.api.createChat(data);

      await this.getChats();
    } catch (error: any) {
      console.error(error);
    }
  }

  async getChats() {
    const chats = await this.api.read();
    store.set('allChats', chats);
  }

  async getChat(id: number, userId: number, name: string) {
    const resp: any = await this.api.getChat(id);
    const { token } = resp;
    store.set('chatId', id);
    store.set('token', token);
    store.set('nameChat', name);

    if (this.socket) {
      this.socket.close();
      store.set('chat', { chatId: id });
    }
    this.socket = new WebSocket(
      `${CONSTANTS.webSocket}/${userId}/${id}/${token}`,
    );

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });
    this.socket.addEventListener('open', () => {
      console.log('connection open');
      (this.socket as WebSocket).send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        }),
      );
    });

    this.socket.addEventListener('message', (event_) => {
      const user = JSON.parse(event_.data);

      if (!user) {
        throw new SyntaxError('Ошибка');
      } else if (typeof user === 'object' && user.type === 'message') {
        const messages = [user, ...store.getState().chat];
        store.set('chat', messages);
      } else {
        this.data = {
          ...user,
          chatId: id,
        };
        store.set('chat', user);
      }
    });

    this.socket.addEventListener('error', (event_: any) => {
      console.log('Ошибка', event_.message);
    });

    this.getChats();
  }

  async sendMessage(newMessage: { message: string }) {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          content: newMessage.message,
          type: 'message',
        }),
      );
      this.socket.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        }),
      );
    }

    this.getChats();
  }

  async deleteChat(id: number) {
    try {
      await this.api.deleteChat(id);
      store.set('token', undefined);
      await this.getChats();
    } catch (error: any) {
      console.error(error);
    }
  }

  async addUser(data: TypesUsersChat) {
    try {
      await this.api.addUserToChat(data);
      await this.getChats();
    } catch (error: any) {
      console.error(error);
    }
  }

  async deleteUser(data: TypesUsersChat) {
    try {
      await this.api.deleteUserFromChat(data);
      await this.getChats();
    } catch (error: any) {
      console.error(error);
    }
  }
}

export default new ChatController();
