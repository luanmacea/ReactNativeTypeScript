import { createSlice } from '@reduxjs/toolkit'
import { defaultTheme } from '~/constants/theme'

const themeSlice = createSlice({
  name: 'theme',
  initialState: defaultTheme,
  reducers: {
    setTheme: (state, action) => {
      return action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
