import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import services from 'services'
import { storageKeys } from 'constants/storage-keys'

const StorageService = services.get('StorageService')

const ValidateLogin = ({ children }) => {
  const location = useLocation()
  const isAuthenticated = !!StorageService.get(storageKeys.authProfile)

  if (isAuthenticated) {
    return <Navigate to='/' state={{ from: location }} />
  } else if (children) {
    return <>{children}</>
  } else {
    return <Outlet />
  }
}

export default ValidateLogin
