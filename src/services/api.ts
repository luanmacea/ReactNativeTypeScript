import axios from 'axios'

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000',
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
