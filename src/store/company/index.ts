import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store'

type TeamState = {
  companyInfo: any
}

const initialState: TeamState = {
  companyInfo: null
}

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyInfo: (state, action: PayloadAction<any>) => {
      state.companyInfo = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setCompanyInfo } = companySlice.actions

export default companySlice.reducer

export const selectCompanyInfo = (state: RootState) => state?.company?.companyInfo
