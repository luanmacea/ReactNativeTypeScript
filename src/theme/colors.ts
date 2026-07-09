export type ThemeMode = 'light' | 'dark'

// Gradientes são opt-in: use variant="gradient" em Button/Card, ou leia
// theme.colors.gradients direto (ex.: o card de destaque da Home).
export interface ThemeGradients {
  primary: [string, string]
  card: [string, string]
}

// Papéis semânticos de cor. Light e dark têm as mesmas chaves — customizar o
// visual de um app derivado significa editar apenas este arquivo (e tokens.ts).
export interface ThemeColors {
  background: string
  surface: string
  surfaceAlt: string
  text: string
  textMuted: string
  primary: string
  onPrimary: string
  border: string
  overlay: string
  // Papéis para conteúdo sobre imagem/gradiente (capa, hero). Iguais em light e
  // dark porque cobrem o mesmo conteúdo colorido.
  onImage: string
  imageScrim: string
  imageBadge: string
  success: string
  error: string
  warning: string
  gradients?: ThemeGradients
}

// Modo claro: cinza NEUTRO suave de fundo + cards brancos (sem viés de cor).
export const lightColors: ThemeColors = {
  background: '#F1F1F1',
  surface: '#FFFFFF',
  surfaceAlt: '#F7F7F7',
  text: '#171717',
  textMuted: '#6C6C6C',
  primary: '#0DA894',
  onPrimary: '#FFFFFF',
  border: '#E4E4E4',
  overlay: 'rgba(20, 20, 20, 0.45)',
  onImage: '#FFFFFF',
  imageScrim: 'rgba(0, 0, 0, 0.35)',
  imageBadge: 'rgba(4, 35, 31, 0.16)',
  success: '#2FA773',
  error: '#E5484D',
  warning: '#E0A942',
  gradients: {
    primary: ['#0DA894', '#0E93A8'],
    card: ['#0DA894', '#0E93A8'],
  },
}

// Modo escuro: preto-cinza NEUTRO (sem azul), com superfícies em camadas.
export const darkColors: ThemeColors = {
  background: '#0C0C0C',
  surface: '#171717',
  surfaceAlt: '#101010',
  text: '#F5F5F5',
  textMuted: '#9C9C9C',
  primary: '#1FC9B6',
  onPrimary: '#04231F',
  border: '#292929',
  overlay: 'rgba(0, 0, 0, 0.6)',
  onImage: '#FFFFFF',
  imageScrim: 'rgba(0, 0, 0, 0.35)',
  imageBadge: 'rgba(4, 35, 31, 0.16)',
  success: '#40C877',
  error: '#F2686B',
  warning: '#F2B84B',
  gradients: {
    primary: ['#1FC9B6', '#12A5B4'],
    card: ['#1FC9B6', '#12A5B4'],
  },
}

export const palettes: Record<ThemeMode, ThemeColors> = {
  light: lightColors,
  dark: darkColors,
}
