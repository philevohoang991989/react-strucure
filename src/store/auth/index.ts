import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import services from 'services'
import { storageKeys } from 'constants/storage-keys'

type AuthState = {
  user: any | {}
  token: string | null
}

const StorageService = services.get('StorageService')
const userInfo = StorageService.get(storageKeys.authProfile)

const initialState: AuthState = {
  user: userInfo?.user || {},
  token: userInfo?.token || ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    logout: (state) => {
      state.token = ''
      state.user = {}
    }
  }
})

// Action creators are generated for each case reducer function
export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
