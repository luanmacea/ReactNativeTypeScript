export function ValidCPF(value: string) {
  // Remove caracteres especiais do CPF
  const cpf = value.replace(/\D/g, '')

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpf)) {
    return false
  }

  // Validação do dígito verificador
  let sum = 0
  let remainder

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (11 - i)
  }

  remainder = (sum * 10) % 11

  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }

  if (remainder !== parseInt(cpf.charAt(9))) {
    return false
  }

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (12 - i)
  }

  remainder = (sum * 10) % 11

  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }

  if (remainder !== parseInt(cpf.charAt(10))) {
    return false
  }

  return true
}
