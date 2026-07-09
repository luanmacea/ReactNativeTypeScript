import type { TextStyle, ViewStyle } from 'react-native'

// Escalas neutras do projeto. Não mudam entre light/dark — para cores, veja colors.ts.

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const

// Raios mais generosos que a versão original (sm 6 → 10) para um visual mais suave.
export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  full: 999,
} as const

export const typography = {
  title: { fontSize: 22, fontWeight: '700' },
  subtitle: { fontSize: 16, fontWeight: '600' },
  body: { fontSize: 14, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' },
  button: { fontSize: 16, fontWeight: '700' },
  label: { fontSize: 14, fontWeight: '400' },
} as const satisfies Record<string, TextStyle>

export const elevation = {
  none: {},
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  modal: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 6,
  },
} as const satisfies Record<string, ViewStyle>
