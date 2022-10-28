import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ContactsOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button } from 'antd'
import { find } from 'lodash'
import { useAppDispatch } from 'hooks/store'
import { setHasSideBar } from 'store/sideBar'

import styles from './Sidebar.module.scss'
import { useIsRoleAdmin } from 'hooks/useAuth'
import { i18nKey } from 'locales/i18n'

type MenuListType = {
  key: string
  href: string
  linkText: string
  icon: JSX.Element
}

const { Sider } = Layout

export const SideBar: React.FC = () => {
  const { t } = useTranslation()
  const menuList: any = [
    {
      key: '1',
      href: '/',
      linkText: t(i18nKey.menu.home),
      icon: <HomeOutlined />
    },
    {
      key: '2',
      href: '/contact',
      linkText: t(i18nKey.menu.contact),
      icon: <ContactsOutlined />
    }
  ]
  const location = useLocation()

  const [collapsed, setIsCollapsed] = useState<boolean>(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [currentMenu, setCurrentMenu] = useState<MenuListType[]>([])

  const isAdmin = useIsRoleAdmin()
  const dispatch = useAppDispatch()

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
  }, [isAdmin])

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
      <Menu mode='inline' selectedKeys={selectedKeys} className={styles.menu} items={currentMenu} />
      <Button type='primary' onClick={toggleCollapsed} className={styles.btnCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </Sider>
  )
}
