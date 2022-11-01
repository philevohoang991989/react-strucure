import axiosInstance from 'services/axios'
const teamApi = {
  getAllTeam() {
    const url = '/teams'
    return axiosInstance.get(url)
  }
}

export default teamApi
