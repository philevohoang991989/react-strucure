import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store'

type CommonState = {
  showPersonalDrawer: boolean
  isCollapsedMenu: boolean
}

const initialState: CommonState = {
  showPersonalDrawer: false,
  isCollapsedMenu: false
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    togglePersonalDrawer: (state, action: PayloadAction<boolean>) => {
      state.showPersonalDrawer = action.payload
    },

    toggleMenu: (state, action: PayloadAction<boolean>) => {
      state.isCollapsedMenu = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { togglePersonalDrawer, toggleMenu } = commonSlice.actions

export default commonSlice.reducer

export const selectShowPersonalDrawer = (state: RootState) => state.common.showPersonalDrawer
export const selectToggleCollpsedMenu = (state: RootState) => state.common.isCollapsedMenu
