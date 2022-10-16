import router from '../helpers/Router';
import store from '../helpers/Store';
import API, {
  IEditPassword,
  IEditProfile,
  ProfileAPI,
} from '../api/ProfileAPI';

export class ProfileController {
  private readonly api: ProfileAPI;

  constructor() {
    this.api = API;
  }

  async editAvatar(data: any) {
    try {
      await this.api.editAvatar(data);
    } catch (error: any) {
      console.error(error);
    }
  }

  async editUser(data: IEditProfile) {
    try {
      await this.api.editUser(data);
      await this.fetchUser();
    } catch (error: any) {
      console.error(error);
    }
  }

  async editPassword(data: IEditPassword) {
    this.api.editPassword(data).catch((error) => {
      alert(error.reason);
    });
  }

  async fetchUser() {
    const user = await this.api.read();
    store.set('user', user);
  }
}

export default new ProfileController();
