import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './profile-edit-password.hbs';

Handlebars.registerPartial('profile-edit-password', template);

window.onload = function () {
  const button = document.querySelector('.button');
  button.addEventListener('click', () => {
    history.go(-1);
  });
};
