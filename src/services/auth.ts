import axiosInstance from 'services/axios'
const authApi = {
  login(data) {
    const url = '/users/sign_in'
    return axiosInstance.post(url, data)
  },
  logout() {
    const url = '/users/sign_out'
    return axiosInstance.delete(url)
  }
}

export default authApi
