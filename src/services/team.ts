import axiosInstance from 'services/axios'
import axiosInstanceMetting from "./axios/metting";
const teamApi = {
  getAllTeam() {
    const url = '/teams'
    return axiosInstance.get(url)
  },
  getTripByTeamId(team_id){
    const url = `/trips/list_by_joiner_team${team_id ? '?team_id=' + team_id : ''}`
    return axiosInstanceMetting.get(url)
  },

}

export default teamApi
