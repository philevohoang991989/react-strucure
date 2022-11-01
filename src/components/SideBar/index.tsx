import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ContactsOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  CheckOutlined,
  HolderOutlined,
  UsergroupAddOutlined,
  DownOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button, MenuProps, Typography, Dropdown, Space } from 'antd'
import { find } from 'lodash'
import { useAppDispatch } from 'hooks/store'
import { setHasSideBar } from 'store/sideBar'

import styles from './Sidebar.module.scss'
import { useIsRoleAdmin } from 'hooks/useAuth'
import { i18nKey } from 'locales/i18n'
import { Team } from 'interfaces/team'
import { useSelector } from 'react-redux'
import { selectListTeam, selectSelectedTeam, switchTeam } from 'store/team'
import services from 'services'
import { storageKeys } from 'constants/storage-keys'
import { selectToggleCollpsedMenu } from 'store/common'
// import { i18nKey } from 'locales/i18n'

type MenuListType = {
  key: string
  href: string
  linkText: string
  icon: JSX.Element
  isShow?: boolean
}

const { Sider } = Layout

export const SideBar: React.FC = () => {
  const { Text } = Typography
  const { t } = useTranslation()
  const StorageService = services.get('StorageService')
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setIsCollapsed] = useState<boolean>(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [currentMenu, setCurrentMenu] = useState<MenuListType[]>([])
  const selectedTeam: Team | null = useSelector(selectSelectedTeam)
  const isCollapsedSidebar = useSelector(selectToggleCollpsedMenu)
  const listTeam: Array<Team> = useSelector(selectListTeam)
  const appConfig = StorageService.get(storageKeys.config)
  const profileInfo = StorageService.get(storageKeys.authProfile).user
  const isAdmin = useIsRoleAdmin()
  const dispatch = useAppDispatch()
  const getFirstCharOfTeamName = (name): string => name.substring(0, 1).toUpperCase()
  const truncateText = (str, maxLen: number): string =>
    str.length > maxLen ? `${str.substring(0, maxLen)}...` : str
  const menuList: any = [
    {
      key: '1',
      href: '/',
      linkText: `${t(i18nKey.menu.home)}`,
      icon: <HomeOutlined />
    },
    {
      key: '2',
      href: '/contact',
      linkText: `${t(i18nKey.menu.contact)}`,
      icon: <ContactsOutlined />
    }
  ]

  useEffect(() => {
    const menu = menuList
    // isAdmin ? adminMenuList : menuList
    const dataMerged: any = []

    menu.map((item) => {
      return dataMerged.push({
        label: (
          <Link to={item.href} className={styles.menuItem}>
            <p>{item.linkText}</p>
          </Link>
        ),
        href: item.href,
        key: item.key,
        icon: item.icon
      })
    })

    setCurrentMenu(dataMerged)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin])
  const onSwitchTeam: MenuProps['onClick'] = ({ key }) => {
    dispatch(switchTeam(parseInt(key)))
    if (parseInt(key) === listTeam.length) {
      currentMenu[1].isShow = false
      navigate('/')
      setCurrentMenu(currentMenu.slice(0))
    } else {
      currentMenu[1].isShow = true
      setCurrentMenu(currentMenu.slice(0))
    }
    const updateAppConfig = {
      ...appConfig,
      team: key
    }
    localStorage.setItem(storageKeys.config, JSON.stringify(updateAppConfig))
  }
  const menu = (
    <Menu onClick={onSwitchTeam}>
      <Text className={styles.accountName}>{profileInfo.email}</Text>
      {listTeam.length > 0 &&
        listTeam.map((team, index) => (
          <Menu.Item key={index} icon={<HolderOutlined />} className={styles.menuTeamItem}>
            <div className={styles.teamInfo}>
              <div className={styles.teamAvatar}>{getFirstCharOfTeamName(team.name)}</div>
              <div className={styles.teamName}>
                <p className={styles.fullName}>
                  {selectedTeam?.id === team.id
                    ? truncateText(team.name, 7)
                    : truncateText(team.name, 10)}{' '}
                  <span className={styles.roleName}>
                    {'('}
                    {team.is_current_team_admin
                      ? t(i18nKey.text.administrator)
                      : t(i18nKey.text.user)}
                    {')'}
                  </span>
                </p>
                <p className={styles.teamPlan}>Team Plan (1 license)</p>
              </div>
            </div>
            {selectedTeam?.id === team.id && <CheckOutlined />}
          </Menu.Item>
        ))}
      <Menu.Item key={listTeam.length} icon={<HolderOutlined />} className={styles.menuTeamItem}>
        <div className={styles.teamInfo}>
          <div className={styles.teamAvatar}>
            <UsergroupAddOutlined />
          </div>
          <div className={styles.teamName}>
            <p className={styles.fullName}>{t(i18nKey.text.nonTeam)}</p>
            <p className={styles.teamPlan}>{t(i18nKey.text.nonTeamSubText)}</p>
          </div>
          {!selectedTeam?.id && <CheckOutlined />}
        </div>
      </Menu.Item>
    </Menu>
  )

  const toggleCollapsed = () => {
    setIsCollapsed((val) => {
      dispatch(setHasSideBar(val))
      return !val
    })
  }

  useEffect(() => {
    const parentRoute = `/${location.pathname.split('/')[1]}`
    const routeFound = find(currentMenu, { href: parentRoute })

    if (routeFound) {
      setSelectedKeys([routeFound.key])
    } else {
      setSelectedKeys([])
    }
  }, [currentMenu, location])

  useEffect(() => {
    if (collapsed) document.documentElement.style.setProperty('--position-left-noti', '72px')
    else document.documentElement.style.setProperty('--position-left-noti', '232px')
  }, [collapsed])

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={232}
      collapsedWidth={50}
      className={styles.slider}
    >
      <Dropdown overlay={menu} trigger={['click']} overlayClassName={styles.switchTeamDropdown}>
        <div className={styles.switchTeamMenu}>
          <Space>
            <div className={styles.teamAvatar}>
              {selectedTeam?.name ? (
                <span>{getFirstCharOfTeamName(selectedTeam.name)}</span>
              ) : (
                <UsergroupAddOutlined />
              )}
            </div>
            {!isCollapsedSidebar && (
              <div className={styles.teamName}>
                {selectedTeam?.name ? truncateText(selectedTeam.name, 8) : t(i18nKey.text.nonTeam)}
              </div>
            )}
          </Space>
          {!isCollapsedSidebar && <DownOutlined />}
        </div>
      </Dropdown>
      <Menu mode='inline' selectedKeys={selectedKeys} className={styles.menu} items={currentMenu} />
      <Button type='primary' onClick={toggleCollapsed} className={styles.btnCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </Sider>
  )
}
