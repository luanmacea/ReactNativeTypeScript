// Formatação de datas com Intl (sem dependência externa).
// Datas ISO "date-only" (ex.: "2026-01-31") são interpretadas em UTC pelo
// construtor de Date; por isso os formatadores fixam timeZone UTC quando
// recebem esse formato, evitando o deslocamento de um dia.

const dateFormatterBR = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' })

export function formatDateToBR(date: Date | string): string {
  if (typeof date === 'string') {
    const parsed = new Date(date)
    if (Number.isNaN(parsed.getTime())) return ''
    return dateFormatterBR.format(parsed)
  }
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

export function formatDateTimeToBR(isoDateTime: string): string {
  const parsed = new Date(isoDateTime)
  if (Number.isNaN(parsed.getTime())) return ''
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(parsed)
}
