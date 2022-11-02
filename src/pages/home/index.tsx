import React, {useEffect, useState} from 'react'
import { Row, Col } from 'antd'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import InfoRoom from './components/InfoRoom'
import {selectSelectedTeam} from 'store/team'
import teamApi from "../../services/team";
import tripsApi from "../../services/trips";

const DashboardPage = () => {
  const selectedTeam = useSelector(selectSelectedTeam)
  const [listTrip, setListTrip] = useState([])
  const [detailStream, setDetailStream] = useState<any>({})
  const [detailMetting, setDetailMetting] = useState<any>({})
  console.log({listTrip,detailStream, detailMetting})
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const team_id = selectedTeam?.id || null
        const result = await teamApi.getTripByTeamId(team_id)

        if (result.status === 200) {
          let listTemp : any = result
          console.log({listTemp})
          setListTrip(listTemp.trips.reverse())
          let idTripD: string | undefined = (listTemp?.trips[0].id).toString()
          const resultDetail: any = await tripsApi.getTripDetail({ id: idTripD })
          setDetailStream(resultDetail?.trip)
          // let infoHost = resultDetail?.trip?.trip_joiners.filter(
          //     (itemJoin) => itemJoin?.joiner_type === 'host'
          // )
          // setIdHost(infoHost[0].info.id)
          //
          const resultJoinStream: any = await tripsApi.getJoinStream({ id: idTripD })

          setDetailMetting(resultJoinStream?.joiner)
        }
      } catch (_) {
        // no need
      }
    }
    fetchApi()
  }, [selectedTeam?.id])
  return (
    <div className={styles.wrapper}>
      <Row gutter={16} className={styles.infoTrip}>
        <Col span={8}>
          <InfoRoom />
        </Col>
        <Col span={16} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>sdafsfds</p>
          <p>sdafsfds</p>
        </Col>
      </Row>
      {/* <Row gutter={[16, 16]}>
        <Col span={6}>sdfsdf</Col>
        <Col span={18}></Col>
      </Row> */}
    </div>
  )
}

export default DashboardPage
