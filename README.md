# Track&Trace Learning Portal

Современный обучающий сайт для новых и текущих пользователей информационной системы Track&Trace.

## Функции

- Главная страница с описанием системы.
- Выбор роли пользователя.
- Индивидуальные обучающие маршруты по ролям.
- Разделы для новых и текущих пользователей.
- Пошаговые инструкции и видео-заглушки.
- Интерактивные чек-листы с сохранением прогресса в `localStorage`.
- Тесты после каждого модуля.
- FAQ, поиск по материалам, частые ошибки и поддержка.
- Адаптивный интерфейс для desktop и mobile.

## Структура файлов

```text
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src
    ├── App.tsx
    ├── main.tsx
    ├── styles.css
    ├── components
    │   ├── Checklist.tsx
    │   ├── FAQAccordion.tsx
    │   ├── Footer.tsx
    │   ├── Header.tsx
    │   ├── ModuleCard.tsx
    │   ├── ProgressBar.tsx
    │   ├── Quiz.tsx
    │   ├── RoleCard.tsx
    │   ├── SearchBar.tsx
    │   ├── Sidebar.tsx
    │   └── VideoPlaceholder.tsx
    ├── data
    │   └── trainingData.ts
    ├── pages
    │   ├── FAQPage.tsx
    │   ├── HomePage.tsx
    │   ├── LearningPathPage.tsx
    │   ├── ModulePage.tsx
    │   ├── QuizPage.tsx
    │   ├── RoleSelectionPage.tsx
    │   └── SupportPage.tsx
    ├── types
    │   └── training.ts
    └── utils
        └── progress.ts
```

## Запуск проекта

```bash
npm install
npm run dev
```

После запуска откройте адрес, который покажет Vite, обычно:

```text
http://localhost:5173
```

## Сборка

```bash
npm run build
```

## Публикация на GitHub Pages

Проект уже содержит workflow `.github/workflows/deploy.yml`. Он собирает приложение и публикует папку `dist` через GitHub Actions.

1. Создайте новый репозиторий на GitHub.
2. Загрузите проект в репозиторий и отправьте изменения в ветку `main`.
3. Откройте репозиторий на GitHub.
4. Перейдите в `Settings` -> `Pages`.
5. В блоке `Build and deployment` выберите `Source: GitHub Actions`.
6. Откройте вкладку `Actions` и дождитесь выполнения workflow `Deploy to GitHub Pages`.
7. Готовый сайт появится по адресу вида:

```text
https://<github-user>.github.io/<repository-name>/
```

В проекте используется `HashRouter`, поэтому маршруты работают на GitHub Pages без отдельной backend-настройки и без `404.html`.

## Расширение данных

Все моковые данные находятся в `src/data/trainingData.ts`.

Чтобы добавить новую роль:

1. Добавьте объект в массив `roles`.
2. Укажите `id`, название, описание, иконку и список модулей.
3. Для модулей используйте структуру `Module` из `src/types/training.ts`.

Проект не использует backend. Будущую авторизацию можно подключить в `Header`, а профиль пользователя и права доступа передавать в страницы через контекст или состояние приложения.
