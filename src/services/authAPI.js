import { baseAPI } from './_baseAPI'

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: '/api/login',
        method: 'POST',
        body: payload
      })
    })
  })
})

export const { useLoginMutation } = authAPI
