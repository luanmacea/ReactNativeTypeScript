import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.rhdigital.com.br',
})

// api.interceptors.request.use(
//   async config => {
//     const token = Cookies.get(COOKIES.ACCESS_TOKEN)
//     config.headers.authorization = `${token}`
//     return config
//   },
//   error => Promise.reject(error)
// )

export default api
