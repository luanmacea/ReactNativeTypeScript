import { ReactElement } from 'react'
import { Text as RNText } from 'react-native'

import { fireEvent, render } from '@testing-library/react-native'

import Alert from '@/components/ui/Alert'
import Card from '@/components/ui/Card'
import Confirmation from '@/components/ui/Confirmation'
import Container from '@/components/ui/Container'
import { FeatherIcon } from '@/components/ui/Icon'
import Loading from '@/components/ui/Loading'
import Logo from '@/components/ui/Logo'
import Modal from '@/components/ui/Modal'
import { ThemeProvider } from '@/theme/provider'

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}))

function renderWithTheme(ui: ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

// O <Modal> nativo agenda timers de animação (fade). Sem drená-los entre os
// testes, escopos de act() se sobrepõem e poluem os testes seguintes.
afterEach(async () => {
  await new Promise((resolve) => setTimeout(resolve, 0))
})

describe('Card', () => {
  it('renderiza os filhos (flat)', async () => {
    const { getByText } = await renderWithTheme(
      <Card>
        <RNText>Conteúdo</RNText>
      </Card>,
    )
    expect(getByText('Conteúdo')).toBeTruthy()
  })

  it('renderiza os filhos na variante gradient', async () => {
    const { getByText } = await renderWithTheme(
      <Card variant="gradient">
        <RNText>Gradiente</RNText>
      </Card>,
    )
    expect(getByText('Gradiente')).toBeTruthy()
  })
})

describe('Container', () => {
  it('renderiza os filhos', async () => {
    const { getByText } = await renderWithTheme(
      <Container>
        <RNText>Tela</RNText>
      </Container>,
    )
    expect(getByText('Tela')).toBeTruthy()
  })

  it('aceita safeTop sem quebrar', async () => {
    const { getByText } = await renderWithTheme(
      <Container safeTop>
        <RNText>Com inset</RNText>
      </Container>,
    )
    expect(getByText('Com inset')).toBeTruthy()
  })
})

describe('Loading', () => {
  it('renderiza um ActivityIndicator', async () => {
    const { toJSON } = await renderWithTheme(<Loading />)
    expect(toJSON()).toBeTruthy()
  })
})

describe('Icon', () => {
  it('renderiza um FeatherIcon', async () => {
    const { toJSON } = await renderWithTheme(<FeatherIcon icon="lock" />)
    expect(toJSON()).toBeTruthy()
  })
})

describe('Logo', () => {
  it('renderiza sem quebrar', async () => {
    const { toJSON } = await renderWithTheme(<Logo />)
    expect(toJSON()).toBeTruthy()
  })
})

describe('Modal', () => {
  it('exibe conteúdo quando aberto', async () => {
    const { getByText } = await renderWithTheme(
      <Modal open onClose={jest.fn()}>
        <RNText>Corpo do modal</RNText>
      </Modal>,
    )
    expect(getByText('Corpo do modal')).toBeTruthy()
  })

  it('dispara onClose ao tocar no ícone de fechar', async () => {
    const onClose = jest.fn()
    const { getByLabelText } = await renderWithTheme(
      <Modal open onClose={onClose} showCloseIcon>
        <RNText>Corpo</RNText>
      </Modal>,
    )
    fireEvent.press(getByLabelText('Fechar'))
    expect(onClose).toHaveBeenCalled()
  })
})

describe('Alert', () => {
  it('exibe título e mensagem quando aberto', async () => {
    const { getByText } = await renderWithTheme(
      <Alert
        open
        title="Sucesso"
        message="Operação concluída"
        type="success"
        onClose={jest.fn()}
      />,
    )
    expect(getByText('Sucesso')).toBeTruthy()
    expect(getByText('Operação concluída')).toBeTruthy()
  })
})

describe('Confirmation', () => {
  it('dispara onConfirm e onClose', async () => {
    const onConfirm = jest.fn()
    const onClose = jest.fn()
    const { getByText } = await renderWithTheme(
      <Confirmation
        open
        title="Excluir?"
        message="Ação irreversível"
        onConfirm={onConfirm}
        onClose={onClose}
      />,
    )
    fireEvent.press(getByText('Confirmar'))
    expect(onConfirm).toHaveBeenCalled()
    fireEvent.press(getByText('Cancelar'))
    expect(onClose).toHaveBeenCalled()
  })
})
