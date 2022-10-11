import BaseAPI from './BaseAPI';

export interface IEditPassword {
  newPassword: string;
  oldPassword: string;
}

export interface IEditProfile {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
}
export interface IProfile {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export class ProfileAPI extends BaseAPI {
  editUser(data: IEditProfile) {
    return this.http.put('/user/profile', data);
  }

  editAvatar(data: any) {
    return this.http.put('/user/profile/avatar', data);
  }

  editPassword(data: IEditPassword) {
    return this.http.put('/user/password', data);
  }

  read(): Promise<IProfile> {
    return this.http.get('/auth/user');
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}

export default new ProfileAPI();
