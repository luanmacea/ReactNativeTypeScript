import { createSlice } from '@reduxjs/toolkit'


import { logout, signIn } from './authThunk'
import { AuthState } from './types'

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  error: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: state => {
      state.isAuthenticated = false
    }
  },
  extraReducers: builder => {
    builder.addCase(signIn.pending, state => {
      state.isLoading = true
    })
    builder.addCase(signIn.fulfilled, (state, action) => {
      const user = {
        cpf: action.payload.user.cpf,
        name: action.payload.user.name,
        id: action.payload.user.id
      }

      state.isLoading = false
      state.isAuthenticated = true
      state.error = null
    })
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message || 'Failed to sign in'
    })

    builder.addCase(logout.pending, state => {
      state.isLoading = true
    })
    builder.addCase(logout.fulfilled, state => {
      state.isLoading = false
      state.isAuthenticated = false
      state.error = null
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message || 'Failed to log out'
    })
  }
})

export const { clearAuth } = authSlice.actions
export default authSlice.reducer
