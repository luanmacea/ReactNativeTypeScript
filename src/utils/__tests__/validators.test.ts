import { cpfSchema, isValidCPF } from '@/utils/validators'

describe('isValidCPF', () => {
  it('aceita CPF válido', () => {
    expect(isValidCPF('529.982.247-25')).toBe(true)
    expect(isValidCPF('52998224725')).toBe(true)
  })

  it('rejeita CPF inválido', () => {
    expect(isValidCPF('123.456.789-00')).toBe(false)
    expect(isValidCPF('111.111.111-11')).toBe(false)
    expect(isValidCPF('123')).toBe(false)
    expect(isValidCPF('')).toBe(false)
  })
})

describe('cpfSchema', () => {
  it('valida e rejeita conforme isValidCPF', () => {
    expect(cpfSchema.safeParse('529.982.247-25').success).toBe(true)
    expect(cpfSchema.safeParse('123.456.789-00').success).toBe(false)
    expect(cpfSchema.safeParse('').success).toBe(false)
  })
})
