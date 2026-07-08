# Relatório Fase 1 — Análise crítica do template React Native + TypeScript

> Data: 2026-07-08 · Branch analisada: `feature/refactor` · Nenhum arquivo foi alterado.
> Pesquisa de ecossistema feita na data de hoje (fontes ao final).

---

## 1. Sumário executivo

O template está bem acima da média em disciplina (TS `strict`, Prettier, imports ordenados, componentes pequenos), mas tem **quatro problemas estruturais**:

1. **O "design system" não é um sistema — é uma paleta.** Só existem tokens de cor (no vocabulário confuso do RNE: `grey0`–`grey4`), e todas as demais decisões visuais (gradientes, raios, sombras, tipografia, espaçamento) estão cravadas dentro dos componentes. É exatamente por isso que todo app derivado "sai com a mesma cara": mudar o visual exige editar componente por componente, não um arquivo de tema.
2. **Fundação visual sobre biblioteca morta.** `@rneui` (React Native Elements) v4 nunca saiu de release candidate e não é mais mantida ativamente. O tema inteiro (`createTheme`) e o `Text` dependem dela — e ela é usada em só 4 arquivos, ou seja, é barato sair.
3. **Redux carregando o que não é dele.** Tema, alerta global e auth vivem em Redux com thunks fazendo side-effects de storage. Não existe camada de server state (cache, retry, invalidação — tudo manual via `isLoading`/`error` em slice). O padrão dominante hoje é TanStack Query (servidor) + Zustand (cliente), e para um template ele reduz drasticamente o boilerplate que uma IA precisa replicar.
4. **Defasagem de plataforma.** Expo SDK 53 / RN 0.79 / React 19.0 → o atual é SDK 57 (30/jun/2026) / RN 0.86 / React 19.2. Três majors atrás, com correções de segurança e o `Stack.Protected` que elimina o hack da tela de loading.

Além disso: 2 dependências com **zero usos** (`react-native-paper`, `react-native-vector-icons`), um `.d.ts` que **falsifica os tipos** de `react-native-svg`, ESLint que quase não valida TypeScript, e nenhum teste.

O que **não** recomendo mudar: Yarn (sem dor concreta; pnpm tem fricção conhecida com Metro), Expo Router (correto e atual), react-hook-form + Zod (padrão de mercado, manter), TS strict/Prettier/EditorConfig (bons como estão).

---

## 2. Diagnóstico detalhado

### 2.1 Design system / estilização — a dor central

**Estado atual.** `src/constants/theme.ts` define duas paletas via `createTheme` do RNE + um objeto `cardAppearance` com gradientes hardcoded. O modo do tema vive num slice Redux (`themeSlice`) que duplica as cores da paleta no estado. Componentes leem cores via `useAppSelector(selectThemeState)`. Existe ainda um `ThemeProvider` do RNE nos layouts — uma segunda fonte de verdade que quase nada consome (só o `Text`).

**Por que o template engessa o visual (diagnóstico preciso):**

- **Tokens só de cor.** Não há tokens de espaçamento, raio, tipografia ou elevação. Cada componente inventa os seus: `borderRadius: 8` no Button, `18` no Card, `6` no TextInput, `12` no Modal, `16` no menu. Um app derivado que queira visual "quadrado" ou "pill" precisa caçar números mágicos em 15 arquivos.
- **Decisões visuais cravadas em componente.** O gradiente é o exemplo perfeito: `Button` renderiza `LinearGradient` de `primary → black` incondicionalmente no variant primário; `Card` tem gradiente como *default* (`variant = 'gradient'`) com cores vindas de `cardAppearance` hardcoded. O gradiente não é um token que o app escolhe — é anatomia do componente. Resultado: todo app tem botão degradê e card degradê, goste ou não.
- **Vocabulário de cor ilegível.** `grey0`–`grey4` do RNE são semânticos invertidos entre light/dark (`grey0` = branco no light, quase-preto no dark). Nem humano nem IA consegue prever o que `grey3` significa sem abrir o arquivo. Faltam papéis semânticos: `surface`, `text`, `textMuted`, `border`.
- **Vazamento de hex soltos.** `sign-in/index.tsx` tem `#B8860B` e `#DAA520` cravados; `menu/index.tsx` tem `rgba(...)` e `#F5E3B4`/`#241B0D` inline; fallbacks mortos de outro projeto (`#F7CA02`, `#FF6600`) no Button. São furos no tema: dark mode e customização quebram silenciosamente nesses pontos.
- **Duplicação de fonte de verdade.** Cores existem em 3 lugares: paleta RNE, cópia no estado Redux, e `cardAppearance` fora do tema.

