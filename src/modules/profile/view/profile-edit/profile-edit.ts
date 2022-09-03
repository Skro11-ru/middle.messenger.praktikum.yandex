import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './profile-edit.hbs';

Handlebars.registerPartial('profile-edit', template);
// window.addEventListener('load', () => {
//   const button = document.querySelector('.button');
//   if (button) {
//     button.addEventListener('click', () => {
//       window.history.go(-1);
//     });
//   }
// });
