import { createAsyncThunk } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'

import { LocalStore } from '@/constants/environment-variables'
import api from '@/services/api'

interface ISignInProps {
  cpf: string
  password: string
}

interface ISignUpProps {
  name: string
  cpf: string
  email: string
  password: string
}

interface IChangePasswordProps {
  cpf: string
  newPassword: string
}

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (data: ISignInProps, { rejectWithValue }) => {
    try {
      const response = await api.get('/users', {
        params: {
          ...data,
        },
      })
      if (response.data[0]?.id) {
        const user = response.data[0]
        await SecureStore.setItemAsync(
          LocalStore.USER_DATA,
          JSON.stringify(user),
        )
        return response.data
      }
      return rejectWithValue('CPF ou senha incorretos')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw new Error('Erro ao fazer login')
    }
  },
)

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (data: ISignUpProps) => {
    try {
      const newUser = {
        name: data.name,
        cpf: data.cpf,
        email: data.email,
        password: data.password,
      }
      const response = await api.post('/users', newUser)
      const user = response.data
      await SecureStore.setItemAsync(LocalStore.USER_DATA, JSON.stringify(user))
      return response.data
    } catch (error) {
      console.error('Erro ao cadastrar o usuário:', error)
      throw new Error('Erro ao cadastrar o usuário')
    }
  },
)

export const logOut = createAsyncThunk('auth/logOut', async () => {
  await SecureStore.deleteItemAsync(LocalStore.USER_DATA)
})

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ cpf, newPassword }: IChangePasswordProps, { rejectWithValue }) => {
    try {
      const findResponse = await api.get('/users', {
        params: { cpf },
      })

      const users = findResponse.data

      if (!Array.isArray(users) || users.length === 0) {
        return rejectWithValue('CPF não encontrado.')
      }

      const user = users[0]
      const updateResponse = await api.patch(`/users/${user.id}`, {
        password: newPassword,
      })
      await SecureStore.setItemAsync(LocalStore.USER_DATA, JSON.stringify(user))

      return {
        message: 'Senha alterada com sucesso.',
        user: updateResponse.data,
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || 'Erro ao alterar a senha.'
      return rejectWithValue(message)
    }
  },
)
