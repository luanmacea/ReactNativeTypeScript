# CLAUDE.md — React Native Template

## 1. Visão geral do projeto

Template base para apps React Native derivados via vibe coding. O objetivo é que
um app novo nasça deste repositório e ganhe identidade própria editando pouquíssimos
arquivos — toda decisão visual mora em `src/theme/`, todo padrão de dado tem um
exemplo canônico em `features/auth/`.

**[PLACEHOLDER: nome/objetivo do app derivado]**

Estado atual: template em manutenção ativa, refatorado em jul/2026 (relatório em
`RELATORIO-FASE1.md`). Decisões estruturais e o porquê delas:

- **Design system próprio, sem lib de UI.** `@rneui` foi removida (lib morta em RC).
  Tokens (spacing/radius/typography/elevation) + papéis semânticos de cor
  (light/dark com as mesmas chaves) + `ThemeProvider` próprio de ~100 linhas.
  Gradientes são **opt-in** (`theme.colors.gradients` + `variant="gradient"`);
  por padrão tudo é flat.
- **Servidor → TanStack Query; cliente → Zustand.** Redux foi aposentado. Cada
  feature segue o padrão `api.ts` (axios puro) / `hooks.ts` (queries e mutations)
  / `store.ts` (só se houver estado de cliente real).
- **Navegação nativa do expo-router.** `Stack.Protected` no root layout decide
  auth × app (sem tela de loading fake, sem redirect manual em useEffect);
  `(app)` usa `Tabs` nativo. Título/ícone declarados na navegação de cada grupo —
  não existe registro central de telas.
- **Auth como padrão de referência de segurança**: credenciais via POST no corpo,
  somente tokens no SecureStore (nunca o usuário, nunca senha). Os endpoints em
  `features/auth/api.ts` são exemplos — ajuste para a API real do app derivado.
- **Erro global**: tratado no `QueryClient` (`lib/queryClient.ts`) → alerta global
  (store Zustand em `lib/alerts.ts`, renderizado uma vez no root layout).
  Use `meta: { skipGlobalError: true }` na query/mutation para tratar localmente.
- **CNG puro**: pastas nativas (`android/`, `ios/`) não são versionadas — são
  geradas sob demanda com `npx expo prebuild` (o `expo run:android` faz isso
  automaticamente). Yarn classic mantido deliberadamente (fricção pnpm×Metro).

Limitação conhecida: o backend de demonstração é mock; o fluxo de auth compila e
serve de modelo, mas os endpoints `/auth/*` e `/me` precisam existir na API real.

## 2. Stack, comandos e mapa de estrutura

### Stack

Expo SDK 57 · React Native 0.86 · React 19.2 · TypeScript 6 (strict) ·
Expo Router 57 (Stack.Protected + Tabs) · TanStack Query 5 (servidor) ·
Zustand 5 (cliente) · react-hook-form + Zod 4 · axios · jest-expo +
Testing Library · ESLint flat config + Prettier · Yarn classic

### Comandos

```bash
yarn                 # instalar dependências
yarn start           # expo start (dev server)
yarn dev             # expo run:android --device
yarn lint            # eslint
yarn typecheck       # tsc --noEmit
yarn test            # jest (smoke tests)
yarn format          # prettier --write
yarn validate        # lint + typecheck + test + audit + depcheck
```

Config de ambiente: copie `.env.example` para `.env` (`EXPO_PUBLIC_API_URL`).

### Mapa de estrutura (decisão → pasta)

