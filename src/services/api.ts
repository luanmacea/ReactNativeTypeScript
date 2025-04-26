import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8081',
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
