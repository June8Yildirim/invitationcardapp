# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **src/app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **example** directory and create a blank **src/app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Tooling

| Command                              | What it does        |
| ------------------------------------ | ------------------- |
| `npm test` / `npm run test:watch`    | Jest (`jest-expo`)  |
| `npm run format` / `format:check`    | Prettier            |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |

Husky hooks install on `npm install`:

- **pre-commit** runs Prettier, ESLint and related tests on staged files.
- **pre-push** runs the typecheck and the full test suite.

Name test files `*-test.ts(x)` inside a `__tests__` folder, and keep them out of `src/app` (every file there is a route).

## Database

`src/server/db.ts` connects to the database named by `DATABASE_URL`. PostgreSQL is the default, and the URL scheme switches the driver:

| Database   | `DATABASE_URL`                              |
| ---------- | ------------------------------------------- |
| PostgreSQL | `postgresql://user:pass@host:5432/db`       |
| MySQL      | `mysql://user:pass@host:3306/db`            |
| SQLite     | `sqlite:./data/app.db` or `sqlite::memory:` |

Copy `.env.example` to `.env.local` to configure it. To support another database, add an entry to `drivers` in `db.ts`.

The app never connects to the database directly: drivers don't run on devices, and credentials would ship inside the app. Screens call API routes, and API routes use `db.ts`. ESLint rejects `@/server` imports anywhere else.

```ts
// src/app/api/guests+api.ts
import { sql } from '@/server/db';

export async function GET(request: Request) {
  const eventId = new URL(request.url).searchParams.get('eventId');
  return Response.json(await sql`SELECT * FROM guests WHERE event_id = ${eventId}`);
}
```

Interpolated values are sent as bound parameters. In production, native apps need the API deployed and its URL set as `origin` on the `expo-router` plugin in `app.json`. SQLite needs Node 22.13 or later. `src/app/api/health+api.ts` reports whether the database is reachable.
