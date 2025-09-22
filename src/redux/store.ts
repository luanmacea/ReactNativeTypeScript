import { configureStore } from '@reduxjs/toolkit'

import authReducer from './features/auth/authSlice'
import globalReducer from './features/global/globalSlice'
import themeReducer from './features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    global: globalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
