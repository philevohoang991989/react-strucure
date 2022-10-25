import React, { useEffect, useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PieChartOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Layout, Menu, Button } from 'antd'
import { find } from 'lodash'
import { useAppDispatch } from 'hooks/store'
import { setHasSideBar } from 'store/sideBar'
import HomeIcon from 'assets/icons/ico_home.svg'

import styles from './Sidebar.module.scss'
import { useIsRoleAdmin } from 'hooks/useAuth'

import services from 'services'
import { storageKeys } from 'constants/storage-keys'

type MenuListType = {
  key: string
  href: string
  linkText: string
  icon: JSX.Element
}

const { Sider } = Layout

const menuList: MenuListType[] = [
  {
    key: '1',
    href: '/',
    linkText: 'ダッシュボード',
    icon: <img src={HomeIcon} alt='HomeIcon' />
  },
  {
    key: '2',
    href: '/demo',
    linkText: 'ダッシュボード',
    icon: <img src={HomeIcon} alt='HomeIcon' />
  }
]
const menuListOperator: MenuListType[] = [
  {
    key: '1',
    href: '/',
    linkText: 'ダッシュボード',
    icon: <img src={HomeIcon} alt='HomeIcon' />
  },
  {
    key: '2',
    href: '/contact',
    linkText: 'コンタクト',
    icon: <img src={HomeIcon} alt='HomeIcon' />
  }
]

const adminMenuList: MenuListType[] = [
  {
    key: '5',
    href: '/',
    linkText: 'ダッシュボード',
    icon: <img src={HomeIcon} alt='HomeIcon' />
  }
]
const StorageService = services.get('StorageService')
export const SideBar: React.FC = () => {
  const location = useLocation()
  const authProfileLocal = useMemo(() => {
    return StorageService.get(storageKeys.authProfile)
  }, [])
  // const authProfileLocal = StorageService.getDecrypt(storageKeys.authProfile)
  const [collapsed, setIsCollapsed] = useState<boolean>(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [currentMenu, setCurrentMenu] = useState<MenuListType[]>([])

  const isAdmin = useIsRoleAdmin()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const menu =
      authProfileLocal?.roles?.name === 'admin'
        ? menuList
        : authProfileLocal?.roles?.name === 'super_admin'
        ? adminMenuList
        : menuListOperator
    // isAdmin ? adminMenuList : menuList
    const dataMerged: any = []

    menu.map((item) => {
      dataMerged.push({
        label: (
          <Link to={item.href} className={styles.menuItem}>
            <p>{item.linkText}</p>
          </Link>
        ),
        href: item.href,
        key: item.key,
        icon: <PieChartOutlined />
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
      <Button type='primary' onClick={toggleCollapsed} className={styles.btnCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu mode='inline' selectedKeys={selectedKeys} className={styles.menu} items={currentMenu} />
    </Sider>
  )
}
