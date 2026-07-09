import { ReactElement } from 'react'
import { Text as RNText } from 'react-native'

import { fireEvent, render } from '@testing-library/react-native'

import ScreenHeader from '@/components/ui/ScreenHeader'
import { ThemeProvider } from '@/theme/provider'

const mockBack = jest.fn()
jest.mock('expo-router', () => ({
  useRouter: () => ({ back: mockBack }),
}))

function renderWithTheme(ui: ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

describe('ScreenHeader', () => {
  beforeEach(() => jest.clearAllMocks())

  it('renderiza o título', async () => {
    const { getByText } = await renderWithTheme(<ScreenHeader title="Perfil" />)
    expect(getByText('Perfil')).toBeTruthy()
  })

  it('navega para trás ao tocar no botão quando showBack', async () => {
    const { getByLabelText } = await renderWithTheme(
      <ScreenHeader title="Detalhe" showBack />,
    )
    fireEvent.press(getByLabelText('Voltar'))
    expect(mockBack).toHaveBeenCalled()
  })

  it('não mostra o botão de voltar por padrão', async () => {
    const { queryByLabelText } = await renderWithTheme(
      <ScreenHeader title="Home" />,
    )
    expect(queryByLabelText('Voltar')).toBeNull()
  })

  it('renderiza o slot da direita', async () => {
    const { getByText } = await renderWithTheme(
      <ScreenHeader title="Home" right={<RNText>Ação</RNText>} />,
    )
    expect(getByText('Ação')).toBeTruthy()
  })
})
