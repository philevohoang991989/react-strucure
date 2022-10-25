import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import services from 'services'
import { storageKeys } from 'constants/storage-keys'

const StorageService = services.get('StorageService')

const RequireAuth = ({ children }) => {
  const location = useLocation()
  const isAuthenticated = !!StorageService.get(storageKeys.authProfile)
  //const isAuthenticated = true

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />
  } else if (children) {
    return <>{children}</>
  } else {
    return <Outlet />
  }
}

export default RequireAuth
