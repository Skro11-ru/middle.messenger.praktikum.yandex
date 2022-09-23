import renderDom from './src/helpers/renderDOM';
import { Login } from './src/modules/Login/view/Login';
import { Registration } from './src/modules/Registration/view/Registration';
import { Profile } from './src/modules/Profile/view/Profile/Profile';
import { ProfileEdit } from './src/modules/Profile/view/ProfileEdit/ProfileEdit';
import { Error500 } from './src/modules/UiKit/plug/500/500';
import { Error404 } from './src/modules/UiKit/plug/404/404';
import { ChatsPage } from './src/modules/Chat/view/Chat';
// eslint-disable-next-line max-len
import { ProfileEditPassword } from './src/modules/Profile/view/ProfileEditPassword/ProfileEditPassword';

window.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname;
  switch (path) {
    case '/':
      renderDom('#app', new Login({ title: 'Вход' }));
      break;
    case '/login':
      renderDom('#app', new Login({ title: 'Вход' }));
      break;
    case '/registration':
      renderDom('#app', new Registration({ title: 'Регистрация' }));
      break;
    case '/profile':
      renderDom('#app', new Profile({ title: 'Профиль' }));
      break;
    case '/profileEdit':
      renderDom('#app', new ProfileEdit({ title: 'Редактирование' }));
      break;
    case '/profile-edit-password':
      renderDom(
        '#app',
        new ProfileEditPassword({ title: 'Редактирование пароля' }),
      );

      break;
    case '/chats':
      renderDom('#app', new ChatsPage({ title: 'Редактирование' }));
      break;
    case '/500':
      renderDom('#app', new Error500({ title: '500', text: 'Мы уже фиксим' }));

      break;
    default:
      renderDom('#app', new Error404({ title: '404', text: 'Не туда попали' }));
      break;
  }
});