**Recomendação.** Substituir tudo por um design system próprio, explícito e minúsculo, em `src/theme/`:

- `tokens.ts` — escalas neutras de projeto: `spacing`, `radius`, `typography` (tamanhos/pesos nomeados), `elevation`. Não mudam por tema.
- `colors.ts` — papéis semânticos por tema: `background`, `surface`, `surfaceAlt`, `text`, `textMuted`, `primary`, `onPrimary`, `border`, `success`, `error`, `warning`. Light e dark são dois objetos com as **mesmas chaves** (tipados por um único `interface ThemeColors`).
- `ThemeProvider` próprio (~80 linhas): React Context + persistência do modo em AsyncStorage + `useTheme()`. Sem Redux, sem lib.
- **Convenção única de estilo**: `StyleSheet.create` estático quando não depende de tema; função `makeStyles(theme)` memoizada quando depende. Proibido hex fora de `src/theme/` (regra de lint pega isso — ver 2.7).
- **Gradiente vira opt-in**: `Button` e `Card` ficam flat por padrão, com bom gosto via tokens; se o app quiser gradiente, define `theme.gradients` e usa `variant="gradient"` explicitamente. A dor original morre aqui: customizar o visual de um app derivado = editar apenas `src/theme/`.

**Justificativa.** Zero dependência nova, zero mágica, 100% previsível para IA ("cor → `theme/colors.ts`, espaçamento → `theme/tokens.ts`"), e resolve a causa raiz (decisão visual fora de componente).

**Alternativa avaliada — Unistyles 3.** Estável desde 2025, madura, API estilo StyleSheet com temas/variants/breakpoints nativos (C++/Fabric). É a melhor lib da categoria hoje para seus critérios. Ainda assim, para um *template*, ela adiciona babel plugin + dependência de arquitetura nova por um ganho que você não precisa (breakpoints/adaptive themes). Fica como upgrade opcional futuro. NativeWind e Tamagui: descartados para seus critérios — sintaxe Tailwind e compilador próprio são exatamente o tipo de "abstração esperta" que você pediu para evitar.

**Tradeoffs/custo.** Reescrever ~10 componentes e remover `@rneui` (4 arquivos). 1–2 dias. Risco baixo: componentes são pequenos e sem consumidores externos.

**Prioridade: PRECISA MUDAR.**

---

### 2.2 Gerenciamento de estado

**Estado atual.** Redux Toolkit com 3 slices: `auth` (thunks fazendo HTTP + SecureStore), `theme` (modo + cópia das cores), `global` (alerta). Sem camada de server state: loading/erro manuais em cada slice, sem cache/retry/invalidation.

**Problema.** Redux Toolkit não é uma escolha errada — é maduro e mantido. O problema é **o que está dentro dele** e **o custo por feature**: o fluxo auth fake soma ~350 linhas em 3 arquivos (slice + thunks + selectors) para o que TanStack Query + um store minúsculo expressam em ~80. Num template para vibe coding, cada feature nova força a IA a replicar essa cerimônia — mais superfície para errar. E a pesquisa confirma a direção do ecossistema: uso de Redux em RN caiu de ~57% para ~38%, com "TanStack Query para servidor + Zustand para cliente" como padrão dominante em 2026.

