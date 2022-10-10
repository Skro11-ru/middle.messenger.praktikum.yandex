import { Login } from './src/modules/Login/view/Login';
import { Registration } from './src/modules/Registration/view/Registration';
import { ProfilePage } from './src/modules/Profile/view/Profile/Profile';
import { ProfileEdit } from './src/modules/Profile/view/ProfileEdit/ProfileEdit';
import { Error500 } from './src/modules/UiKit/plug/500/500';
import { Error404 } from './src/modules/UiKit/plug/404/404';
import { ChatsPageS } from './src/modules/Chat/view/Chat';
// eslint-disable-next-line max-len
import Router from './src/helpers/Router';
import AuthController from './src/controllers/AuthController';
// eslint-disable-next-line max-len
import { ProfileEditPassword } from './src/modules/Profile/view/ProfileEditPassword/ProfileEditPassword';
import ChatController from './src/controllers/ChatController';

// eslint-disable-next-line @typescript-eslint/naming-convention
enum routes {
  login = '/login',
  registration = '/registration',
  profileEdit = '/profile-edit',
  profile = '/profile',
  profileEditPassword = '/profile-edit-password',
  chats = '/chats',
  page404 = '/404',
  page500 = '/500',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router.use('/', Login)
    .use(routes.login, Login)
    .use(routes.registration, Registration)
    .use(routes.profileEdit, ProfileEdit)
    .use(routes.profile, ProfilePage)
    .use(routes.profileEditPassword, ProfileEditPassword)
    .use(routes.chats, ChatsPageS)
    .use(routes.page404, Error404)
    .use(routes.page500, Error500)
    .start();

  // try {
  await AuthController.fetchUser();
  await ChatController.getChats();
  //
  //   Router.start();
  //   if (
  //     window.location.pathname === '/' ||
  //     window.location.pathname === '/login'
  //   ) {
  //     Router.go('/chats');
  //   }
  // } catch {
  //   Router.start();
  //   if (window.location.pathname !== '/registration') {
  //     Router.go('/');
  //   }
  // }
});
