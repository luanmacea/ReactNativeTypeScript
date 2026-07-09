import {
  cpfSchema,
  emailSchema,
  isValidCPF,
  requiredPasswordSchema,
} from '@/utils/validators'

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

describe('emailSchema', () => {
  it('aceita e-mail válido e faz trim', () => {
    const result = emailSchema.safeParse('  teste@exemplo.com  ')
    expect(result.success).toBe(true)
    if (result.success) expect(result.data).toBe('teste@exemplo.com')
  })

  it('rejeita e-mail inválido e vazio', () => {
    expect(emailSchema.safeParse('sem-arroba').success).toBe(false)
    expect(emailSchema.safeParse('').success).toBe(false)
  })
})

describe('requiredPasswordSchema', () => {
  it('aceita senha não vazia', () => {
    expect(requiredPasswordSchema.safeParse('123').success).toBe(true)
  })

  it('rejeita senha vazia', () => {
    expect(requiredPasswordSchema.safeParse('').success).toBe(false)
  })
})