**Recomendação.**
- **TanStack Query** para todo estado de servidor (fetch, cache, retry, invalidation, `isLoading`/`error` de graça). `QueryClientProvider` no root layout; hooks por feature (`useSignIn`, `useProfile`).
- **Zustand** para o pouco estado de cliente real: sessão de auth (token/user em memória, hidratada do SecureStore) e o que mais o app derivado precisar. Um store por domínio, em `features/<dominio>/store.ts`.
- Tema **sai do estado global** e vira o ThemeProvider da seção 2.1.
- Alerta global: ou um store Zustand de 20 linhas, ou (melhor) tratamento de erro no `QueryClient` + componente de toast/alert.

**Justificativa.** Menos boilerplate repetível, padrão explícito ("servidor → query; cliente → store da feature"), sem provider de Redux, e a IA tem um exemplo canônico pequeno para imitar.

**Tradeoffs/custo.** Migração de tudo que toca selectors (~15 arquivos). Perde Redux DevTools (Zustand tem middleware devtools se quiser). Se seus apps derivados tendem a times grandes/regras de negócio pesadas no cliente, RTK continuaria defensável — mas seu histórico (apps a partir de template solo) aponta para o par leve.

**Prioridade: PRECISA MUDAR** (a ausência de server-state layer é o ponto mais defasado; a troca Redux→Zustand vem junto no mesmo movimento).

---

### 2.3 Navegação

**Estado atual.** Expo Router 5 (escolha certa). Porém:

- **Tela `/loading` com `setTimeout(3000)` artificial** decide a rota inicial e faz redirect manual. 3 segundos de espera fabricada em todo cold start.
- **Guards manuais via `useEffect`** nos layouts (`if (!user?.id) router.replace(...)`) — roda depois do render, permite flash de tela protegida.
- **Header e tab bar reimplementados à mão** em `(app)/_layout.tsx` (~120 linhas de View/Touchable) dirigidos por um registro central `src/mocks/navigation.tsx` que casa **strings de pathname** (`pathname.replace(/^\//, '') + '/index'`). Frágil (quebra se a rota ganhar segmento), invisível para a IA (adicionar tela exige descobrir esse registro escondido numa pasta chamada `mocks/`), e joga fora o header/tabs nativos do router.
- Em `(auth)/_layout.tsx`, `useNavigation()` é chamado dentro do callback `headerTitle` — hook fora de componente, violação das rules of hooks que funciona por acidente.

**Recomendação.**
- **`Stack.Protected`** (disponível desde o Router v5/SDK 53, oficial e estável): root layout com `<Stack.Protected guard={isAuthenticated}>` para `(app)` e `guard={!isAuthenticated}` para `(auth)`. Elimina a tela de loading fake, os redirects manuais e o flash. Bootstrap (ler SecureStore/tema) acontece no root layout segurando a splash screen (`expo-splash-screen`), não numa rota.
- **`Tabs` do expo-router** para o footer e header nativo com `options` por tela. Deletar `src/mocks/navigation.tsx`; título/ícone de cada tela declarados na própria tela/layout — onde a IA espera encontrá-los.

**Tradeoffs/custo.** Perde o header 100% customizado (recuperável via `headerTitle`/`tabBar` custom se um app precisar). ~1 dia. Risco baixo.

**Prioridade: PRECISA MUDAR.**

---

### 2.4 Data fetching e serviços

**Estado atual.** `api.ts`: axios com `baseURL: 'http://10.0.2.2:3000'` hardcoded. `constants/environment-variables.ts` define um mapa `uri` por ambiente que **ninguém usa**. `interceptors.ts` é importado por side-effect no provider do Redux, despacha alerta global direto na store, e contém exclusões de rotas `'/permissoes'` — sobra de outro projeto. O fluxo de auth demo manda **senha como query param** num GET e grava o **usuário inteiro (com senha) no SecureStore**.

**Problema.** Configuração de ambiente fantasma, acoplamento serviço→store via import com efeito colateral (mágica difícil de rastrear), e um exemplo de auth que ensina um padrão inseguro para todo app derivado.

