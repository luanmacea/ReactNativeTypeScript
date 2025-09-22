import { useCallback } from 'react'

import Alert from '@/components/Alert'
import {
  clearGlobalError,
  selectGlobalAlert,
} from '@/redux/features/global/globalSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hook'

export default function GlobalAlert() {
  const dispatch = useAppDispatch()
  const alertState = useAppSelector(selectGlobalAlert)

  const handleClose = useCallback(() => {
    dispatch(clearGlobalError())
  }, [dispatch])

  if (!alertState.open || !alertState.message) {
    return null
  }

  return (
    <Alert
      open={alertState.open}
      title={alertState.title}
      message={alertState.message}
      type={alertState.type}
      onClose={handleClose}
    />
  )
}
