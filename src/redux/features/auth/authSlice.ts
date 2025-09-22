import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '@/types/types'

import { changePassword, logOut, signIn, signUp, verifyCpf } from './authThunk'

export interface AuthState {
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
  isCpfVerified: boolean
  verifiedCpf: string | null
  user?: IUser
}

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  error: '',
  isCpfVerified: false,
  verifiedCpf: null,
  user: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.isAuthenticated = false
      state.error = ''
      state.isLoading = false
      state.isCpfVerified = false
      state.verifiedCpf = null
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true
      state.error = null
      state.isAuthenticated = false
    })
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = {
        id: action.payload.id,
        name: action.payload.name,
        cpf: action.payload.cpf,
        email: action.payload.email,
      }
      state.isLoading = false
      state.isAuthenticated = true
    })
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false
      state.error =
        (action.payload as string) ||
        action.error.message ||
        'CPF ou senha incorretos.'
    })

    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = {
        id: action.payload.id,
        name: action.payload.name,
        cpf: action.payload.cpf,
        email: action.payload.email,
      }
      state.isAuthenticated = true
      state.isLoading = false
      state.error = ''
    })

    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false
      state.error =
        (action.payload as string) ||
        action.error.message ||
        'CPF ja cadastrado.'
    })

    builder.addCase(verifyCpf.pending, (state) => {
      state.isLoading = true
      state.error = ''
      state.isCpfVerified = false
      state.verifiedCpf = null
    })
    builder.addCase(verifyCpf.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = ''
      state.isCpfVerified = true
      state.verifiedCpf = action.payload.cpf
    })
    builder.addCase(verifyCpf.rejected, (state, action) => {
      state.isLoading = false
      state.isCpfVerified = false
      state.verifiedCpf = null
      state.error =
        (action.payload as string) ||
        action.error.message ||
        'CPF nao encontrado.'
    })

    builder.addCase(changePassword.pending, (state) => {
      state.isLoading = true
      state.error = ''
      state.isCpfVerified = false
      state.verifiedCpf = null
    })
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = ''
      state.user = {
        id: action.payload.id,
        name: action.payload.name,
        cpf: action.payload.cpf,
        email: action.payload.email,
      }
      state.isAuthenticated = true
    })
    builder.addCase(changePassword.rejected, (state, action) => {
      state.isLoading = false
      state.isCpfVerified = false
      state.verifiedCpf = null
      state.error =
        (action.payload as string) ||
        action.error.message ||
        'CPF nao encontrado.'
    })

    builder.addCase(logOut.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(logOut.fulfilled, () => {
      return initialState
    })
    builder.addCase(logOut.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message || 'Failed to log out'
    })
  },
})

export const { clearAuth, setUser } = authSlice.actions
export default authSlice.reducer
