import { create } from 'zustand'

import type { AlertType } from '@/components/ui/Alert'

// Store mínimo do alerta global. Renderizado uma única vez no root layout;
// erros de query/mutation chegam aqui via lib/queryClient.ts.

interface AlertState {
  open: boolean
  title: string
  message: string | null
  type: AlertType
  show: (alert: { message: string; title?: string; type?: AlertType }) => void
  hide: () => void
}

export const useAlertStore = create<AlertState>()((set) => ({
  open: false,
  title: 'Ops!',
  message: null,
  type: 'error',
  show: ({ message, title = 'Ops!', type = 'error' }) =>
    set({ open: true, message, title, type }),
  hide: () => set({ open: false, message: null }),
}))

export function showErrorAlert(message: string, title?: string) {
  useAlertStore.getState().show({ message, title, type: 'error' })
}
