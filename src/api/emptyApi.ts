import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const API_BASE_URL = 'http://api.favorit-parts.ru'

export const emptyApi = createApi({
  reducerPath: 'favoritPriceApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: import.meta.env.VITE_API_BASE_URL,
    baseUrl: API_BASE_URL,
  }),
  endpoints: () => ({}),
})