**Recomendação.**
- `src/lib/api.ts`: axios único com `baseURL` de `process.env.EXPO_PUBLIC_API_URL` (mecanismo oficial do Expo; `.env.example` no repo). Deletar o mapa `uri`.
- Erro global tratado no `QueryClient` (query/mutation `onError`), não em interceptor acoplado a store. Interceptor fica só para injetar `Authorization` a partir da sessão.
- Auth demo reescrito como **padrão de referência**: POST de credenciais, apenas tokens no SecureStore, perfil em TanStack Query. Mesmo sendo mock, o template é o exemplo que os projetos copiam.

**Prioridade: PRECISA MUDAR** (a parte de env/interceptor); o redesenho do fluxo auth demo acompanha 2.2.

---

### 2.5 Forms

**Estado atual.** react-hook-form + Zod + `@hookform/resolvers`, inputs conectados via `useFormContext`. Escolha correta e atual — **manter**.

Ajustes menores:
- **Zod 3 → 4**: v4 é estável e o resolver detecta a versão automaticamente. Sem urgência; fazer junto do upgrade geral. *Seria bom.*
- `TextInput` mistura responsabilidade de formulário (useController) com aparência; ao migrar o design system, extrair o visual para um primitivo `ui/Input` e manter `FormInput` como casca RHF fina. *Seria bom.*
- Duplicação de schemas de CPF entre telas → `src/utils/validators.ts` com schemas Zod reutilizáveis. *Seria bom.*

---

### 2.6 Dependências

Situação em 08/07/2026 (Expo SDK 57 estável desde 30/06/2026, RN 0.86, React 19.2):

| Pacote | Estado no template | Diagnóstico | Ação |
|---|---|---|---|
| `expo` 53 / `react-native` 0.79.5 / `react` 19.0 | 3 majors atrás | Correções de segurança, New Arch consolidada, upgrades ficam mais caros quanto mais espera | **Upgrade para SDK 57** (caminho 53→54→55→56→57, um por vez, `npx expo install --fix` em cada passo) — *precisa* |
| `react-native-paper` ^5.13 | **0 usos** | Peso morto + confunde IA ("qual UI lib eu uso?") | **Remover** — *precisa* |
| `react-native-vector-icons` ^10.2 | **0 usos** (só `@expo/vector-icons` é usado) | Peso morto | **Remover** — *precisa* |
| `@rneui/base` + `@rneui/themed` 4.0-rc | RC eterno, **não mais mantida ativamente**; usada em só 4 arquivos | Fundação do tema sobre lib morta | **Remover** junto com o design system (2.1) — *precisa* |
| `zod` ^3.24 | v3 ainda suportada; v4 estável | Sem risco imediato | Migrar para v4 no upgrade — *seria bom* |
| `date-fns` ^4.1 | Usada em 1 função, com hack de timezone comentado | `Intl` (já usado no DatePicker) cobre os casos do template | Remover e padronizar util próprio com `Intl` — *opcional* |
| `axios` ^1.11 | OK, mantida | Atualizar minor no upgrade | Manter |
| `resolutions` (form-data, on-headers, plugin-kit) | Pins de audit de 2025 | Provavelmente obsoletos pós-upgrade | Reavaliar e limpar após SDK 57 — *seria bom* |
| `expo.doctor.exclude` no package.json | Silencia avisos exatamente dos pacotes problemáticos (rneui, vector-icons) | Sintoma virou configuração | Deletar junto com os pacotes |
| `src/types/react-native-svg.d.ts` | **Declara tipos falsos para uma lib que não está instalada**; se alguém instalar `react-native-svg`, esse stub **sobrescreve os tipos reais** silenciosamente | Bomba-relógio de DX | **Deletar** — *precisa* |
| Yarn classic | Funciona, lockfile ok | Sem dor concreta; pnpm×Metro tem fricção conhecida | **Manter** (conforme seu critério) |

---

### 2.7 Tooling

