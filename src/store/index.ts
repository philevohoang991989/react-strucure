import { configureStore, combineReducers } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import authReducer from './auth'
import sideBarReducer from './sideBar'

const rootReducer = combineReducers({
  auth: authReducer,
  sideBar: sideBarReducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
