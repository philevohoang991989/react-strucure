import axiosInstance from 'services/axios'
const authApi = {
  login(data) {
    console.log('login')

    const url = '/users/sign_in'
    return axiosInstance.post(url, data)
  },
  logout() {
    const url = '/users/sign_out'
    return axiosInstance.delete(url)
  }
}

export default authApi
