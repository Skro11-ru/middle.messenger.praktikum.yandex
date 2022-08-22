import '/src/modules/ui-kit/input-ui/input-ui';
import '/src/modules/profile/components/profile-row/profile-row';
import '/src/modules/profile/components/profile-avatar/profile-avatar';
import '/src/modules/profile/components/profile-sidebar/profile-sidebar';

// import '/src/modules/registration/view/registration';
import '/src/modules/ui-kit/button-ui/button-ui';
import login from './src/modules/login/view/login.hbs';
import registration from './src/modules/registration/view/registration.hbs';
import profile from './src/modules/profile/view/profile/profile.hbs';
import profileEdit from './src/modules/profile/view/profile-edit/profile-edit.hbs';
import profileEditPassword from './src/modules/profile/view/profile-edit-password/profile-edit-password.hbs';
import plug from './src/modules/ui-kit/plug/plug.hbs';
import page404 from './src/modules/ui-kit/plug/404/404.hbs';
import page500 from './src/modules/ui-kit/plug/500/500.hbs';

window.addEventListener('DOMContentLoaded', async () => {
  const app = document.querySelector('#app');
  const path = window.location.pathname;
  switch (path) {
    case '/':
      require('/src/modules/login/view/login');
      app.innerHTML = login();
      break;
    case '/login':
      require('/src/modules/login/view/login');
      app.innerHTML = login();
      break;
    case '/registration':
      require('/src/modules/registration/view/registration');
      app.innerHTML = registration();
      break;
    case '/profile':
      require('/src/modules/profile/view/profile/profile');
      app.innerHTML = profile();
      break;
    case '/profile-edit':
      require('/src/modules/profile/view/profile-edit/profile-edit');
      app.innerHTML = profileEdit();
      break;
    case '/profile-edit-password':
      require('/src/modules/profile/view/profile-edit-password/profile-edit-password');
      app.innerHTML = profileEditPassword();
      break;
    case '/chats':
      require('/src/modules/ui-kit/plug/plug');
      app.innerHTML = plug();
      break;
    case '/500':
      require('/src/modules/ui-kit/plug/500/500');
      app.innerHTML = page500();
      break;
    default:
      require('/src/modules/ui-kit/plug/404/404');
      app.innerHTML = page404();
      break;

    //  todo:вернуть к данной реализации позднее
    // case `${path}`:
    //   require(`/src/modules${path}/view${path}`);
    //   app.innerHTML = login();
    //   break;
  }
});
