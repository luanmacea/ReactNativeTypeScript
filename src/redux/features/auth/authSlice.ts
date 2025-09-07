import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '@/types/types'

import { logOut, signIn } from './authThunk'

export interface AuthState {
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
  user?: IUser
}

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  error: '',
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
      console.log(action.error)
      state.error = action.error.message || 'Falha ao logar'
    })

    builder.addCase(logOut.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(logOut.fulfilled, (state) => {
      state.user = {
        id: '',
        name: '',
        cpf: '',
        email: '',
      }
      state.isLoading = false
      state.isAuthenticated = false
      state.error = ''
    })
    builder.addCase(logOut.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message || 'Failed to log out'
    })
  },
})

export const { clearAuth, setUser } = authSlice.actions
export default authSlice.reducer
