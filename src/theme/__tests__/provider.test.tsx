import { Text as RNText } from 'react-native'

import { fireEvent, render } from '@testing-library/react-native'

import { ThemeProvider, useTheme, useThemeMode } from '@/theme/provider'

function ModeProbe() {
  const { mode, toggleMode } = useThemeMode()
  const theme = useTheme()
  return (
    <RNText onPress={toggleMode} testID="probe">
      {mode}:{theme.colors.background}
    </RNText>
  )
}

function probeValue(probe: { props: { children?: unknown } }): string {
  return (probe.props.children as string[]).join('')
}

describe('ThemeProvider', () => {
  it('fornece o tema do modo inicial', async () => {
    const { getByTestId } = await render(
      <ThemeProvider initialMode="light">
        <ModeProbe />
      </ThemeProvider>,
    )
    expect(probeValue(getByTestId('probe'))).toContain('light')
  })

  it('alterna entre light e dark', async () => {
    const { getByTestId } = await render(
      <ThemeProvider initialMode="light">
        <ModeProbe />
      </ThemeProvider>,
    )
    const lightValue = probeValue(getByTestId('probe'))

    await fireEvent.press(getByTestId('probe'))

    const darkValue = probeValue(getByTestId('probe'))
    expect(darkValue).toContain('dark')
    expect(darkValue).not.toEqual(lightValue)
  })

  it('useTheme fora do provider lança erro', async () => {
    // Suprime o log de erro esperado do React
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    await expect(render(<ModeProbe />)).rejects.toThrow(
      'useTheme deve ser usado dentro de <ThemeProvider>',
    )
    spy.mockRestore()
  })
})
