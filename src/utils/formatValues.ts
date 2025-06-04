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
