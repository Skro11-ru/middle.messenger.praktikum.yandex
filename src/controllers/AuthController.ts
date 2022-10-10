import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI';
import router from '../helpers/Router';
import store from '../helpers/Store';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();
      router.go('/chats');
    } catch (error: any) {
      if (error.reason === 'User already in system') {
        this.logout();
      }
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go('/chats');
    } catch (error: any) {
      alert(error.reason);
      console.error(error);
    }
  }

  async fetchUser() {
    console.log(1);
    const user = await this.api.read();
    console.log(2);
    store.set('user', user);
    console.log(
      `############___AuthController---48___#######\n`,
      store.getState(),
    );
  }

  async logout() {
    try {
      await this.api.logout();

      router.go('/');
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async back() {
    try {
      router.back();
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async forward() {
    try {
      router.forward();
    } catch (error: any) {
      console.error(error.message);
    }
  }
}

export default new AuthController();
