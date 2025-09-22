import { RootState } from '@/redux/store'

export const selectThemeState = (state: RootState) => state.theme

export const selectThemeMode = (state: RootState) => state.theme.mode
