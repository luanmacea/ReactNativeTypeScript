import { ReactElement } from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Text from '@/components/ui/Text'
import { ThemeProvider } from '@/theme/provider'

function renderWithTheme(ui: ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

describe('primitivos de ui', () => {
  it('Button dispara onPress', async () => {
    const onPress = jest.fn()
    const { getByText } = await renderWithTheme(
      <Button title="Entrar" onPress={onPress} />,
    )
    await fireEvent.press(getByText('Entrar'))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('Button em loading fica desabilitado', async () => {
    const onPress = jest.fn()
    const { getByText } = await renderWithTheme(
      <Button title="Entrar" onPress={onPress} isLoading />,
    )
    await fireEvent.press(getByText('Entrar'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('Text renderiza todas as variantes', async () => {
    const { getByText } = await renderWithTheme(
      <>
        <Text variant="title">Título</Text>
        <Text variant="subtitle">Subtítulo</Text>
        <Text>Corpo</Text>
        <Text variant="caption">Legenda</Text>
      </>,
    )
    expect(getByText('Título')).toBeTruthy()
    expect(getByText('Subtítulo')).toBeTruthy()
    expect(getByText('Corpo')).toBeTruthy()
    expect(getByText('Legenda')).toBeTruthy()
  })

  it('Input exibe label e mensagem de erro', async () => {
    const { getByText } = await renderWithTheme(
      <Input label="CPF" error="CPF inválido" />,
    )
    expect(getByText('CPF')).toBeTruthy()
    expect(getByText('CPF inválido')).toBeTruthy()
  })
})
