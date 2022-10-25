import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { i18nKey } from '@/locales/i18n'
import styles from './NotFound.module.scss'
import notFoundImg from 'assets/images/404.png'

const NotFound: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subTitle}>Page not found.</h2>

        <img alt='page not found' width='100%' src={notFoundImg} className={styles.image} />

        <p className={styles.description}>The page you were looking for was not found</p>

        <Button type='primary' className={styles.backBtn}>
          <Link to='/'>Link to go to dashboard</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound
