import axiosInstance from 'services/axios'
const companyApi = {
  getInfoCompany() {
    const url = '/users/company'
    return axiosInstance.get(url)
  }
}

export default companyApi
