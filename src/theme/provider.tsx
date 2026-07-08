import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { StyleSheet } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { palettes, ThemeColors, ThemeMode } from './colors'
import { elevation, radius, spacing, typography } from './tokens'

export type { ThemeColors, ThemeMode } from './colors'

const THEME_STORAGE_KEY = 'APP_THEME_MODE'

export interface Theme {
  mode: ThemeMode
  colors: ThemeColors
  spacing: typeof spacing
  radius: typeof radius
  typography: typeof typography
  elevation: typeof elevation
}

interface ThemeContextValue {
  theme: Theme
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function buildTheme(mode: ThemeMode): Theme {
  return {
    mode,
    colors: palettes[mode],
    spacing,
    radius,
    typography,
    elevation,
  }
}

// Lê o modo persistido. Usado no bootstrap do root layout, antes de montar o provider.
export async function loadStoredThemeMode(): Promise<ThemeMode | null> {
  const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY).catch(() => null)
  return saved === 'light' || saved === 'dark' ? saved : null
}

export function ThemeProvider({
  initialMode = 'dark',
  children,
}: {
  initialMode?: ThemeMode
  children: ReactNode
}) {
  const [mode, setModeState] = useState<ThemeMode>(initialMode)

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next)
    AsyncStorage.setItem(THEME_STORAGE_KEY, next).catch(() => {})
  }, [])

  const toggleMode = useCallback(() => {
    setModeState((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      AsyncStorage.setItem(THEME_STORAGE_KEY, next).catch(() => {})
      return next
    })
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme: buildTheme(mode), setMode, toggleMode }),
    [mode, setMode, toggleMode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de <ThemeProvider>')
  }
  return context
}

export function useTheme(): Theme {
  return useThemeContext().theme
}

export function useThemeMode() {
  const { theme, setMode, toggleMode } = useThemeContext()
  return { mode: theme.mode, setMode, toggleMode }
}

// Convenção de estilo do projeto:
// - estilo que NÃO depende do tema → StyleSheet.create estático no fim do arquivo;
// - estilo que depende do tema → makeStyles no escopo do módulo + hook no componente:
//     const useStyles = makeStyles((theme) => ({ ... }))
export function makeStyles<T extends StyleSheet.NamedStyles<T>>(
  factory: (theme: Theme) => T,
) {
  return function useStyles(): T {
    const theme = useTheme()
    return useMemo(() => StyleSheet.create(factory(theme)), [theme])
  }
}
