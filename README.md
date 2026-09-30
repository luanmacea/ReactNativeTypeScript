# React Native TypeScript Template

A **production-ready starter for React Native apps with Expo** — the base I use to start every new mobile project, with a modern, organized structure from day one. Click **Use this template** to start your own.

What's included:

- Expo SDK 57 + Expo Router (`Stack.Protected` + Tabs)
- TypeScript (strict)
- Its own design system in `src/theme/` (tokens + semantic color roles)
- TanStack Query (server state) + Zustand (client state)
- React Hook Form + Zod
- ESLint (flat config) + Prettier + jest-expo
- Pure CNG: native folders are generated on demand with `expo prebuild`
- A **mock mode** to run the whole app without a back-end

> Conventions and architecture are documented in `CLAUDE.md`.

---

## 🧱 Requirements

### 📦 Global dependencies

| Name            | Install command (Windows, PowerShell) |
| --------------- | ------------------------------------- |
| **Chocolatey**  | <https://chocolatey.org/install>      |
| **Node.js 20+** | `choco install nodejs-lts`            |
| **Yarn**        | `npm install -g yarn`                 |

> Make sure the Android SDK and an emulator are installed through Android Studio.
> The project targets **Expo SDK 57** (React Native 0.86).

---

## 🚀 Running the project

1. Install the dependencies:

```bash
yarn
```

2. Configure the environment (API URL):

```bash
copy .env.example .env
```

3. Run the app:

```bash
yarn start        # dev server (Expo Go / dev client)
yarn dev          # native build on an Android device/emulator
```

### 🧪 Mock mode (no back-end)

To browse the app without a real API (authentication is replaced by mocks):

```bash
yarn dev:test     # native build + mock mode
yarn start:test   # dev server only, in mock mode (if the app is already installed)
```

Login: **admin** · Password: **123**

The mode is controlled by `EXPO_PUBLIC_MOCK_API` (inlined into the bundle by Metro):
switching modes requires restarting the dev server — if a regular `yarn start` is
running, close it before `dev:test`. Mocks live in `src/features/<feature>/mock.ts`.

> 💡 If Expo complains that the emulator took too long to start, launch the emulator
> manually first (Android Studio > Device Manager, or
> `%LOCALAPPDATA%\Android\Sdk\emulator\emulator @<avd-name>`) and run the command
> again. If the emulator shows as `offline` in `adb devices`, cold boot it:
> `emulator @<avd-name> -no-snapshot-load`.

---

## ✅ Checks

Run everything at once:

```bash
yarn validate     # lint + typecheck + test + audit + depcheck
```

### Project structure and dependencies:

```bash
npx expo-doctor
```

### Security vulnerabilities:

```bash
yarn audit
```

### Unused dependencies:

```bash
depcheck
```

> Known false positives are listed in `.depcheckrc.yml`.

### Code errors, unused imports, style issues:

```bash
yarn lint
```

### Types and smoke tests:

```bash
yarn typecheck
yarn test
```

---

## 🛠️ Android build

The project uses **pure CNG**: the `android/` and `ios/` folders are not committed —
they are generated from `app.json` when needed:

```bash
npx expo prebuild --platform android   # generate the native folder (optional)
yarn dev                               # automatic prebuild + build + install on the device
```

Any native configuration goes through `app.json`/config plugins, never by editing
`android/` by hand (the folder is disposable).

---

Template by Luan Silveira Macea · [luanmacea@gmail.com](mailto:luanmacea@gmail.com) · [@luanmacea](https://github.com/luanmacea)
