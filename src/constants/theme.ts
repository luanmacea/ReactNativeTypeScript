import { createTheme } from '@rneui/themed'

export const defaultTheme = createTheme({
  lightColors: {
    primary: '#007BFF',
    secondary: '#6C757D',
    background: '#FFFFFF',
    grey0: '#F8F9FA',
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
    grey0: '#333333',
    white: '#F5F5F5',
    black: '#2A2B2A',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
  },
  components: {
    Text: {
      style: {
        color: '#F5F5F5',
      },
    },
  },
  mode: 'dark',
})
