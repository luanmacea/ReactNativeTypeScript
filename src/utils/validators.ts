import { z } from 'zod'

export function isValidCPF(value: string): boolean {
  const cpf = value.replace(/\D/g, '')

  if (cpf.length !== 11) return false

  // Rejeita CPFs com todos os dígitos iguais (passariam no dígito verificador)
  if (/^(\d)\1+$/.test(cpf)) return false

  let sum = 0
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (11 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.charAt(9))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (12 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.charAt(10))) return false

  return true
}

// Schemas Zod reutilizáveis — componha nos schemas de tela em vez de redeclarar.
export const cpfSchema = z
  .string()
  .trim()
  .min(1, { message: 'Campo de CPF é obrigatório' })
  .refine(isValidCPF, { message: 'CPF inválido' })

export const requiredPasswordSchema = z
  .string()
  .min(1, { message: 'Campo de senha é obrigatório' })

export const emailSchema = z
  .string()
  .trim()
  .min(1, { message: 'Campo de e-mail é obrigatório' })
  .email({ message: 'Informe um e-mail válido' })
