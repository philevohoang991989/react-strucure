import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store'

type sideBarState = {
  isHasSideBar: boolean
}

const initialState: sideBarState = {
  isHasSideBar: true
}

export const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    setHasSideBar: (state, action: PayloadAction<boolean>) => {
      state.isHasSideBar = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setHasSideBar } = sideBarSlice.actions

export default sideBarSlice.reducer

export const isHasSideBar = (state: RootState) => state.sideBar.isHasSideBar
