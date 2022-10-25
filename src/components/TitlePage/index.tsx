import React, { useEffect, useRef } from 'react'

type PropsType = {
  children?: React.ReactNode
  title: string | undefined
  prevailOnUnmount?: boolean
}

export const TitlePage: React.FC<PropsType> = ({ children, title = '', prevailOnUnmount = false }) => {
  const defaultTitle = useRef(document.title)

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current
      }
    },
    [prevailOnUnmount]
  )

  return <>{children}</>
}
