import React from 'react'
import { Layout, Avatar, Popover, message } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import services from 'services'
import { UserOutlined } from '@ant-design/icons'
import UserSettingIcon from 'assets/icons/ico_user-setting.svg'
// import SuccessIcon from 'assets/icons/ico_success.svg'
import LogoutIcon from 'assets/icons/ico_logout.svg'
import styles from './Header.module.scss'
import { storageKeys } from 'constants/storage-keys'
import { i18nKey } from 'locales/i18n'
import { useAppDispatch } from 'hooks/store'
// import authApi from 'services/auth'
import { logout, selectCurrentUser } from 'store/auth'

export const Header: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const StorageService = services.get('StorageService')
  const userInfo = useSelector(selectCurrentUser)
  // const userInfo = StorageService.get(storageKeys.authProfile)

  const handleLogout = async () => {
    // await authApi.logout()
    await dispatch(logout())

    message.success(t(i18nKey.messageSuccess.msgLogout))
    StorageService.remove(storageKeys.authProfile)
    await navigate('login')
  }

  const contentProfile = (
    <div className={styles.menuProfile}>
      <div className={styles.menuItemContent}>
        <img src={UserSettingIcon} alt='UserSettingIcon' />
        {t(i18nKey.label.profileSetting)}
      </div>
      <div className={styles.menuItemContent} onClick={handleLogout}>
        <img src={LogoutIcon} alt='LogoutIcon' />
        {t(i18nKey.label.Logout)}
      </div>
    </div>
  )

  return (
    <div className={styles.root}>
      <Layout.Header>
        <div className={styles.headerContent}>
          <Popover
            placement='bottomRight'
            content={contentProfile}
            trigger='click'
            className={styles.headerProfile}
          >
            <Avatar icon={<UserOutlined />} />
            <div className={styles.userInfo}>
              <span className={styles.userName}>
                {userInfo.family_name + ' ' + userInfo.first_name}
              </span>
            </div>
          </Popover>
        </div>
      </Layout.Header>
    </div>
  )
}
