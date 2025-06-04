import { createTheme } from '@rneui/themed'

export const defaultTheme = createTheme({
  lightColors: {
    primary: '#007BFF',
    secondary: '#6C757D',
    background: '#D6D6D6FF',
    greyOutline: '#787878', // cor da borda dos componentes
    grey0: '#F8F9FA',
    grey1: '#000000', // texto dos componentes
    grey2: '#6C757D', // texto das labels
    grey3: '#f7f7f7', // fundo componentes
    white: '#FFFFFF',
    black: '#000000',
    success: '#28A745',
    error: '#DC3545',
    warning: '#FFC107',
  },
  darkColors: {
    primary: '#FF9F1C',
    secondary: '#FFBF69',
    background: '#1A1A1A',
    greyOutline: '#B6B6B6FF', // cor da borda dos componentes
    grey0: '#333333',
    grey1: '#FFFFFF', // texto dos componentes
    grey2: '#969696', // texto das labels
    grey3: '#292929', // fundo componentes
    white: '#F5F5F5',
    black: '#2A2B2A',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
  },
  mode: 'dark', // or 'light'
})
