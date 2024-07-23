import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const RealWorldAPI = createApi({
    reducerPath: 'RealWorld',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
    endpoints: (builder) => ({
        getArticles: builder.query({
            query: () => ({
                url: 'articles?limit=115&offset=0',
            }),
        }),
        getAccessToken: builder.query({
            query: () => `users`,
        }),
        postNewUser: builder.mutation({
            query: (body) => ({
                url: 'users',
                method: 'POST',
                body,
            }),
        }),
        logIn: builder.mutation({
            query: (body) => ({
                url: 'users/login',
                method: 'POST',
                body,
            }),
        }),
        getProfile: builder.query({
            query: (user) => {
                if (user) {
                    return `/profiles/${user}`
                } else
                    return {
                        data: {
                            message: 'username not valid',
                        },
                    }
            },
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAccessTokenQuery, useGetArticlesQuery, usePostNewUserMutation, useLogInMutation, useGetProfileQuery } =
    RealWorldAPI
