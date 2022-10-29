import axios from 'axios'

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
axios.interceptors.request.use(
  function (config) {
    console.log({ config })

    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default axiosInstanceMetting