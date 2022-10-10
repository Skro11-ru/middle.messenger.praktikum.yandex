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
      this.api.editAvatar(data);
      router.go('/settings');
      // eslint-disable-next-line no-restricted-globals
      setTimeout(() => location.reload(), 500);
    } catch (error: any) {
      console.error(error);
    }
  }

  async editUser(data: IEditProfile) {
    try {
      const changedData = await this.api.editUser(data);
      if (changedData) {
        await this.fetchUser();
        router.go('/settings');
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  async editPassword(data: IEditPassword) {
    this.api
      .editPassword(data)
      .then(() => {
        router.go('/profile');
      })
      .catch((error) => {
        alert(error.reason);
      });
  }

  async avatarEdit() {
    try {
      router.go('/settings/change-avatar');
    } catch (error: any) {
      console.error(error);
    }
  }

  async passEdit() {
    try {
      router.go('/settings/change-pass');
    } catch (error: any) {
      console.error(error);
    }
  }

  async userEdit() {
    try {
      router.go('/settings/change-profile');
    } catch (error: any) {
      console.error(error);
    }
  }

  async messenger() {
    try {
      router.go('/messenger');
    } catch (error: any) {
      console.error(error);
    }
  }

  async fetchUser() {
    const user = await this.api.read();
    store.set('user', user);
  }
}

export default new ProfileController();
