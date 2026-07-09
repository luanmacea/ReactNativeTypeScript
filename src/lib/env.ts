// Config de ambiente tipada. Variáveis EXPO_PUBLIC_* são embutidas no bundle
// pelo Metro em tempo de build — mudar o valor exige reiniciar o dev server.
export const env = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL,
  // Modo de teste (yarn dev:test / yarn start:test): a API é substituída pelos
  // mocks de features/*/mock.ts e o app navega sem backend real.
  isMockApi: process.env.EXPO_PUBLIC_MOCK_API === 'true',
}
