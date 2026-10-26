import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_BASE_URL} from './constants'

export const emptyApi = createApi({
  reducerPath: 'favoritPriceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: () => ({}),
})
