import { showErrorAlert, useAlertStore } from '@/lib/alerts'

describe('useAlertStore', () => {
  beforeEach(() => {
    useAlertStore.setState({
      open: false,
      title: 'Ops!',
      message: null,
      type: 'error',
    })
  })

  it('estado inicial fechado', () => {
    const state = useAlertStore.getState()
    expect(state.open).toBe(false)
    expect(state.message).toBeNull()
  })

  it('show abre com título e tipo padrão', () => {
    useAlertStore.getState().show({ message: 'Falhou' })
    const state = useAlertStore.getState()
    expect(state.open).toBe(true)
    expect(state.message).toBe('Falhou')
    expect(state.title).toBe('Ops!')
    expect(state.type).toBe('error')
  })

  it('show respeita título e tipo customizados', () => {
    useAlertStore.getState().show({
      message: 'Salvo',
      title: 'Sucesso',
      type: 'success',
    })
    const state = useAlertStore.getState()
    expect(state.title).toBe('Sucesso')
    expect(state.type).toBe('success')
  })

  it('hide fecha e limpa a mensagem', () => {
    useAlertStore.getState().show({ message: 'Falhou' })
    useAlertStore.getState().hide()
    const state = useAlertStore.getState()
    expect(state.open).toBe(false)
    expect(state.message).toBeNull()
  })
})

describe('showErrorAlert', () => {
  it('abre o alerta de erro global', () => {
    showErrorAlert('Erro de rede', 'Falha')
    const state = useAlertStore.getState()
    expect(state.open).toBe(true)
    expect(state.message).toBe('Erro de rede')
    expect(state.title).toBe('Falha')
    expect(state.type).toBe('error')
  })
})
