import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialState = {
  questions: [{
    id: '0',
    question: 'How to add a question?',
    answer: 'Just fill the form and click on the "Create question" button.',
  }],
  loading: false,
  error: null,
}

const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {
    // set loading to true
    setLoading: (state, action) => {
      state.loading = true
    },
    // set loading to false
    setNotLoading: (state, action) => {
      state.loading = false
    },
    // set error
    setError: (state, action) => {
      state.error = action.payload
    },
    // set questions
    setQuestions: (state, action) => {
      state.questions = action.payload
    },
    // add question
    addQuestion: (state, action) => {
      state.questions.push(action.payload)
    },
    // update question
    updateQuestion: (state, action) => {
      const { id, question, answer } = action.payload
      const n = state.questions.find((item) => item.id === id)
      if (n) {
        n.question = question
        n.answer = answer
        n.updatedAt = new Date().toISOString()
      }
    },
    // delete questions
    deleteQuestion: (state, action) => {
      const { id } = action.payload
      const n = state.questions.find((item) => item.id === id)
      if (n) {
        state.questions.splice(state.questions.indexOf(n), 1)
      }
    },
  },
})

export const store = configureStore({
  reducer: {
    faq: faqSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export const selectQuestions = (state) => state.faq.questions;

