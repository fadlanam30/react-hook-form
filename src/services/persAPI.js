import { baseAPI } from './_baseAPI'

export const persAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getPers: builder.query({
            query: () => ({
                url: '/pers',
                method: 'GET',
            })
        }),
        postPers: builder.mutation({
            query: (payload) => ({
                url: '/pers',
                method: 'POST',
                body: payload,
            })
        })
    })
})

export const { useGetPersQuery, usePostPersMutation } = persAPI