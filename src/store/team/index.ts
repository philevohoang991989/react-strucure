import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store'
import { Team } from 'interfaces/team'

type TeamState = {
  listTeam: Array<Team>
  selectedTeam: Team | null
}

const initialState: TeamState = {
  listTeam: [],
  selectedTeam: null
}

export const teamSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setListTeam: (state, action: PayloadAction<Array<Team>>) => {
      state.listTeam = action.payload
    },

    switchTeam: (state, action: PayloadAction<number>) => {
      const index = action.payload
      state.selectedTeam = index !== state.listTeam.length ? state.listTeam[index] : null
    },

    resetSelectedTeam: (state) => {
      state.selectedTeam = null
    },

    addTeam: (state, action: PayloadAction<Team>) => {
      const oldTeam = state.listTeam
      oldTeam.push(action.payload)
      state.listTeam = oldTeam.slice(0)
    },

    updateTeam: (state, action: PayloadAction<Team>) => {
      const oldTeam = state.listTeam
      const updateIndex = oldTeam.findIndex((team) => team.id === action.payload.id)

      oldTeam[updateIndex] = action.payload
      state.listTeam = oldTeam.slice(0)
      state.selectedTeam = action.payload
    },

    deleteTeam: (state, action: PayloadAction<number | undefined>) => {
      const id = action.payload
      const oldTeam = state.listTeam
      const delIndex = oldTeam.findIndex((team) => team.id === id)
      oldTeam.splice(delIndex, 1)
      state.listTeam = oldTeam.slice(0)
    }
  }
})

// Action creators are generated for each case reducer function
export const { setListTeam, addTeam, switchTeam, updateTeam, deleteTeam, resetSelectedTeam } =
  teamSlice.actions

export default teamSlice.reducer

export const selectListTeam = (state: RootState) => state?.team?.listTeam
export const selectSelectedTeam = (state: RootState) => state?.team?.selectedTeam
