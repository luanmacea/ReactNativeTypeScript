import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDateToBR(dateString: string): string {
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}
export function formatDateTimeToBR(dateTimeString: string): string {
  const [datePart, timePart] = dateTimeString.split('T')
  const formattedDate = formatDateToBR(datePart)
  const [hour, minute] = timePart.split(':')
  return `${formattedDate} ${hour}:${minute}`
}
export const handleDate = (date: string) => {
  const newDate = new Date(date)
  return format(
    // hack para remover o UTC, data estavam sendo convertidas com valor errado
    new Date(newDate.valueOf() + newDate.getTimezoneOffset() * 60 * 1000),
    'dd/MM/yyyy',
    { locale: ptBR },
  )
}
