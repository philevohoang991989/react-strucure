import React from 'react'
import { Card, Tabs } from 'antd'
import { useTranslation } from 'react-i18next'

import { i18nKey } from 'locales/i18n'

import styles from './styles.module.scss'

function InfoRoom() {
  const { t } = useTranslation()
  return (
    <Card className={styles.customCard}>
      {' '}
      <Tabs
        defaultActiveKey='1'
        type='card'
        size='small'
        items={[
          {
            label: t(i18nKey.tab.nextTrip),
            key: '1',
            children: (
              <div>asDSDSA</div>

              // <BlockRoomNow
              //   meetingDetails={detailMetting}
              //   detailStream={detailStream}
              //   infoUser={infoUser}
              // />
            )
          }
        ]}
      />
    </Card>
  )
}

export default InfoRoom
