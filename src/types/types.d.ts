declare module '*.hbs' {
  import { TemplateDelegate } from 'handlebars';

  declare const template: TemplateDelegate;

  export default template;
}
declare module '*.runtime';
declare module '*.scss';