```
src/
  app/                  - SOMENTE rotas (expo-router). Telas compõem, não implementam.
    _layout.tsx         -   Bootstrap (splash + hidratação) + Providers + Stack.Protected
    (auth)/             -   sign-in, sign-up, reset-password (Stack nativo)
    (app)/              -   _layout.tsx = Tabs nativo; home/, menu/, profile/
  components/
    ui/                 - Primitivos do design system: Button, Text, Card, Container,
                        -   Input, Modal, Alert, Confirmation, Loading, Logo, Icon.
                        -   Consomem APENAS tokens do tema (useTheme/makeStyles).
    forms/              - Cascas react-hook-form finas sobre ui/: FormInput, FormDatePicker
  features/             - 1 pasta por domínio. Padrão fixo (copie de auth/):
    auth/
      api.ts            -   funções axios puras
      hooks.ts          -   useQuery/useMutation da feature
      store.ts          -   Zustand (só para estado de cliente real, ex.: sessão)
  theme/                - ÚNICA fonte de decisão visual
    tokens.ts           -   spacing, radius, typography, elevation
    colors.ts           -   papéis semânticos (ThemeColors), light + dark, gradients opt-in
    provider.tsx        -   ThemeProvider + useTheme + useThemeMode + makeStyles
  lib/                  - Infra transversal: api.ts (axios + interceptor de token),
                        -   queryClient.ts (erro global), storage.ts (SecureStore tipado),
                        -   alerts.ts (store do alerta global)
  utils/                - Funções puras: format.ts (datas via Intl), validators.ts (Zod/CPF)
  types/                - Tipos globais compartilhados (IUser, AuthTokens)
  assets/               - Imagens e logos
```

Regra: nada de pasta nova fora dessas categorias. Tela nova → `app/`; visual
reutilizável → `components/ui/`; lógica de domínio → `features/<domínio>/`;
decisão visual → `theme/`.

## 3. Convenções

- **Nomenclatura**: componentes em PascalCase (`components/ui/Button.tsx`, arquivo
  único, sem pasta+index); hooks `useXxx` em `features/<x>/hooks.ts`; stores
  `useXxxStore` em `features/<x>/store.ts`. Código em inglês, strings de UI e
  comentários em português (com acentuação correta).
- **Componente**: props tipadas por `interface` local, export default de função.
- **Estado**: servidor → TanStack Query (`features/<x>/hooks.ts`); cliente →
  Zustand (`features/<x>/store.ts`). NUNCA estado de servidor em store.
- **Estilização**: só tokens via `useTheme()`/`makeStyles`. Estilo estático →
  `StyleSheet.create` no fim do arquivo; estilo dependente do tema →
  `const useStyles = makeStyles((theme) => ({...}))` no escopo do módulo.
  Cor literal (hex/rgba) é proibida fora de `src/theme/` — o lint quebra o build.
- **Forms**: schema Zod por tela + `FormProvider` + `components/forms/FormInput`;
  validadores compartilhados (CPF, e-mail, senha) vêm de `utils/validators.ts`.

## 4. Design system — como usar

```tsx
// Estilo dependente do tema
const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
  },
}))

// Valores pontuais dentro do componente
const theme = useTheme()
<Feather color={theme.colors.primary} />
```

- Customizar o visual do app derivado = editar SOMENTE `src/theme/`
  (`colors.ts` para cores, `tokens.ts` para escalas). **[PLACEHOLDER: identidade
  visual do projeto]**
- Gradientes: preencha `gradients: { primary: [...], card: [...] }` nas paletas
  em `colors.ts` e use `<Button variant="gradient">` / `<Card variant="gradient">`.

## 5. Como a IA deve trabalhar aqui

- Procurar antes de criar (Grep em `components/ui/`, `features/`, `utils/`) —
  NÃO recriar o que já existe.
- `features/auth/` é o exemplo canônico a copiar para features novas.
- Rodar `yarn lint && yarn typecheck && yarn test` antes de concluir qualquer tarefa.

## 6. O que NÃO fazer

- Cravar cores/tamanhos em componente ou tela (use tokens; o lint pega hex/rgba).
- Criar abstração para uso único ou providers novos sem necessidade.
- Estado de servidor em Zustand; lógica de domínio dentro de `app/`.
- Reintroduzir Redux, React Native Elements (@rneui), registro central de
  navegação ou tela de loading para bootstrap.
- Persistir usuário/senha no SecureStore (somente tokens).

## 7. Específico deste projeto

**[PLACEHOLDER — seção vazia no template; preencha no app derivado]**
