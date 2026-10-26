import {configureStore} from '@reduxjs/toolkit'
import {favoritPriceApi} from '@/api/favoritPriceApi'

export const store = configureStore({
  reducer: {
    [favoritPriceApi.reducerPath]: favoritPriceApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(favoritPriceApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
