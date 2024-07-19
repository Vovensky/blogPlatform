import { createSlice } from '@reduxjs/toolkit'

const articlesState = createSlice({
    name: 'ArticlesSet',
    initialState: {
        isLoggedIn: false,
        token: undefined,
    },
    reducers: {
        setArticlesSet(state, action) {
            console.log(`set redux`)
            const { articles } = action.payload
            const obj = {}
            articles.forEach((elem) => {
                obj[elem.slug] = elem
            })
            return { ...state, articles: obj }
        },
        setUsersToken(state, action) {
            return {
                ...state,
                token: action.payload,
                isLoggedIn: true,
            }
        },
    },
})

export const { setArticlesSet, setUsersToken } = articlesState.actions
export default articlesState.reducer