- **ESLint (precisa).** A flat config atual aplica ao TS apenas `eslint.configs.recommended` (regras de JS) + `no-unused-vars` + prettier + ordem de imports. O plugin `@typescript-eslint` está instalado mas **nenhuma regra dele além de no-unused-vars está ativa**, e falta `eslint-plugin-react-hooks` — que teria apontado as deps faltantes nos `useEffect` do template e o hook em callback do layout auth. Recomendo: `typescript-eslint` presets recomendados + `react-hooks` + uma regra `no-restricted-syntax`/`no-color-literals` proibindo hex fora de `src/theme/` (guard-rail barato que protege o design system de humanos e IAs). Custo: horas.
- **TypeScript (opcional).** `strict` já ativo — bom. Limpar: `include: ["app"]` aponta para pasta inexistente; o array `types` é desnecessário com o base do Expo.
- **Testes (seria bom).** Zero infra de teste. Mínimo sustentável: `jest-expo` + `@testing-library/react-native`, smoke tests dos primitivos de `ui/` e do ThemeProvider, script `test`. Não é para cobertura — é para a IA ter onde verificar que não quebrou nada e um padrão de teste para copiar.
- **Scripts (seria bom).** Adicionar `format` e `test` ao `validate`. `yarn audit` em CI/validate mantido.
- **CNG / pasta `android/` commitada (seria bom).** 43 arquivos nativos versionados. Para um *template*, isso significa que cada upgrade de SDK gera churn nativo manual e todo projeto derivado nasce com nativo desatualizado. Recomendo adotar CNG puro: apagar `android/` do repo, gerar com `npx expo prebuild` quando precisar. Tradeoff: se você costuma editar código nativo na mão, precisará de config plugins — sinalizo como decisão sua.
- **CI (opcional).** GitHub Action rodando `lint + typecheck (+ test)` em PR. Barato e guarda o template contra regressão.

---

### 2.8 Anti-padrões pontuais (código)

Itens cirúrgicos, todos resolvidos de tabela pelas seções acima, listados para rastreabilidade:

1. `StyleSheet.create` **dentro do render** em `Button`, `Container`, e `createStyles(theme)` recriado a cada render em `TextInput`, `Confirmation`, `DatePicker` — recria objetos a cada render; padronizar `makeStyles` memoizado (2.1).
2. `Container` espalha a prop `style` **dentro** do `StyleSheet.create` — quebra o contrato de style array do RN.
3. `createStyles(theme: any)` — `any` no tema desliga o typecheck exatamente onde o design system mais precisa dele.
4. Estilos mortos: `Confirmation` carrega ~8 estilos não usados (overlay, cancelButton, confirmText...); `Alert` tem `styles.container` órfão. Sobras de refactors que poluem o contexto da IA.
5. Fallbacks fantasma de outro projeto: `#F7CA02`, `#FF6600` (Button), `'orange'`, `'green'` (Alert/Confirmation).
6. `console.log/error` como tratamento de erro em thunks e na tela de loading.
7. Pasta `src/mocks/` contendo **configuração real de navegação** — nome que engana humano e IA (2.3).
8. Comentários com acentuação corrompida (`nao`, `usuario`) e mistura PT/EN em mensagens — padronizar.

---

## 3. Priorização (impacto × esforço)

### PRECISA MUDAR
| # | Item | Impacto | Esforço |
|---|---|---|---|
| 1 | Design system próprio com tokens + ThemeProvider; remover `@rneui`; gradiente opt-in | Resolve a dor central | 1–2 dias |
| 2 | TanStack Query (servidor) + Zustand (cliente); aposentar Redux; tema fora do estado global | Arquitetura atual e menos boilerplate | 1–2 dias |
| 3 | `Stack.Protected` + `Tabs` nativos; deletar tela loading fake e `mocks/navigation.tsx` | Corrige UX e fragilidade | ~1 dia |
| 4 | Upgrade Expo SDK 53→57 (passo a passo) | Segurança e suporte | 0,5–1 dia |
| 5 | Remover `react-native-paper`, `react-native-vector-icons`, stub `react-native-svg.d.ts` | Higiene, zero risco | < 1 h |
| 6 | Env via `EXPO_PUBLIC_API_URL`; limpar interceptor (`/permissoes`) e `uri` morto | Corrige mágica e sobras | ~2 h |
| 7 | ESLint: presets typescript-eslint + react-hooks + regra anti-hex fora do tema | Guard-rails para IA | ~2 h |

