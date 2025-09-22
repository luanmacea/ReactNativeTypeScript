import {
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from '@reduxjs/toolkit'

import type { RootState } from '../../store'

type AlertKind = 'success' | 'error' | 'warning'

interface GlobalErrorPayload {
  message: string
  title?: string
  type?: AlertKind
  errors?: Record<string, unknown> | Array<unknown>
}

export interface GlobalAlertState {
  open: boolean
  message: string | null
  title: string
  type: AlertKind
  errors: Record<string, unknown> | Array<unknown> | null
}

const initialState: GlobalAlertState = {
  open: false,
  message: null,
  title: 'Ops!',
  type: 'error',
  errors: null,
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGlobalError: (state, action: PayloadAction<GlobalErrorPayload>) => {
      state.open = true
      state.message = action.payload.message
      state.title = action.payload.title ?? 'Ops!'
      state.type = action.payload.type ?? 'error'
      state.errors = action.payload.errors ?? null
    },
    clearGlobalError: (state) => {
      state.open = false
      state.message = null
      state.title = initialState.title
      state.type = initialState.type
      state.errors = null
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isRejectedWithValue, (state, action) => {
      const payload = action.payload as unknown

      let message: string | null = null
      let title: string | undefined
      let type: AlertKind | undefined
      let errors: Record<string, unknown> | Array<unknown> | null = null

      if (typeof payload === 'string') {
        message = payload
      } else if (payload && typeof payload === 'object') {
        const payloadObject = payload as Record<string, unknown>
        if (typeof payloadObject.message === 'string') {
          message = payloadObject.message
        }
        if (typeof payloadObject.title === 'string') {
          title = payloadObject.title
        }
        if (typeof payloadObject.type === 'string') {
          if (
            payloadObject.type === 'success' ||
            payloadObject.type === 'error' ||
            payloadObject.type === 'warning'
          ) {
            type = payloadObject.type
          }
        }
        if (payloadObject.errors) {
          errors = payloadObject.errors as
            | Record<string, unknown>
            | Array<unknown>
        }
      }

      if (!message) {
        return
      }

      state.open = true
      state.message = message
      state.title = title ?? 'Ops!'
      state.type = type ?? 'error'
      state.errors = errors
    })
  },
})

export const { setGlobalError, clearGlobalError } = globalSlice.actions

export const selectGlobalAlert = (state: RootState) => state.global

export default globalSlice.reducer
