import { createAsyncThunk } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'

import { LocalStore } from '@/constants/environment-variables'
import { signInApi, signOutApi } from '@/redux/api/authApi'

import { ISignInProps } from './types'

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (data: ISignInProps) => {
    const response = await signInApi(data)
    await SecureStore.setItemAsync(LocalStore.ACCESS_TOKEN, response.data.token)
    await SecureStore.setItemAsync(
      LocalStore.REFRESH_TOKEN,
      response.data.refreshToken,
    )
    const user = {
      cpf: response.data.user.cpf,
      name: response.data.user.name,
      id: response.data.user.id,
    }
    await SecureStore.setItemAsync(LocalStore.USER_DATA, JSON.stringify(user))
    return response.data
  },
)
export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await signOutApi()
  await SecureStore.deleteItemAsync(LocalStore.ACCESS_TOKEN)
  await SecureStore.deleteItemAsync(LocalStore.REFRESH_TOKEN)
  await SecureStore.deleteItemAsync(LocalStore.USER_DATA)
  return response.data
})
