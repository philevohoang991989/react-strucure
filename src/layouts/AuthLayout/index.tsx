import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Background from 'assets/images/background.png'

import styles from './styles.module.scss'

const AuthLayout: React.FC = () => {
  useEffect(() => {
    document.documentElement.style.setProperty('--position-left-noti', '0')
  }, [])

  return (
    <div className={styles.authLayout} style={{ backgroundImage: `url(${Background})` }}>
      <Outlet />
    </div>
  )
}

export default AuthLayout
