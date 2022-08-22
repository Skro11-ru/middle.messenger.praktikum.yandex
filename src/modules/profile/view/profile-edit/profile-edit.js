import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './profile-edit.hbs';

Handlebars.registerPartial('profile-edit', template);

window.onload = function () {
  const button = document.querySelector('.button');
  button.addEventListener('click', () => {
    history.go(-1);
  });
};
