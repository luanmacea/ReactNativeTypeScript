import packageJson from '../../package.json'

const { version } = packageJson

const uri: { [key: string]: string } = {
  development: 'http://localhost:8081',
  production: 'http://localhost:8081',
  test: 'http://localhost:8081',
}

const NODE_ENV = process.env.NODE_ENV

const LocalStore = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  COMPANY: 'company',
}

export { uri, version, NODE_ENV, LocalStore }
