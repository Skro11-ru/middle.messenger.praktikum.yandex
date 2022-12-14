# Учебный проект Яндекс.Практикума: веб-приложение «Чат»

[Pull request](https://github.com/Skro11-ru/middle.messenger.praktikum.yandex/pull/4)

### Результат выполнения:

> [Просмотр](https://messenger-yandex4.herokuapp.com/)

### Техническое задание:

[Дизайн-макет](<https://www.figma.com/file/51NeaiEV2zI7j3bUt5no6h/Chat_external_link-(Copy)?node-id=1%3A515>)

#### СПРИНТ 4

- Настроить Webpack-сборку.
- Настроить Docker-сборку.
- Выложить приложение на Heroku.
- Провести аудит пакетов.
- Настроить precommit на проект.
- Обновить README.md.

### Используемый стек:

- TS
- Webpack
- Handlebars
- SCSS
- Git
- HTML
- ESLint
- Stylelint
- Prettier
- Husky

---

## Команды

```bash
npm ci (preferable)    # установка зависимостей проекта (предпочтительный способ)
npm i                  # установка зависимостей проекта
npm run start          # очистка ранее сгенерированных страниц ('/dist'), сборка проекта, запуск веб-сервера (Express)
npm run dev            # запуск сервера разработки
npm run build          # сборка проекта
npm run clear          # очистка ранее сгенерированных страниц ('/dist')
npm run test           # запуск тестов
```

## Зависимости

#### Node: 16.15.0

    "@anikin/parcel-transformer-handlebars-precompile": "1.0.1",
    "@commitlint/config-conventional": "17.1.0",
    "@parcel/config-default": "^2.7.0",
    "@parcel/core": "2.7.0",
    "@parcel/transformer-typescript-tsc": "2.7.0",
    "@types/jsdom": "20.0.0",
    "@types/mocha": "9.1.1",
    "@types/node": "18.11.2",
    "@types/proxyquire": "1.3.28",
    "@types/chai": "4.3.3",
    "chai": "4.3.6",
    "@types/sinon": "10.0.13",
    "@typescript-eslint/eslint-plugin": "5.35.1",
    "@typescript-eslint/parser": "5.35.1",
    "@webpack-cli/generators": "^2.5.0",
    "autoprefixer": "10.4.8",
    "css-loader": "6.7.1",
    "eslint": "8.22.0",
    "eslint-config-airbnb-base": "15.0.0",
    "eslint-config-airbnb-typescript": "17.0.0",
    "eslint-config-prettier": "8.5.0",
    "eslint-plugin-import": "2.26.0",
    "eslint-plugin-prettier": "4.2.1",
    "eslint-plugin-sonarjs": "0.15.0",
    "eslint-plugin-unicorn": "43.0.2",
    "html-webpack-plugin": "^5.5.0",
    "husky": "8.0.1",
    "jsdom": "20.0.1",
    "lint-staged": "13.0.3",
    "mocha": "10.0.0",
    "node-sass": "^7.0.3",
    "parcel": "2.7.0",
    "postcss": "8.4.16",
    "postcss-loader": "^7.0.1",
    "postcss-modules": "4.3.1",
    "postcss-simple-vars": "6.0.3",
    "prettier": "2.7.1",
    "process": "0.11.10",
    "proxyquire": "2.1.3",
    "rimraf": "3.0.2",
    "sass": "^1.55.0",
    "sass-loader": "^13.1.0",
    "sinon": "14.0.1",
    "style-loader": "^3.3.1",
    "stylelint": "14.11.0",
    "stylelint-config-prettier": "9.0.3",
    "stylelint-config-recommended": "9.0.0",
    "stylelint-config-standard-scss": "5.0.0",
    "stylelint-order": "5.0.0",
    "stylelint-prettier": "2.0.0",
    "stylelint-scss": "4.3.0",
    "svg-inline-loader": "^0.8.2",
    "ts-loader": "^9.4.1",
    "ts-node": "10.9.1",
    "typescript": "4.8.2",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.11.1"
    "dotenv": "16.0.1",
    "express": "4.18.1",
    "handlebars": "4.7.7",
    "handlebars-loader": "1.7.2",
    "nanoid": "3.0.0"
