import { createSlice } from '@reduxjs/toolkit'

const articlesState = createSlice({
    name: 'ArticlesSet',
    initialState: {
        isLoggedIn: false,
        token: undefined,
        username: false,
        page: 1,
    },
    reducers: {
        resetData(state) {
            return {
                ...state,
                isLoggedIn: false,
                email: false,
                username: false,
                token: undefined,
            }
        },
        setArticlesSet(state, action) {
            const { articles } = action.payload.articlesData
            if (articles) {
                const obj = {}
                articles.forEach((elem) => {
                    obj[elem.slug] = elem
                })
                return { ...state, articles: obj }
            }
            return state
        },
        setUsersData(state, action) {
            return {
                ...state,
                token: action.payload.token,
                isLoggedIn: true,
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password,
            }
        },
        setPage(state, action) {
            return {
                ...state,
                page: action.payload.page,
            }
        },
    },
})

export const { setArticlesSet, setUsersData, resetData, setPage } = articlesState.actions
export default articlesState.reducer
