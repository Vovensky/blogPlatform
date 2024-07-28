import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const RealWorldAPI = createApi({
    reducerPath: 'RealWorld',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blog.kata.academy/api/',

        prepareHeaders: (headers, { getState }) => {
            const auth = getState().articlesState.token
            headers.set('Authorization', `Token ${auth}`)
            return headers
        },
    }),
    tagTypes: ['Article', 'POST', 'Articles'],
    endpoints: (builder) => ({
        getArticleDetails: builder.query({
            query: (id) => ({
                url: `articles/${id}`,
            }),
            providesTags: ['Articles'],
        }),
        getArticles: builder.query({
            query: (offset) => {
                let skip = offset
                if (!skip) skip = 0
                return {
                    url: `articles?limit=5&offset=${skip}`,
                }
            },
            providesTags: ['Articles'],
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
            invalidatesTags: ['Articles'],
        }),
        changeArticle: builder.mutation({
            query: ({ article, id }) => {
                const body = { article: article }
                return {
                    url: `/articles/${id}`,
                    method: 'PUT',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(body),
                }
            },
            invalidatesTags: (result) => [{ type: 'Articles', id: result.article.id }],
        }),
        deleteArticle: builder.mutation({
            query: (id) => {
                return {
                    url: `/articles/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Articles'],
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
        updateUser: builder.mutation({
            query: (body) => {
                console.log(body)
                return {
                    url: '/user',
                    method: 'PUT',
                    headers: { 'content-type': 'application/json' },
                    body: body,
                }
            },
        }),
        favoriteAnArticle: builder.mutation({
            query: (body) => {
                return {
                    url: `/articles/${body}/favorite`,
                    method: 'POST',
                }
            },
            invalidatesTags: ['Articles'],
        }),
        unFavoriteAnArticle: builder.mutation({
            query: (body) => {
                return {
                    url: `/articles/${body}/favorite`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Articles'],
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
    useDeleteArticleMutation,
    useUpdateUserMutation,
    useFavoriteAnArticleMutation,
    useUnFavoriteAnArticleMutation,
} = RealWorldAPI
