export type ThemeMode = 'light' | 'dark'

// Gradientes são opt-in: nenhum componente usa gradiente por padrão.
// Para ativar, preencha `gradients` na paleta e use variant="gradient" em Button/Card.
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
  success: string
  error: string
  warning: string
  gradients?: ThemeGradients
}

export const lightColors: ThemeColors = {
  background: '#F5F2EA',
  surface: '#EFE7DA',
  surfaceAlt: '#FFFFFF',
  text: '#1F1F26',
  textMuted: '#6A6B76',
  primary: '#C99A2E',
  onPrimary: '#FFFFFF',
  border: '#D8CCB4',
  overlay: 'rgba(0, 0, 0, 0.5)',
  success: '#3FA471',
  error: '#D95F5F',
  warning: '#E0A942',
}

export const darkColors: ThemeColors = {
  background: '#0E0E10',
  surface: '#1C1C24',
  surfaceAlt: '#15151C',
  text: '#F7F3E8',
  textMuted: '#A6A6BA',
  primary: '#D1A954',
  onPrimary: '#101014',
  border: '#2F2F38',
  overlay: 'rgba(80, 80, 80, 0.8)',
  success: '#65E0A2',
  error: '#F27C7C',
  warning: '#F2C572',
}

export const palettes: Record<ThemeMode, ThemeColors> = {
  light: lightColors,
  dark: darkColors,
}
