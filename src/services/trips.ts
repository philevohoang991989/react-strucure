import axiosInstanceMetting from 'services/axios/metting'
const tripsApi = {
  getListTripByTeamId() {
    const url = '/trips/list_by_joiner_team'
    return axiosInstanceMetting.get(url)
  }
}

export default tripsApi
