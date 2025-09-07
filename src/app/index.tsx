import { useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect } from 'expo-router'

import { setThemeMode, THEME_KEY } from '@/redux/features/theme/themeSlice'
import { useAppDispatch } from '@/redux/hook'

export default function Index() {
  const dispatch = useAppDispatch()
  const handleGetTheme = async () => {
    const savedMode = await AsyncStorage.getItem(THEME_KEY)
    if (savedMode === 'light' || savedMode === 'dark') {
      dispatch(setThemeMode(savedMode))
      console.log('ola')
    }
  }

  useEffect(() => {
    handleGetTheme()
  }, [])
  return <Redirect href="/(auth)/sign-in" />
}
