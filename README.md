# Учебный проект Яндекс.Практикума: веб-приложение «Чат»

[Pull request](https://github.com/Skro11-ru/middle.messenger.praktikum.yandex/pull/2)

### Результат выполнения:

> [Просмотр](https://messenger-yandex2.netlify.app/)

### Техническое задание:

[Дизайн-макет](<https://www.figma.com/file/51NeaiEV2zI7j3bUt5no6h/Chat_external_link-(Copy)?node-id=1%3A515>)

#### СПРИНТ 2

- Сделать страницу со списком чатов и лентой переписки.
- Внедрить TypeScript в проект.
- Настроить статический анализ кода.
- Структурировать файлы согласно советам по архитектуре.
- Организовать сбор данных из форм.
- Добавить валидацию на все формы.
- Добавить компонентный подход.
- Сделать компонент кнопки на основе уже свёрстанных макетов, шаблонизатора и модульности приложения.
- Добавить работу с запросами.
- Обновить README.md.

### Используемый стек:

- TS
- Parcel
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
```

## Зависимости

#### Node: 16.15.0

    "@anikin/parcel-transformer-handlebars-precompile": "1.0.1",
    "@commitlint/config-conventional": "17.1.0",
    "@parcel/config-default": "^2.7.0",
    "@parcel/core": "2.7.0",
    "@parcel/transformer-sass": "2.7.0",
    "@parcel/transformer-typescript-tsc": "^2.7.0",
    "@typescript-eslint/eslint-plugin": "5.35.1",
    "@typescript-eslint/parser": "5.35.1",
    "autoprefixer": "10.4.8",
    "eslint": "8.22.0",
    "eslint-config-airbnb-base": "15.0.0",
    "eslint-config-airbnb-typescript": "17.0.0",
    "eslint-config-prettier": "8.5.0",
    "eslint-plugin-import": "2.26.0",
    "eslint-plugin-prettier": "4.2.1",
    "eslint-plugin-sonarjs": "0.15.0",
    "eslint-plugin-unicorn": "43.0.2",
    "husky": "8.0.1",
    "lint-staged": "13.0.3",
    "parcel": "2.7.0",
    "postcss": "8.4.16",
    "postcss-modules": "4.3.1",
    "postcss-simple-vars": "6.0.3",
    "prettier": "2.7.1",
    "process": "0.11.10",
    "rimraf": "3.0.2",
    "stylelint": "14.11.0",
    "stylelint-config-prettier": "9.0.3",
    "stylelint-config-recommended": "9.0.0",
    "stylelint-config-standard-scss": "5.0.0",
    "stylelint-order": "5.0.0",
    "stylelint-prettier": "2.0.0",
    "stylelint-scss": "4.3.0",
    "typescript": "4.8.2",
    "dotenv": "16.0.1",
    "express": "4.18.1",
    "handlebars": "4.7.7",
    "nanoid": "4.0.0"
