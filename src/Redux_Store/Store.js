import { configureStore } from '@reduxjs/toolkit'

import articleReducer from './ArticlesState/ArticlesState'
import { RealWorldAPI } from '../RTK_Qeury/RealWorldAPI'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        [RealWorldAPI.reducerPath]: RealWorldAPI.reducer,
        articlesState: articleReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(RealWorldAPI.middleware),
})

setupListeners(store.dispatch)
