const { JSDOM } = require('jsdom');
const Handlebars = require('handlebars');
const fs = require('node:fs');

const { window } = new JSDOM('<div id="body"></div>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

// eslint-disable-next-line func-names
require.extensions['.hbs'] = function (module, filename) {
  const contents = fs.readFileSync(filename, 'utf8');

  module.exports = Handlebars.compile(contents);
};
// eslint-disable-next-line func-names
require.extensions['.pcss'] = function () {
  module.exports = () => ({});
};
