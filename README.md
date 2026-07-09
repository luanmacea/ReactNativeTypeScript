# React Native TypeScript Template

Este é um repositório **template base para projetos React Native com Expo**, ideal para iniciar rapidamente novos apps com uma estrutura moderna e organizada.

Inclui:

- Expo SDK 57 + Expo Router (Stack.Protected + Tabs)
- TypeScript (strict)
- Design system próprio em `src/theme/` (tokens + papéis semânticos de cor)
- TanStack Query (estado de servidor) + Zustand (estado de cliente)
- React Hook Form + Zod
- ESLint (flat config) + Prettier + jest-expo
- CNG puro: pastas nativas geradas sob demanda com `expo prebuild`

> Convenções e arquitetura estão documentadas no `CLAUDE.md`.

---

## 🧱 Requisitos do sistema

### 📦 Dependências globais

| Nome            | Comando de instalação (Windows via PowerShell) |
| --------------- | ---------------------------------------------- |
| **Chocolatey**  | <https://chocolatey.org/install>               |
| **Node.js 20+** | `choco install nodejs-lts`                     |
| **Yarn**        | `npm install -g yarn`                          |

> Certifique-se de que o Android SDK e o emulador estejam instalados via Android Studio.
> O projeto é compatível com **Expo SDK 57** (React Native 0.86).

---

## 🚀 Como rodar o projeto

1. Instale as dependências:

```bash
yarn
```

2. Configure o ambiente (URL da API):

```bash
copy .env.example .env
```

3. Rode o app:

```bash
yarn start        # dev server (Expo Go / dev client)
yarn dev          # build nativa no dispositivo/emulador Android
```

> 💡 Se o Expo reclamar que o emulador demorou para iniciar, suba o emulador
> manualmente antes (Android Studio > Device Manager, ou
> `%LOCALAPPDATA%\Android\Sdk\emulator\emulator @<nome-do-avd>`) e rode o
> comando de novo. Se o emulador ficar `offline` no `adb devices`, faça um
> cold boot: `emulator @<nome-do-avd> -no-snapshot-load`.

---

## ✅ Validações e verificações

Atalho para rodar tudo de uma vez:

```bash
yarn validate     # lint + typecheck + test + audit + depcheck
```

### Checar estrutura e dependências do projeto:

```bash
npx expo-doctor
```

### Verificar vulnerabilidades de segurança:

```bash
yarn audit
```

### Verificar dependências não utilizadas:

```bash
depcheck
```

> Falsos positivos conhecidos ficam listados em `.depcheckrc.yml`.

### Verificar erros de código, imports não usados, problemas de estilo:

```bash
yarn lint
```

### Verificar tipos e rodar os smoke tests:

```bash
yarn typecheck
yarn test
```

---

## 🛠️ Build Android

O projeto usa **CNG puro**: as pastas `android/` e `ios/` não são versionadas —
são geradas a partir do `app.json` quando necessário:

```bash
npx expo prebuild --platform android   # gera a pasta nativa (opcional)
yarn dev                               # prebuild automático + build + instala no device
```

Qualquer configuração nativa deve ser feita via `app.json`/config plugins,
nunca editando `android/` na mão (a pasta é descartável).

---

Template criado por Luan Silveira Macea || email: [luanmacea@gmail.com](mailto:luanmacea@gmail.com)
