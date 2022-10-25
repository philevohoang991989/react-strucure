import React, { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { uniqueId } from 'lodash'

import services from 'services'
import RequireAuth from './RequireAuth'
import ValidateLogin from './ValidateLogin'
import AuthLayout from 'layouts/AuthLayout'
import MainLayout from 'layouts/MainLayout'
import { Loader, ScrollToTop, TitlePage } from 'components'
import { useAuth, useIsRoleAdmin } from 'hooks/useAuth'
import { storageKeys } from 'constants/storage-keys'
import { useAppDispatch } from 'hooks/store'
import { setCredentials } from 'store/auth'

type RouteType = {
  index?: boolean
  path?: string
  title?: string
  element: React.LazyExoticComponent<React.ComponentType<unknown>>
  children?: RouteType[]
}

const StorageService = services.get('StorageService')
const APP_NAME = process.env.APP_NAME || 'REACT_TEMPLATE'
const titlePage = (title: string) => `${APP_NAME} - ${title}`
const lazyLoadRoute = (pageName: string) => lazy(() => import(`pages/${pageName}`))

const publicRoutes: RouteType[] = [
  {
    path: '/login',
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage('Login'),
        element: lazyLoadRoute('auth/login')
      }
    ]
  }
]

const privateRoutes: RouteType[] = [
  {
    path: '/',
    title: titlePage('Dashboard'),
    element: lazyLoadRoute('home')
  },
  {
    path: '/contact',
    title: titlePage('Dashboard'),
    element: lazyLoadRoute('contact')
  }
]

const NotFoundPage = lazyLoadRoute('NotFound')

const renderRoutes = (routes: RouteType[]) =>
  routes.map(({ element: Element, ...pageOptions }) => {
    const routeOptions: any = pageOptions.index ? { index: true } : { path: pageOptions.path }

    return (
      <Route
        key={uniqueId('__page__')}
        path={pageOptions.path}
        element={
          <Suspense fallback={<Loader mode='reverse-color' />}>
            <TitlePage title={pageOptions.title}>
              <Element />
            </TitlePage>
          </Suspense>
        }
        {...routeOptions}
      >
        {pageOptions?.children?.map(({ element: ChildrenElement, ...childrenOption }) =>
          childrenOption.index ? (
            <Route
              key={uniqueId('__page__')}
              index
              element={
                <Suspense fallback={<Loader mode='reverse-color' />}>
                  <TitlePage title={childrenOption.title}>
                    <ChildrenElement />
                  </TitlePage>
                </Suspense>
              }
            />
          ) : (
            <Route
              key={uniqueId('__page__')}
              path={childrenOption.path}
              element={
                <Suspense fallback={<Loader mode='reverse-color' />}>
                  <TitlePage title={childrenOption.title}>
                    <ChildrenElement />
                  </TitlePage>
                </Suspense>
              }
            >
              {childrenOption?.children && renderRoutes(childrenOption.children)}
            </Route>
          )
        )}
      </Route>
    )
  })

const RoutesApp = () => {
  const [routes, setRoutes] = useState<RouteType[]>([])
  const isAdmin = useIsRoleAdmin()

  const dispatch = useAppDispatch()
  const { user: authProfileStore } = useAuth()

  const authProfileLocal = StorageService.get(storageKeys.authProfile)
  const isAuthenticated = !!authProfileLocal
  useEffect(() => {
    // TODO: fetch profile

    if (isAuthenticated && !authProfileStore) {
      const infoUser = {
        token: authProfileLocal?.token,
        user: {
          ...authProfileLocal
        }
      }

      dispatch(setCredentials(infoUser))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authProfileLocal, authProfileStore])

  useEffect(() => {
    const routeList = privateRoutes
    setRoutes(routeList)
  }, [isAdmin])

  return (
    <BrowserRouter>
      <ScrollToTop>
        {isAdmin === null && isAuthenticated ? (
          <Loader />
        ) : (
          <>
            <Routes>
              <Route
                element={
                  <ValidateLogin>
                    <AuthLayout />
                  </ValidateLogin>
                }
              >
                {renderRoutes(publicRoutes)}
              </Route>

              <Route
                element={
                  <RequireAuth>
                    <MainLayout />
                  </RequireAuth>
                }
              >
                {renderRoutes(routes)}
              </Route>

              <Route
                path='*'
                element={
                  <Suspense fallback={<Loader />}>
                    <TitlePage title={titlePage('Page not found')}>
                      <NotFoundPage />
                    </TitlePage>
                  </Suspense>
                }
              />
            </Routes>
          </>
        )}
      </ScrollToTop>
    </BrowserRouter>
  )
}

export default RoutesApp
