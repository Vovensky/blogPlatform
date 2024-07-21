import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const RealWorldAPI = createApi({
    reducerPath: 'RealWorld',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
    endpoints: (builder) => ({
        getArticles: builder.query({
            query: () => ({
                url: 'articles?limit=15&offset=0',
                limit: 5,
            }),
        }),
        getAccessToken: builder.query({
            query: () => `users`,
        }),
        postNewUser: builder.mutation({
            query: (body) => ({
                url: 'users/login',
                method: 'POST',
                body,
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAccessTokenQuery, useGetArticlesQuery, usePostNewUserMutation } = RealWorldAPI