### SERIA BOM MUDAR
| # | Item | Nota |
|---|---|---|
| 8 | Estrutura de pastas alvo (seção 4) com `features/` e `ui/` | Junto com itens 1–3 |
| 9 | Auth demo como padrão de referência seguro (tokens no SecureStore, não o user com senha) | Junto com item 2 |
| 10 | jest-expo + Testing Library com smoke tests | Base de verificação p/ IA |
| 11 | Zod 3→4 | Sem urgência; resolver detecta ambas |
| 12 | CNG puro (remover `android/` do repo) | Decisão sua — ver tradeoff em 2.7 |
| 13 | Limpar `resolutions` e `expo.doctor.exclude` pós-upgrade | Follow-up do item 4 |
| 14 | Validators Zod reutilizáveis (CPF) em `utils/validators.ts` | Deduplicação |

### OPCIONAL
| # | Item |
|---|---|
| 15 | Remover `date-fns` (padronizar `Intl`) |
| 16 | CI (GitHub Actions: lint + typecheck + test) |
| 17 | Unistyles 3 no lugar do ThemeProvider próprio (upgrade futuro, se sentir falta de variants/breakpoints) |
| 18 | Limpeza de tsconfig (`include`, `types`) |

**Não mudar:** Yarn, Expo Router, react-hook-form + Zod, TS strict, Prettier, EditorConfig.

---

## 4. Estrutura de pastas alvo (proposta)

```
src/
  app/                    # SOMENTE rotas (expo-router). Telas compõem, não implementam.
    _layout.tsx           #   Providers (Theme, Query) + Stack.Protected
    (auth)/               #   sign-in, sign-up, reset-password
    (app)/                #   _layout.tsx = Tabs; home/, profile/, menu/
  components/
    ui/                   # Primitivos do design system: Button, Text, Card,
                          #   Input, Modal, Icon... Consomem APENAS tokens do tema.
    forms/                # Cascas RHF finas sobre ui/: FormInput, FormDatePicker
  features/               # 1 pasta por domínio. Padrão fixo por feature:
    auth/
      api.ts              #   funções axios puras
      hooks.ts            #   useQuery/useMutation da feature
      store.ts            #   Zustand (só se houver estado de cliente)
      components/         #   componentes exclusivos da feature (se houver)
  theme/                  # ÚNICA fonte de decisão visual
    tokens.ts             #   spacing, radius, typography, elevation
    colors.ts             #   ThemeColors: papéis semânticos, light + dark
    provider.tsx          #   ThemeProvider + useTheme()
  lib/                    # Infra transversal: api.ts (axios), queryClient.ts,
                          #   storage.ts (SecureStore/AsyncStorage tipado)
  utils/                  # Funções puras: format.ts, validators.ts
  types/                  # Tipos globais compartilhados
  assets/                 # Imagens, logos, fontes
```

Regras de localização (as que vão para o CLAUDE.md): tela nova → `app/`; visual reutilizável → `components/ui/`; lógica de domínio → `features/<dominio>/` seguindo o padrão api/hooks/store; decisão visual → `theme/`; nada de pasta nova sem categoria acima.

---

## 5. Esboço do CLAUDE.md (para aprovação do formato)

Gerado na Fase 2 documentando o estado FINAL, nas convenções da sua skill `project-context-manager`:

