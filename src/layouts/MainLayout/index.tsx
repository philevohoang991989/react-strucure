import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { SideBar, Header } from 'components'
import styles from './MainLayout.module.scss'
import teamApi from 'services/team'
import companyApi from 'services/company'
import { useAppDispatch } from 'hooks/store'
import { setListTeam, switchTeam } from 'store/team'
import services from 'services'
import { storageKeys } from 'constants/storage-keys'
import { setCompanyInfo } from 'store/company'

const { Content } = Layout

const MainLayout: React.FC = () => {
  const StorageService = services.get('StorageService')
  const dispatch = useAppDispatch()
  const appConfig = StorageService.get(storageKeys.config)
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const [teamResult, companyResult] = await Promise.all([
          teamApi.getAllTeam(),
          companyApi.getInfoCompany()
        ])

        if (teamResult.status === 200) {
          let listTeam: any = teamResult
          dispatch(setListTeam(listTeam?.teams))
          appConfig.team && dispatch(switchTeam(appConfig.team))
        }

        if (companyResult.status === 200) {
          let companyInfo: any = companyResult
          dispatch(setCompanyInfo(companyInfo.company))
        }
      } catch (_) {
        // no need
      }
    }

    fetchApi()
  }, [])
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
