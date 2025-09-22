import { createTheme } from '@rneui/themed'

const lightPalette = {
  primary: '#C99A2E',
  secondary: '#3D4C59',
  background: '#F5F2EA',
  greyOutline: '#D8CCB4',
  grey0: '#FFFFFF',
  grey1: '#1F1F26',
  grey2: '#6A6B76',
  grey3: '#EFE7DA',
  grey4: '#FFFFFF',
  white: '#FFFFFF',
  black: '#101014',
  success: '#3FA471',
  error: '#D95F5F',
  warning: '#E0A942',
}

const darkPalette = {
  primary: '#D1A954',
  secondary: '#4B5563',
  background: '#0E0E10',
  greyOutline: '#2F2F38',
  grey0: '#15151C',
  grey1: '#F7F3E8',
  grey2: '#A6A6BA',
  grey3: '#1C1C24',
  grey4: '#1D1D24',
  white: '#F5F5F5',
  black: '#050507',
  success: '#65E0A2',
  error: '#F27C7C',
  warning: '#F2C572',
}

export const cardAppearance = {
  light: {
    gradient: ['#FFFFFF', '#F3E7D3'] as [string, string],
    border: '#E6D7BD',
  },
  dark: {
    gradient: ['#2A2A32', '#16161C'] as [string, string],
    border: '#2F2F38',
  },
}

export const defaultTheme = createTheme({
  lightColors: lightPalette,
  darkColors: darkPalette,
  mode: 'dark',
})
