import packageJson from '../../package.json'

const { version } = packageJson

const uri: { [key: string]: string } = {
  development: 'http://localhost:8081/rhdigital',
  production: 'https://api.arista.com.br/rhdigital-temp',
  test: 'http://localhost:8081/rhdigital'
}

const NODE_ENV = process.env.NODE_ENV

const LocalStore = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  COMPANY: 'company'
}

export { uri, version, NODE_ENV, LocalStore }
