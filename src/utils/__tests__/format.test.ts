import { formatDateToBR, formatDateTimeToBR } from '@/utils/format'

describe('formatDateToBR', () => {
  it('formata string ISO date-only sem deslocar o dia (UTC)', () => {
    expect(formatDateToBR('2026-01-31')).toBe('31/01/2026')
  })

  it('formata objeto Date', () => {
    // Meio-dia local evita que o fuso mude o dia
    const date = new Date(2026, 0, 31, 12, 0, 0)
    expect(formatDateToBR(date)).toBe('31/01/2026')
  })

  it('retorna string vazia para data inválida', () => {
    expect(formatDateToBR('não é data')).toBe('')
  })
})

describe('formatDateTimeToBR', () => {
  it('formata data e hora de um ISO completo', () => {
    const result = formatDateTimeToBR('2026-01-31T14:30:00.000Z')
    // Não fixamos o valor exato (depende do fuso do runner), só o formato
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4},? \d{2}:\d{2}$/)
  })

  it('retorna string vazia para entrada inválida', () => {
    expect(formatDateTimeToBR('xyz')).toBe('')
  })
})
