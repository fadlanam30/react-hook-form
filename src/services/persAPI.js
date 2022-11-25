import { baseAPI } from './_baseAPI'

export const persAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getPers: builder.query({
            query: () => ({
                url: '/pers',
                method: 'GET',
            })
        }),
        getPersById: builder.query({
            query: (id) => ({
                url: `api/pers/${id}`,
                method: "GET",
            }),
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

export const { useGetPersQuery, useGetPersByIdQuery, usePostPersMutation } = persAPI