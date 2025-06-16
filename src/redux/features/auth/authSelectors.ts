import { RootState } from '@/redux/store'

export const selectAuthState = (state: RootState) => state.auth
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated
export const selectAuthLoading = (state: RootState) => state.auth.isLoading
