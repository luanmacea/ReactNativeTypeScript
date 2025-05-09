# React Native TypeScript Template

Este é um repositório **template base para projetos React Native com Expo**, ideal para iniciar rapidamente novos apps com uma estrutura moderna e organizada.

Inclui:

- Expo + Expo Router
- TypeScript
- ESLint + Prettier
- React Hook Form + Zod
- Estrutura de pastas preparada
- Pronto para rodar em Android e Web

---

## 🧱 Requisitos do sistema

### 📦 Dependências globais

| Nome            | Comando de instalação (Windows via PowerShell) |
| --------------- | ---------------------------------------------- |
| **Chocolatey**  | <https://chocolatey.org/install>               |
| **Node.js 18+** | `choco install nodejs-lts`                     |
| **Yarn**        | `npm install -g yarn`                          |
| **Expo CLI**    | `npm install -g expo-cli`                      |
| **Depcheck**    | `npm install -g depcheck`                      |

> Certifique-se de que o Android SDK e o emulador estejam instalados via Android Studio.
> O projeto é compatível com **Expo SDK 52** (React Native 0.76).

---

## 🚀 Como rodar o projeto

1. Instale as dependências:

```bash
yarn
```

2. Rode o app:

```bash
npx expo start
```

---

## ✅ Validações e verificações

### Checar estrutura e dependências do projeto:

```bash
npx expo-doctor
```

> ⚠️ Um aviso sobre "app config fields not synced in a non-CNG project" pode aparecer devido à pasta `android/`.
> **Esse aviso pode ser ignorado com segurança**, pois o projeto é sincronizado com `expo prebuild`.

---

### Verificar vulnerabilidades de segurança:

```bash
yarn audit
```

---

### Verificar dependências não utilizadas:

```bash
depcheck
```

---

### Verificar erros de código, imports não usados, problemas de estilo:

```bash
yarn lint
```

---

---

## 🛠️ Build Android

Como o projeto mantém a pasta `android/`, você pode gerar builds locais ou de produção.

Para aplicar as configurações do `app.json` ao projeto nativo:

```bash
npx expo prebuild
```

Para rodar no emulador simulando um celular android de verdade:

```bash
yarn dev
```

---

Template criado por Luan Silveira Macea || email: [luanmacea@gmail.com](mailto:luanmacea@gmail.com)
