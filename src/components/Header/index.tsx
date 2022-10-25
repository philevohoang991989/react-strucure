import React from 'react'
import { Layout, Dropdown, Menu, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import UserSettingIcon from 'assets/icons/ico_user-setting.svg'
import LogoutIcon from 'assets/icons/ico_logout.svg'
import styles from './Header.module.scss'

export const Header: React.FC = () => {
  const menu = (
    <Menu
      items={[
        {
          label: (
            <div className={styles.menuItemContent}>
              <img src={UserSettingIcon} alt='UserSettingIcon' />
              個人設定
            </div>
          ),
          key: '1'
        },
        {
          label: (
            <div className={styles.menuItemContent}>
              <img src={LogoutIcon} alt='LogoutIcon' />
              ログアウト
            </div>
          ),
          key: '2'
        }
      ]}
    />
  )
  return (
    <div className={styles.root}>
      <Layout.Header>
        <div className={styles.headerContent}>
          <Dropdown overlay={menu} trigger={['click']}>
            <div className={styles.headerProfile}>
              <Avatar icon={<UserOutlined />} />
              <div className={styles.userInfo}>
                <span className={styles.userName}>Phi</span>
                <span>Logout</span>
              </div>
            </div>
          </Dropdown>
        </div>
      </Layout.Header>
    </div>
  )
}
