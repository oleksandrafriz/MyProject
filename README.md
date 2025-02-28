# Сайт для перегляду описів мультфільмів

## Опис проекту

Сайт з перегляду мультфільмів для фанатів для тих хто хоче переглянути опис мультфільму та зробити вибір для перегляду. Використовуючи Firebase для зберігання даних, проект дозволяє користувачам досліджувати мультфільми.

## Зміст

1. [Опис проекту](#опис-проекту)
2. [Початок роботи](#початок-роботи)
   - [Передумови](#передумови)
   - [Встановлення](#встановлення)
3. [Підключення до Firebase](#підключення-до-firebase)
   - [Proxy Server](#налаштування-firebase-proxy-server)
4. [Налаштування](#налаштування)
   - [Swagger документація](#swagger-документація)
   - [Storybook](#storybook)
   - [JSDoc](#перегляд-документації-jsdoc)
5. [Запуск проекту](#запуск-проекту)
6. [Ліцензія](#ліцензія)
7. [Контриб'ютори](#контрибютори)

## Початок роботи

### Передумови

- Node.js
- npm
- Git
- Firebase

### Встановлення

1. Клонування репозиторію:

```bash
git clone https://github.com/oleksandrafriz/MyProject
```

2. Перехід у директорію проекту:

```bash
    cd cartoonProject
```

3. Встановлення залежностей:

```bash
    npm install
```

## Підключення до Firebase

1. Додайте Firebase конфігурацію до проекту, створіть файл `.env` в корені проекту:

```bash
VITE_FIREBASE_API_KEY="AIzaSyBCqUL0gC4I1UUxeGw_2i0bilzfa9SLiAU"
VITE_FIREBASE_AUTH_DOMAIN="cartoons-53912.firebaseapp.com"
VITE_FIREBASE_DATABASE_URL="https://cartoons-1376e-default-rtdb.europe-west1.firebasedatabase.app"
VITE_FIREBASE_PROJECT_ID="cartoons-53912"
VITE_FIREBASE_STORAGE_BUCKET="cartoons-53912.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="723937812099"
VITE_FIREBASE_APP_ID="1:723937812099:web:ce0f130ec3457d00e2c5b6"
VITE_FIREBASE_MEASUREMENT_ID="G-5TQR2CVE6Y"

```

### Налаштування Firebase Proxy Server

1. Створіть папку `firebase-proxy-server` у корені проекту.
2. Відкрийте термінал у цій папці та ініціалізуйте Node.js проект:

```bash
npm init -y
```

3. Встановіть необхідні пакети:

```bash
npm install express cors firebase-admin
```

4. Створіть серверний файл
   Створіть файл index.js у корені папки сервера та додайте наступний код:

```bash
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const app = express();

app.use(cors());

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://cartoons-1376e-default-rtdb.europe-west1.firebasedatabase.app/",
});

const db = admin.database();

// Маршрут для отримання списку мультфільмів
app.get("/cartoons", async (req, res) => {
  try {
    const snapshot = await db.ref("cartoons").once("value");
    const data = snapshot.val();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Помилка отримання даних" });
  }
});

// Маршрут для отримання деталей мультфільма за ID
app.get("/cartoons/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await db.ref(`cartoons/${id}`).once("value");
    const data = snapshot.val();
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: "Мультфільм не знайдено" });
    }
  } catch (error) {
    res.status(500).json({ error: "Помилка отримання даних" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});

```

5. Відкрийте термінал у папці сервера та запустіть сервер:

```bash
node index.js
```

## Налаштування

### Swagger документація

Файл swagger.json знаходиться у корені проекту. Для перегляду інтерактивної документації API переконайтеся, що у вашому проекті встановлено пакет `swagger-ui-express`:

```bash
npm install swagger-ui-express
```

#### Перегляд Swagger документації:

- Перейдіть в консолі в папку firebase-proxy-server

```bash
cd firebase-proxy-server
```

- Виконайте запуск серверу

```bash
node index.js
```

- Виконайте запуск фронтенду

```bash
npm run dev
```

- Перейдіть в браузер та відкрийте посилання:
  http://порт/swagger

### Storybook

Якщо Storybook ще не налаштовано, ініціалізуйте його:

```bash
npx sb init
```

Для запуску Storybook використовуйте:

```bash
npm run storybook
```

### Перегляд документації (JSDoc)

Знайдіть файл `index.html` у папці `docs` та перегляньте документацію у браузері.

### Запуск проекту

1. Запуск сервера:
   Перейдіть до папки

```bash
cd firebase-proxy-server
```

Та запустіть сервер командою:

- Перейдіть в консолі в папку firebase-proxy-server

```bash
cd firebase-proxy-server
```

- Виконайте запуск

```bash
node index.js
```

2. Запуск фронтенду:

```bash
npm run dev
```

## Ліцензія

Цей проект ліцензовано ліцензією MIT License. Детальніше дивіться у файлі [LICENSE](LICENSE).

## Контриб'ютори

Фріз Олександра - Основний розробник
ipz221_foi@student.ztu.edu.ua
