import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: []
}

export const bin = createSlice({
  name: 'bin',
  initialState,
  reducers: {
    replace: (state, action) => {
      return { ...state, items: action.payload }
    },
    add: (state, action) => {
      state.items.push(action.payload)
    },
    remove: (state, action) => {
      state.items.splice(state.items.indexOf(action.payload), 1)
    },
    clear: (state) => {
      state.items.splice(0, state.items.length)
    }
  }
})

export const {
  replace: addAllToBin,
  add: addToBin,
  remove: removeFromBin,
  clear: clearBin
} = bin.actions

export const selectAllFromBin = (state) => state.bin.items