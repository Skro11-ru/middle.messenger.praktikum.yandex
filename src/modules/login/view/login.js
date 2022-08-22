import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './login.hbs';
Handlebars.registerPartial('login', template);
window.addEventListener('submit', () => {});

onsubmit = (event) => {
  event.preventDefault();
  const login = document.querySelector('#login');
  const password = document.querySelector('#password');
  const loginIsValid = validateData('login', login);
  const passwordIsValid = validateData('password', password);
  console.log(loginIsValid);
  console.log(passwordIsValid);
  if (loginIsValid && passwordIsValid) {
    window.location.pathname = '/chats';
  }
};

const validateData = (type, value) => {
  switch (type) {
    case 'login':
      const error = value.nextElementSibling.nextElementSibling;
      if (value.value.length <= 5) {
        error.style.opacity = '1';
        return false;
      } else {
        error.style.opacity = '0';
        return true;
      }

    case 'password': {
      const error = value.nextElementSibling.nextElementSibling;
      if (value.value.length <= 5) {
        error.style.opacity = '1';
        return false;
      } else {
        error.style.opacity = '0';
        return true;
      }
    }
    default:
      return false;
  }
};
