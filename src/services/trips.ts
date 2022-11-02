import axiosInstanceMetting from 'services/axios/metting'
const tripsApi = {
  getListTripByTeamId() {
    const url = '/trips/list_by_joiner_team'
    return axiosInstanceMetting.get(url)
  },
  getTripDetail({id}){
    const url = `/trips/${id}`
    return axiosInstanceMetting.get(url)
  },
  getJoinStream({id}){
    const url = `/trips/${id}/broadcasts/join_stream`
    return axiosInstanceMetting.get(url)
  }
}

export default tripsApi
