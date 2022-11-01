import { configureStore, combineReducers } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import authReducer from './auth'
import sideBarReducer from './sideBar'
import commonReducer from './common'
import teamReducer from './team'
import companyReducer from './company'

const rootReducer = combineReducers({
  auth: authReducer,
  sideBar: sideBarReducer,
  team: teamReducer,
  company: companyReducer,
  common: commonReducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState
  })
// eslint-disable-next-line
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
