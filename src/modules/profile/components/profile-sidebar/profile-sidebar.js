import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './profile-sidebar.hbs';

Handlebars.registerPartial('profile-sidebar', template);
window.addEventListener('load', () => {
  const button = document.querySelector('.sidebar__button');
  if (button) {
    button.addEventListener('click', () => {
      history.go(-1);
    });
  }
});
