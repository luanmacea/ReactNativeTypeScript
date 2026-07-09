import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { fireEvent, render } from '@testing-library/react-native'

import FormDatePicker from '@/components/forms/FormDatePicker'
import FormInput from '@/components/forms/FormInput'
import { ThemeProvider } from '@/theme/provider'

// Stub do date picker nativo (só é montado ao abrir o seletor).
jest.mock('@react-native-community/datetimepicker', () => () => null)

interface HostProps {
  children: ReactNode
  defaultValues?: Record<string, unknown>
}

function Host({ children, defaultValues = {} }: HostProps) {
  const methods = useForm({ defaultValues })
  return (
    <ThemeProvider>
      <FormProvider {...methods}>{children}</FormProvider>
    </ThemeProvider>
  )
}

describe('FormInput', () => {
  it('renderiza o label e propaga a digitação para o form', async () => {
    const { getByText, findByDisplayValue, getByPlaceholderText } =
      await render(
        <Host>
          <FormInput name="email" label="E-mail" placeholder="seu@email.com" />
        </Host>,
      )
    expect(getByText('E-mail')).toBeTruthy()

    fireEvent.changeText(getByPlaceholderText('seu@email.com'), 'a@b.com')
    // A re-renderização do react-hook-form é assíncrona (modo concorrente)
    expect(await findByDisplayValue('a@b.com')).toBeTruthy()
  })

  it('usa o valor inicial do form', async () => {
    const { getByDisplayValue } = await render(
      <Host defaultValues={{ nome: 'Fulano' }}>
        <FormInput name="nome" label="Nome" />
      </Host>,
    )
    expect(getByDisplayValue('Fulano')).toBeTruthy()
  })
})

describe('FormDatePicker', () => {
  it('mostra o placeholder quando não há data', async () => {
    const { getByText } = await render(
      <Host>
        <FormDatePicker name="data" label="Data" />
      </Host>,
    )
    expect(getByText('Data')).toBeTruthy()
    expect(getByText('Selecione uma data')).toBeTruthy()
  })

  it('exibe a data já preenchida no form formatada em pt-BR', async () => {
    const { getByText, queryByText } = await render(
      <Host defaultValues={{ data: '2026-01-31T12:00:00.000Z' }}>
        <FormDatePicker name="data" label="Data" />
      </Host>,
    )
    expect(getByText('31/01/2026')).toBeTruthy()
    expect(queryByText('Selecione uma data')).toBeNull()
  })
})
