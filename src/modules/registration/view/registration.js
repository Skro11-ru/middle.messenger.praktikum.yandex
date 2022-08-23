import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './registration.hbs';

Handlebars.registerPartial('registration', template);
window.addEventListener('submit', () => {});

onsubmit = (event) => {
  event.preventDefault();
  const email = document.querySelector('#email');
  const login = document.querySelector('#login');
  const name = document.querySelector('#first_name');
  const lastName = document.querySelector('#second_name');
  const phone = document.querySelector('#phone');
  const password = document.querySelector('#password');
  const passwordAgain = document.querySelector('#passwordAgain');

  validateData('email', email);
  validateData('login', login);
  validateData('name', name);
  validateData('lastName', lastName);
  validateData('phone', phone);
  validateData('password', password);
  validateData('passwordAgain', passwordAgain);
};

const validateData = (type, value) => {
  if (!value) {
    return false;
  }
  switch (type) {
    case 'email': {
      const error = value.nextElementSibling.nextElementSibling;
      break;
    }
    case 'login': {
      const error = value.nextElementSibling.nextElementSibling;
      if (value.value.length <= 5) {
        error.style.opacity = '1';
      } else {
        error.style.opacity = '0';
      }
      break;
    }
    case 'name': {
      const error = value.nextElementSibling.nextElementSibling;
      break;
    }
    case 'lastName': {
      const error = value.nextElementSibling.nextElementSibling;
      break;
    }
    case 'phone': {
      const error = value.nextElementSibling.nextElementSibling;
      break;
    }
    case 'password': {
      const error = value.nextElementSibling.nextElementSibling;
      if (value.value.length <= 5) {
        error.style.opacity = '1';
      } else {
        error.style.opacity = '0';
      }
      break;
    }
    case 'passwordAgain': {
      const error = value.nextElementSibling.nextElementSibling;
      break;
    }
  }
  console.log(2);
};
