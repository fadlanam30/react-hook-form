import { baseAPI } from './_baseAPI'

export const statusAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getStatus: builder.query({
            query: () => ({
                url: '/statuses',
                method: 'GET',
            })
        })
    })
})

export const { useGetStatusQuery } = statusAPI
