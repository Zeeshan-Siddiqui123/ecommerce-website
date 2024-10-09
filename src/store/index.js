import { configureStore } from '@reduxjs/toolkit'
import { jsonServerApi } from './features/api.slice'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [jsonServerApi.reducerPath]: jsonServerApi.reducer,
    }, // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(jsonServerApi.middleware),
})