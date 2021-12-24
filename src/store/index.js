import { configureStore } from '@reduxjs/toolkit'
import { api } from '../services/questions'
import { bin } from './bin'
import { focus } from './focus'
import { sort } from './sort'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    bin: bin.reducer,
    focus: focus.reducer,
    sort: sort.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})
