import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/v1' }),
  tagTypes: ['Question'],
  endpoints: (build) => ({
    getQuestions: build.query({
      query: () => 'questions',
      providesTags: result => result
        ? [
          ...result.map(({ id }) => ({ type: 'Question', id })),
          { type: 'Question', id: 'LIST' },
        ]
        : [{ type: 'Question', id: 'LIST' }]
    }),
    deleteQuestions: build.mutation({
      query: (body) => ({
        url: 'questions/delete-list',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Question', id }]
    }),
    addQuestion: build.mutation({
      query: (body) => ({
        url: 'question',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Question', id }]
    }),
    updateQuestion: build.mutation({
      query: ({id, ...body}) => ({
        url: `question/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Question', id }]
    }),
  })
})

export const {
  useAddQuestionMutation,
  useDeleteQuestionsMutation,
  useGetQuestionsQuery,
  useUpdateQuestionMutation
} = api
