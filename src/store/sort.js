import { createSlice } from '@reduxjs/toolkit'

const sortAlgorithms = {
  ASC: (a, b) => a.fullText.localeCompare(b.fullText),
  DESC: (a, b) => b.fullText.localeCompare(a.fullText),
  DATE_ASC: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  DATE_DESC: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
}

const initialState = {
  current: 'DATE_ASC',
  next: 'ASC'
}

export const sort = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    toggle: (state) => {
      state.current = state.next
      // prepare next sort
      switch (state.next) {
        case 'DATE_ASC':
          state.next = 'DATE_DESC'
          break
        case 'DATE_DESC':
          state.next = 'ASC'
          break
        case 'ASC':
          state.next = 'DESC'
          break
        case 'DESC':
          state.next = 'DATE_ASC'
          break
        default:
          break
      }
    }
  }
})

export const {
  toggle: toggleSort,
} = sort.actions

export const selectNextSort = (state) => state.sort.next
export const selectSortAlgorithm = (state) => sortAlgorithms[state.sort.current]
