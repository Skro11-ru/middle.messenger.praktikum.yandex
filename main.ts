import { LoginModule } from './src/modules/Login/view/LoginModule';
import { RegistrationModule } from './src/modules/Registration/view/RegistrationModule';
import { ProfilePage } from './src/modules/Profile/view/Profile/Profile';
import { ProfileEdit } from './src/modules/Profile/view/ProfileEdit/ProfileEdit';
import { Error500 } from './src/modules/UiKit/plug/500/500';
import { Error404 } from './src/modules/UiKit/plug/404/404';
import { ChatsPageS } from './src/modules/Chat/view/Chat';
import Router from './src/helpers/Router';
import AuthController from './src/controllers/AuthController';
// eslint-disable-next-line max-len
import { ProfileEditPassword } from './src/modules/Profile/view/ProfileEditPassword/ProfileEditPassword';
import ChatController from './src/controllers/ChatController';

enum Routes {
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
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  Router.use('/', LoginModule)
    .use(Routes.login, LoginModule)
    .use(Routes.registration, RegistrationModule)
    .use(Routes.profileEdit, ProfileEdit)
    .use(Routes.profile, ProfilePage)
    .use(Routes.profileEditPassword, ProfileEditPassword)
    .use(Routes.chats, ChatsPageS)
    .use(Routes.page404, Error404)
    .use(Routes.page500, Error500);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.login:
    case Routes.registration:
      isProtectedRoute = false;
      break;
    default:
      break;
  }
  try {
    await AuthController.fetchUser();
    await ChatController.getChats();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.chats);
    }
  } catch {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.login);
    }
  }
});
