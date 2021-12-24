import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null
}

export const focus = createSlice({
  name: 'focus',
  initialState,
  reducers: {
    set: (state, action) => {
      state.id = action.payload
    }
  }
})

export const {
  set: setFocus
} = focus.actions

export const selectFocus = (state) => state.focus.id
