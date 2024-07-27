import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const RealWorldAPI = createApi({
    reducerPath: 'RealWorld',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blog.kata.academy/api/',
        prepareHeaders: (headers, { getState }) => {
            console.log(headers)
            const auth = getState().articlesState.token
            headers.set('Authorization', `Token ${auth}`)
            return headers
        },
    }),
    endpoints: (builder) => ({
        getArticleDetails: builder.query({
            query: (id) => ({
                url: `articles/${id}`,
            }),
        }),
        getArticles: builder.query({
            query: () => ({
                url: 'articles?limit=5&offset=0',
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
        postNewArticle: builder.mutation({
            query: (body) => {
                return {
                    url: 'articles',
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body,
                }
            },
        }),
        changeArticle: builder.mutation({
            query: (body, id) => {
                console.log(body)
                console.log(id)
                return {
                    url: `/articless/${id}`,
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body,
                }
            },
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
export const {
    useGetAccessTokenQuery,
    useGetArticlesQuery,
    usePostNewUserMutation,
    useLogInMutation,
    useGetProfileQuery,
    useGetArticleDetailsQuery,
    usePostNewArticleMutation,
    useChangeArticleMutation,
} = RealWorldAPI