```
# CLAUDE.md — React Native Template

## O que é este projeto
  Template base para apps RN. [PLACEHOLDER: nome/objetivo do app derivado]

## Stack
  Expo SDK 57 · RN 0.86 · TypeScript strict · Expo Router (Stack.Protected + Tabs)
  TanStack Query (servidor) · Zustand (cliente) · RHF + Zod · axios · Yarn

## Modelo de pastas
  Tabela pasta → o que vai nela → o que NÃO vai nela (estrutura da seção 4)

## Convenções
  - Nomenclatura (arquivos, componentes, hooks, stores)
  - Padrão de componente (props tipadas, makeStyles, export)
  - Estado: servidor → TanStack Query em features/<x>/hooks.ts;
    cliente → Zustand em features/<x>/store.ts; nunca estado de servidor em store
  - Estilização: só tokens via useTheme(); hex proibido fora de src/theme/ (lint)
  - Forms: schema Zod por tela + FormInput; validators compartilhados em utils/

## Design system
  - Como usar tokens/tema (exemplos mínimos de código)
  - Como customizar o visual do app derivado: editar SOMENTE src/theme/
    [PLACEHOLDER: identidade visual do projeto]
  - Gradientes e variantes: opt-in, como ativar

## Como a IA deve trabalhar aqui
  - Procurar antes de criar (Grep em ui/, features/, utils/) — NÃO recriar o que existe
  - Onde adicionar cada tipo de coisa (mapa decisão → pasta)
  - Seguir o exemplo canônico: features/auth/ é o modelo a copiar
  - Rodar yarn validate antes de concluir

## O que NÃO fazer
  - Cravar cores/tamanhos em componente ou tela
  - Criar abstração para uso único / providers novos sem necessidade
  - Estado de servidor em Zustand; lógica de domínio em app/
  - Reintroduzir Redux, RNE ou padrões removidos

## Comandos essenciais
  dev / start / lint / typecheck / test / validate / prebuild

## Específico deste projeto  [PLACEHOLDER — seção vazia no template]
```

---

## 6. Ordem sugerida da Fase 2 (se tudo for aprovado)

1. Upgrade SDK 53→57 + remoção de deps mortas (base limpa antes de refatorar).
2. Design system (`theme/` + primitivos `ui/`) — sem mexer em navegação ainda.
3. Navegação (`Stack.Protected` + `Tabs`), matando loading fake e `mocks/`.
4. Estado (TanStack Query + Zustand) + serviços/env + auth de referência.
5. Tooling (ESLint, testes, scripts) — o lint anti-hex entra por último para validar o resultado.
6. CLAUDE.md documentando o estado final + verificação (`yarn validate`, build, smoke tests).

---

## Fontes consultadas (08/07/2026)

- Expo SDK 57 (30/jun/2026, RN 0.86): [expo.dev/changelog/sdk-57](https://expo.dev/changelog/sdk-57) · [docs.expo.dev/versions/latest](https://docs.expo.dev/versions/latest/) · [guia de upgrade](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)
- Protected routes: [docs.expo.dev/router/advanced/protected](https://docs.expo.dev/router/advanced/protected/) · [expo.dev/blog/simplifying-auth-flows-with-protected-routes](https://expo.dev/blog/simplifying-auth-flows-with-protected-routes)
- Estado 2026 (queda do Redux, padrão Query+Zustand): [agilesoftlabs.com — RN State 2026](https://www.agilesoftlabs.com/blog/2026/06/react-native-state-2026-zustand-vs) · [zustand.docs.pmnd.rs/learn/getting-started/comparison](https://zustand.docs.pmnd.rs/learn/getting-started/comparison) · [syncfusion.com — top state tools 2026](https://www.syncfusion.com/blogs/post/react-state-management-libraries)
- TanStack Query em RN: [tanstack.com/query/latest](https://tanstack.com/query/latest/docs/framework/react/overview) · [oneuptime.com — TanStack Query RN](https://oneuptime.com/blog/post/2026-01-15-react-native-tanstack-query/view)
- RNE não mantida (v4 RC): [reactnativeelements.com/versions](https://reactnativeelements.com/versions) · [github discussions #3561](https://github.com/react-native-elements/react-native-elements/discussions/3561)
- Styling 2026: [Unistyles 3 estável](https://www.unistyl.es/) · [expo.dev/blog/unistyles-3-0](https://expo.dev/blog/unistyles-3-0-beyond-react-native-stylesheet) · [comparativo NativeWind/Tamagui/Unistyles](https://medium.com/react-native-journal/nativewind-vs-tamagui-vs-unistyles-which-styling-library-should-you-use-in-2026-cf4f4d78b76f)
- Zod 4 estável + resolvers: [zod.dev](https://zod.dev/) · [react-hook-form/resolvers releases](https://github.com/react-hook-form/resolvers/releases)
