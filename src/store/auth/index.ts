import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/services/auth'
import type { RootState } from '@/store'

type AuthState = {
  user: User | null
  token: string | null
}

const initialState: AuthState = {
  user: null,
  token: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    resetCredentials: () => initialState
  }
})

// Action creators are generated for each case reducer function
export const { setCredentials, resetCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
