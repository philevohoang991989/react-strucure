import React from 'react'
import { Row, Col } from 'antd'
import styles from './styles.module.scss'
import InfoRoom from './components/InfoRoom'

const DashboardPage = () => {
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
