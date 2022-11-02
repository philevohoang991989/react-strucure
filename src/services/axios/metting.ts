import axios from 'axios'
import { storageKeys } from 'constants/storage-keys'
import services from 'services'

const axiosInstanceMetting = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT_METTING}`,
  headers: {
    // Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

// Interceptors
// Add a request interceptor
axiosInstanceMetting.interceptors.request.use(
    (config: any) => {
        const StorageService = services.get('StorageService')
        const infoUser = StorageService.get(storageKeys.authProfile)
        const token = infoUser && infoUser.token

        if (token) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${token}`
        } else {
            config.headers.Authorization = ``
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Add a response interceptor
axiosInstanceMetting.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default axiosInstanceMetting
