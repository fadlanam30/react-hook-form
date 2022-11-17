import { baseAPI } from './_baseAPI'

export const rankAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getRanks: builder.query({
      query: (params) => ({
        url: '/ranks',
        method: 'GET',
        params
      })
    })
  })
})

export const { useGetRanksQuery } = rankAPI
