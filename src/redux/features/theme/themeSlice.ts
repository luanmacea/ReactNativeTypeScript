import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { defaultTheme } from '~/constants/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface ThemeState {
  mode: 'light' | 'dark'
  colors: typeof defaultTheme.lightColors
}

const initialState: ThemeState = {
  mode: defaultTheme.mode as 'light' | 'dark',
  colors: defaultTheme.mode === 'dark' ? defaultTheme.darkColors : defaultTheme.lightColors,
}

export const THEME_KEY = 'APP_THEME_MODE'

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.mode === 'dark') {
        state.mode = 'light'
        state.colors = defaultTheme.lightColors
      } else {
        state.mode = 'dark'
        state.colors = defaultTheme.darkColors
      }
      AsyncStorage.setItem(THEME_KEY, state.mode)
    },
    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload
      state.colors = action.payload === 'dark' ? defaultTheme.darkColors : defaultTheme.lightColors
      AsyncStorage.setItem(THEME_KEY, state.mode)
    },
  },
})

export const { toggleTheme, setThemeMode } = themeSlice.actions
export default themeSlice.reducer
