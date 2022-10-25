import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { SideBar, Header } from 'components'
import styles from './MainLayout.module.scss'

const { Content } = Layout

const MainLayout: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Layout className={styles.mainLayout}>
        <SideBar />
        <Content className={styles.contentWrapper}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
