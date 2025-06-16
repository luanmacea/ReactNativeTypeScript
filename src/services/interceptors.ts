// import { setGlobalError } from '@/redux/features/global/globalSlice'
// import { store } from '@/redux/store'
// import Cookies from 'js-cookie'

// import { COOKIES } from '@/constants/environment-variables'

// import api from './api'

// api.interceptors.response.use(
//   response => response,
//   error => {
//     if (
//       error.response &&
//       error.config.url !== '/permissoes' &&
//       error.config.url !== '/permissoes/modulos'
//     ) {
//       const errorResponse = {
//         message: error.response.data.message,
//         errors: error.response.data.errors
//       }
//       if (error.response.status === 500) {
//         store.dispatch(
//           setGlobalError({
//             message:
//               'Desculpe, ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.'
//           })
//         )
//       } else {
//         store.dispatch(setGlobalError(errorResponse))
//       }

//       return Promise.reject(errorResponse)
//     } else {
//       Cookies.remove(COOKIES.ACCESS_TOKEN)
//       return Promise.reject(error)
//     }
//   }
// )
