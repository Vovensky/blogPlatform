import { createSlice } from '@reduxjs/toolkit'

const articlesState = createSlice({
    name: 'ArticlesSet',
    initialState: {
        isLoggedIn: false,
        token: undefined,
    },
    reducers: {
        setArticlesSet(state, action) {
            const { articles } = action.payload
            const obj = {}
            articles.forEach((elem) => {
                obj[elem.slug] = elem
            })
            return { ...state, articles: obj }
        },
        setUsersData(state, action) {
            console.log(action)
            return {
                ...state,
                token: action.payload.token,
                isLoggedIn: true,
                username: action.payload.username,
                email: action.payload.email,
            }
        },
    },
})

export const { setArticlesSet, setUsersData } = articlesState.actions
export default articlesState.reducer
